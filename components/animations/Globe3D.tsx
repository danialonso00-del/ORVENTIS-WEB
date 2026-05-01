"use client";

import { useEffect, useRef } from "react";
import type { Mesh, MeshBasicMaterial, Vector3 } from "three";

const RADIUS = 2;
const ARC_LIFT = 0.42;

const CITIES = [
  { name: "Barcelona",  lat: 41.39,  lon: 2.17   },
  { name: "Dubai",      lat: 25.20,  lon: 55.30  },
  { name: "Singapore",  lat:  1.35,  lon: 103.82 },
  { name: "São Paulo",  lat: -23.55, lon: -46.63 },
] as const;

// [fromIdx, toIdx, isSea]
const ROUTES: [number, number, boolean][] = [
  [0, 1, false], // Barcelona ↔ Dubai     — air
  [0, 2, false], // Barcelona ↔ Singapore — air
  [0, 3, true],  // Barcelona ↔ São Paulo — sea
  [1, 2, true],  // Dubai ↔ Singapore     — sea
  [1, 3, false], // Dubai ↔ São Paulo     — air
  [2, 3, false], // Singapore ↔ São Paulo — air
];

export default function Globe3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const labelsRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !labelsRef.current) return;

    let running = true;
    let animId   = 0;
    let dispose: (() => void) | null = null;

    (async () => {
      try {
        const THREE    = await import("three");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls.js" as any);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const topojson = (await import("topojson-client")) as any;

        if (!running) return;

        const container = containerRef.current!;
        const labelsDiv = labelsRef.current!;

        // ── Renderer ──────────────────────────────────────────────────────────
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        // ── Scene / Camera ────────────────────────────────────────────────────
        const scene  = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          45, container.clientWidth / container.clientHeight, 0.1, 100
        );
        camera.position.set(0, 0.6, 5.5);

        // ── OrbitControls ─────────────────────────────────────────────────────
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const controls = new OrbitControls(camera, renderer.domElement) as any;
        controls.enableDamping   = true;
        controls.dampingFactor   = 0.06;
        controls.autoRotate      = true;
        controls.autoRotateSpeed = 0.42;
        controls.enablePan       = false;
        controls.minDistance     = 3.5;
        controls.maxDistance     = 10;

        // ── Lights ────────────────────────────────────────────────────────────
        scene.add(new THREE.AmbientLight(0x1e3a6a, 5));
        const sun = new THREE.DirectionalLight(0x4d88ff, 2.8);
        sun.position.set(5, 3, 5);
        scene.add(sun);

        // ── Globe group ───────────────────────────────────────────────────────
        const globe = new THREE.Group();
        scene.add(globe);

        // Ocean sphere
        globe.add(new THREE.Mesh(
          new THREE.SphereGeometry(RADIUS, 64, 48),
          new THREE.MeshPhongMaterial({ color: 0x0a1628, shininess: 18 })
        ));

        // Atmosphere glow — BackSide + AdditiveBlending creates rim glow
        globe.add(new THREE.Mesh(
          new THREE.SphereGeometry(RADIUS * 1.05, 32, 32),
          new THREE.ShaderMaterial({
            vertexShader: `
              varying vec3 vNormal;
              void main() {
                vNormal = normalize(normalMatrix * normal);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `,
            fragmentShader: `
              varying vec3 vNormal;
              void main() {
                float edge = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
                float intensity = pow(edge, 3.2) * 0.85;
                gl_FragColor = vec4(0.15, 0.52, 1.0, 1.0) * intensity;
              }
            `,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending,
            transparent: true,
            depthWrite: false,
          })
        ));

        // ── Coordinate helper ─────────────────────────────────────────────────
        const ll2v = (lat: number, lon: number, r: number): Vector3 => {
          const phi   = (90 - lat) * (Math.PI / 180);
          const theta = (lon + 180) * (Math.PI / 180);
          return new THREE.Vector3(
            -r * Math.sin(phi) * Math.cos(theta),
             r * Math.cos(phi),
             r * Math.sin(phi) * Math.sin(theta)
          );
        };

        // ── Country borders (TopoJSON) ────────────────────────────────────────
        try {
          const topo = await fetch(
            "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
          ).then(r => r.json());

          if (!running) return;

          const borders = topojson.mesh(topo, topo.objects.countries);
          const pts: number[] = [];

          (borders.coordinates as [number, number][][]).forEach((line: [number, number][]) => {
            for (let i = 0; i < line.length - 1; i++) {
              const [lo1, la1] = line[i];
              const [lo2, la2] = line[i + 1];
              const v1 = ll2v(la1, lo1, RADIUS + 0.004);
              const v2 = ll2v(la2, lo2, RADIUS + 0.004);
              pts.push(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
            }
          });

          const geo = new THREE.BufferGeometry();
          geo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
          globe.add(new THREE.LineSegments(
            geo,
            new THREE.LineBasicMaterial({ color: 0x1a4a9a, transparent: true, opacity: 0.82 })
          ));
        } catch {
          // Globe renders without borders on network failure
        }

        // ── City positions ────────────────────────────────────────────────────
        const cityVecs: Vector3[] = CITIES.map(c => ll2v(c.lat, c.lon, RADIUS));

        cityVecs.forEach(pos => {
          // Main dot
          const dot = new THREE.Mesh(
            new THREE.SphereGeometry(0.03, 10, 10),
            new THREE.MeshBasicMaterial({ color: 0x5a8de8 })
          );
          dot.position.copy(pos.clone().normalize().multiplyScalar(RADIUS + 0.01));
          globe.add(dot);

          // Bright inner highlight
          const hi = new THREE.Mesh(
            new THREE.SphereGeometry(0.017, 8, 8),
            new THREE.MeshBasicMaterial({ color: 0xaacfff })
          );
          hi.position.copy(dot.position);
          globe.add(hi);
        });

        // Pulse rings (3 per city, staggered phase)
        const pulseRings: { mesh: Mesh; phase: number }[] = [];
        cityVecs.forEach(pos => {
          const normal = pos.clone().normalize();
          const q = new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 0, 1), normal
          );
          for (let r = 0; r < 3; r++) {
            const ring = new THREE.Mesh(
              new THREE.RingGeometry(0.035, 0.058, 20),
              new THREE.MeshBasicMaterial({
                color: 0x5a8de8,
                transparent: true,
                opacity: 0.5,
                side: THREE.DoubleSide,
                depthWrite: false,
              })
            );
            ring.position.copy(normal.clone().multiplyScalar(RADIUS + 0.012));
            ring.quaternion.copy(q);
            globe.add(ring);
            pulseRings.push({ mesh: ring, phase: r / 3 });
          }
        });

        // Spherical linear interpolation — Three.js Vector3 typing omits slerp
        const slerp = (a: Vector3, b: Vector3, t: number): Vector3 => {
          const dot   = Math.min(1, Math.max(-1, a.dot(b)));
          const theta = Math.acos(dot) * t;
          const rel   = b.clone().addScaledVector(a, -dot).normalize();
          return a.clone().multiplyScalar(Math.cos(theta)).addScaledVector(rel, Math.sin(theta));
        };

        // ── Arc builder (great-circle, lifted off sphere) ─────────────────────
        const makeArc = (a: Vector3, b: Vector3, segs = 80): Vector3[] => {
          const aDir = a.clone().normalize();
          const bDir = b.clone().normalize();
          return Array.from({ length: segs + 1 }, (_, i) => {
            const t   = i / segs;
            const dir = slerp(aDir, bDir, t);
            return dir.multiplyScalar(RADIUS + ARC_LIFT * Math.sin(Math.PI * t));
          });
        };

        // ── Routes: arc lines + animated glowing dots ────────────────────────
        const vehicles: { dot: Mesh; arc: Vector3[]; progress: number; speed: number }[] = [];

        ROUTES.forEach(([ai, bi]) => {
          const arc = makeArc(cityVecs[ai], cityVecs[bi]);

          // Faint base arc line
          globe.add(new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(arc),
            new THREE.LineBasicMaterial({ color: 0x3b6fd4, transparent: true, opacity: 0.35 })
          ));

          // Two glowing dots per route, offset by half
          for (let v = 0; v < 2; v++) {
            const dot = new THREE.Mesh(
              new THREE.SphereGeometry(0.022, 8, 8),
              new THREE.MeshBasicMaterial({ color: 0x7ba7ef })
            );
            globe.add(dot);
            vehicles.push({
              dot,
              arc,
              progress: v * 0.5,
              speed: 0.00065 + Math.random() * 0.00045,
            });
          }
        });

        // ── HTML city labels ──────────────────────────────────────────────────
        const labelEls: HTMLDivElement[] = [];
        CITIES.forEach(city => {
          const el = document.createElement("div");
          el.textContent = city.name;
          Object.assign(el.style, {
            position:      "absolute",
            transform:     "translate(-50%, -160%)",
            padding:       "3px 9px",
            background:    "rgba(5,12,30,0.88)",
            border:        "1px solid rgba(90,141,232,0.55)",
            borderRadius:  "4px",
            color:         "#c0d4f5",
            fontSize:      "10px",
            fontWeight:    "700",
            letterSpacing: "0.07em",
            fontFamily:    "system-ui, sans-serif",
            whiteSpace:    "nowrap",
            pointerEvents: "none",
            transition:    "opacity 0.3s",
          });
          labelsDiv.appendChild(el);
          labelEls.push(el);
        });

        // ── Resize ────────────────────────────────────────────────────────────
        const onResize = () => {
          const W = container.clientWidth, H = container.clientHeight;
          camera.aspect = W / H;
          camera.updateProjectionMatrix();
          renderer.setSize(W, H);
        };
        window.addEventListener("resize", onResize);

        // ── Animation loop ────────────────────────────────────────────────────
        const tmp = new THREE.Vector3();

        const animate = () => {
          if (!running) return;
          animId = requestAnimationFrame(animate);
          const t = performance.now() * 0.001;
          controls.update();

          // Pulse rings
          pulseRings.forEach(({ mesh, phase }) => {
            const prog = (t * 0.32 + phase) % 1;
            mesh.scale.setScalar(1 + prog * 3);
            (mesh.material as MeshBasicMaterial).opacity = (1 - prog) * 0.45;
          });

          // Advance glowing dots along arcs
          vehicles.forEach(v => {
            v.progress = (v.progress + v.speed) % 1;
            const idx = Math.min(Math.floor(v.progress * v.arc.length), v.arc.length - 1);
            v.dot.position.copy(v.arc[idx]);
          });

          // Project city positions to screen, hide when behind globe
          const W = container.clientWidth, H = container.clientHeight;
          cityVecs.forEach((pos, i) => {
            const facing = pos.clone().normalize().dot(camera.position.clone().normalize()) > 0.08;
            tmp.copy(pos).project(camera);
            labelEls[i].style.left    = `${(tmp.x * 0.5 + 0.5) * W}px`;
            labelEls[i].style.top     = `${(-tmp.y * 0.5 + 0.5) * H}px`;
            labelEls[i].style.opacity = facing ? "1" : "0";
          });

          renderer.render(scene, camera);
        };
        animate();

        // ── Cleanup fn (stored so return() can call it) ───────────────────────
        dispose = () => {
          cancelAnimationFrame(animId);
          window.removeEventListener("resize", onResize);
          controls.dispose();
          labelEls.forEach(el => el.remove());
          renderer.dispose();
          if (container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
          }
        };

      } catch (err) {
        console.error("[Globe3D] init error:", err);
      }
    })();

    return () => {
      running = false;
      dispose?.();
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "620px",
        background: "#050810",
        borderRadius: "1rem",
        overflow: "hidden",
      }}
    >
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
      <div
        ref={labelsRef}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      />
    </div>
  );
}

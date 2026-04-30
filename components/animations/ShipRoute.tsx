"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate, useMotionValueEvent } from "framer-motion";

const W = 920;
const H = 440;

/* ── Port definitions ── */
const PORTS = [
  { id: "sao-paulo",  name: "São Paulo",  country: "Brazil",  x: 188, y: 292, labelX: 192, labelY: 278 },
  { id: "barcelona", name: "Barcelona",  country: "Spain",   x: 418, y: 132, labelX: 380, labelY: 118 },
  { id: "dubai",     name: "Dubai",      country: "UAE",     x: 600, y: 176, labelX: 604, labelY: 162 },
  { id: "singapore", name: "Singapore",  country: "S'pore",  x: 762, y: 258, labelX: 720, labelY: 244 },
];

/*
  Full circular route (SVG path):
  SP → (mid-Atlantic curve) → Barcelona
     → (Mediterranean) → Dubai
     → (Indian Ocean) → Singapore
     → (SE Asia / Cape route back) → SP
*/
const ROUTE_PATH =
  "M 188,292 " +
  "C 240,195 340,115 418,132 " +   // SP → Barcelona
  "C 478,130 545,148 600,176 " +   // Barcelona → Dubai
  "C 648,204 710,240 762,258 " +   // Dubai → Singapore
  "C 820,292 800,360 680,372 " +   // Singapore → south Indian Ocean
  "C 520,385 330,355 188,292 Z";   // → back to SP

export default function ShipRoute({ className = "" }: { className?: string }) {
  const pathRef = useRef<SVGPathElement>(null);
  const routeDrawRef = useRef<SVGPathElement>(null);
  const progress = useMotionValue(0);
  const [shipState, setShipState] = useState({ x: 188, y: 292, angle: 0 });
  const [activePort, setActivePort] = useState<string | null>(null);
  const [routeLen, setRouteLen] = useState(0);

  /* measure path length once mounted */
  useEffect(() => {
    if (pathRef.current) {
      setRouteLen(pathRef.current.getTotalLength());
    }
  }, []);

  /* animate progress 0→1 on loop */
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const controls = animate(progress, 1, {
      duration: 22,
      repeat: Infinity,
      ease: "linear",
      repeatType: "loop",
    });
    return () => controls.stop();
  }, [progress]);

  /* update ship position from progress value */
  useMotionValueEvent(progress, "change", (v) => {
    const path = pathRef.current;
    if (!path || routeLen === 0) return;
    const len = path.getTotalLength();
    const pt  = path.getPointAtLength(v * len);
    const pt2 = path.getPointAtLength(Math.min((v + 0.005) * len, len));
    const angle = Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * (180 / Math.PI);
    setShipState({ x: pt.x, y: pt.y, angle });
  });

  return (
    <div className={`relative ${className}`} aria-label="Global shipping route animation">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        role="img"
        aria-describedby="ship-route-desc"
      >
        <desc id="ship-route-desc">
          Animated cargo ship route connecting São Paulo, Barcelona, Dubai, and Singapore.
        </desc>

        {/* ── Ocean background ── */}
        <defs>
          <radialGradient id="oceanGrad" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#0A1628" />
            <stop offset="100%" stopColor="#060D1A" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="rgba(59,111,212,0.6)" />
          </marker>
        </defs>

        <rect width={W} height={H} fill="url(#oceanGrad)" rx="12" />

        {/* ── Ocean latitude lines ── */}
        {[100, 160, 220, 280, 340, 400].map((y) => (
          <line
            key={y}
            x1="0" y1={y} x2={W} y2={y}
            stroke="rgba(59,111,212,0.06)"
            strokeWidth="1"
          />
        ))}
        {[100, 200, 300, 400, 500, 600, 700, 800].map((x) => (
          <line
            key={x}
            x1={x} y1="0" x2={x} y2={H}
            stroke="rgba(59,111,212,0.05)"
            strokeWidth="1"
          />
        ))}

        {/* ── Stylised continents ── */}
        <Continents />

        {/* ── Route path (ghost) ── */}
        <path
          d={ROUTE_PATH}
          fill="none"
          stroke="rgba(59,111,212,0.18)"
          strokeWidth="1.5"
          strokeDasharray="6 5"
        />

        {/* ── Route path (animated draw) ── */}
        <path
          ref={routeDrawRef}
          d={ROUTE_PATH}
          fill="none"
          stroke="#3B6FD4"
          strokeWidth="2"
          strokeOpacity="0.7"
          filter="url(#glow)"
          style={{
            strokeDasharray: routeLen || 2000,
            strokeDashoffset: routeLen ? routeLen * (1 - progress.get()) : 2000,
          }}
        />

        {/* Hidden measurement path */}
        <path ref={pathRef} d={ROUTE_PATH} fill="none" stroke="none" />

        {/* ── Port markers ── */}
        {PORTS.map((port) => (
          <g
            key={port.id}
            onMouseEnter={() => setActivePort(port.id)}
            onMouseLeave={() => setActivePort(null)}
            className="cursor-pointer"
          >
            {/* Pulse ring */}
            <circle cx={port.x} cy={port.y} r="14" fill="rgba(59,111,212,0.08)">
              <animate attributeName="r" values="10;18;10" dur="2.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0;0.3" dur="2.8s" repeatCount="indefinite" />
            </circle>
            {/* Dot */}
            <circle
              cx={port.x}
              cy={port.y}
              r={activePort === port.id ? 7 : 5}
              fill={activePort === port.id ? "#5A8DE8" : "#3B6FD4"}
              filter="url(#glow)"
              style={{ transition: "r 0.2s ease" }}
            />
            <circle cx={port.x} cy={port.y} r="2.5" fill="#fff" opacity="0.9" />

            {/* Label */}
            <g>
              <text
                x={port.labelX}
                y={port.labelY}
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="10"
                fontWeight="700"
                letterSpacing="0.5"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {port.name}
              </text>
              <text
                x={port.labelX}
                y={port.labelY + 12}
                textAnchor="middle"
                fill="rgba(90,141,232,0.7)"
                fontSize="8.5"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {port.country}
              </text>
            </g>
          </g>
        ))}

        {/* ── Animated ship ── */}
        <motion.g
          animate={{ x: shipState.x, y: shipState.y, rotate: shipState.angle }}
          transition={{ type: "tween", duration: 0.08, ease: "linear" }}
          style={{ originX: "0px", originY: "0px" }}
        >
          <ShipIcon />
        </motion.g>
      </svg>

      {/* ── Legend ── */}
      <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-2">
        {PORTS.map((p) => (
          <div key={p.id} className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "#3B6FD4" }}
              aria-hidden="true"
            />
            <span className="text-xs text-gray-400 font-medium">{p.name}</span>
            <span className="text-xs text-gray-600">· {p.country}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Ship SVG icon (side-view cargo ship) ── */
function ShipIcon() {
  return (
    <g transform="translate(-14, -7)" aria-hidden="true">
      {/* Hull */}
      <path
        d="M 0,8 L 28,8 L 30,14 L -2,14 Z"
        fill="#3B6FD4"
        opacity="0.95"
      />
      {/* Bow */}
      <path d="M 28,8 L 34,14 L 28,14 Z" fill="#2A5BC4" />
      {/* Superstructure */}
      <rect x="6" y="2" width="12" height="6" rx="1" fill="#5A8DE8" opacity="0.9" />
      {/* Stack */}
      <rect x="10" y="0" width="4" height="4" rx="1" fill="#1A2B5E" />
      {/* Wake */}
      <path
        d="M -4,14 C -8,14 -10,16 -6,16"
        fill="none"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </g>
  );
}

/* ── Simplified continent shapes ── */
function Continents() {
  return (
    <g fill="#1A2B5E" opacity="0.45" stroke="#243572" strokeWidth="0.5">
      {/* South America */}
      <path d="M 80,180 L 115,165 L 150,172 L 180,185 L 200,210 L 205,250 L 195,295 L 180,330 L 160,355 L 140,360 L 118,345 L 100,315 L 88,280 L 82,245 L 75,215 Z" />

      {/* Europe */}
      <path d="M 355,50 L 395,40 L 445,48 L 468,62 L 470,82 L 455,98 L 430,105 L 400,108 L 370,100 L 350,82 L 348,62 Z" />
      {/* Iberian Peninsula (Barcelona area) */}
      <path d="M 360,82 L 400,78 L 415,92 L 408,110 L 382,116 L 360,106 Z" />

      {/* Africa */}
      <path d="M 355,118 L 402,110 L 450,118 L 480,140 L 492,178 L 495,225 L 488,268 L 470,302 L 442,322 L 408,330 L 375,320 L 350,290 L 335,255 L 330,210 L 338,168 L 348,138 Z" />

      {/* Arabian Peninsula / Middle East */}
      <path d="M 490,120 L 545,112 L 595,128 L 620,155 L 628,185 L 615,205 L 592,210 L 565,200 L 538,185 L 510,165 L 492,145 Z" />

      {/* South / SE Asia */}
      <path d="M 580,100 L 660,88 L 730,95 L 780,112 L 800,135 L 790,158 L 768,168 L 740,162 L 710,148 L 680,140 L 648,142 L 618,135 L 598,120 Z" />

      {/* SE Asia islands */}
      <path d="M 720,195 L 760,185 L 800,195 L 820,218 L 810,240 L 780,248 L 750,242 L 728,225 Z" />
      <ellipse cx="760" cy="268" rx="18" ry="10" />
      <ellipse cx="800" cy="275" rx="14" ry="9" />

      {/* Australia (partial) */}
      <path d="M 700,320 L 760,308 L 820,318 L 860,340 L 870,372 L 850,398 L 810,408 L 760,400 L 720,385 L 698,360 Z" />
    </g>
  );
}

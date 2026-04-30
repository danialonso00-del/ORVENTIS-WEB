"use client";

import { useEffect, useRef, useState } from "react";

interface Hub {
  id: string;
  name: string;
  coords: [number, number];
  markets: string;
}

interface MapRoutesProps {
  hubs: Hub[];
  className?: string;
}

// Mercator projection helper
function toSVG(lon: number, lat: number, width: number, height: number) {
  const x = ((lon + 180) / 360) * width;
  const latRad = (lat * Math.PI) / 180;
  const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  const y = height / 2 - (width * mercN) / (2 * Math.PI);
  return { x, y };
}

const ROUTES: [string, string][] = [
  ["singapore", "rotterdam"],
  ["singapore", "dubai"],
  ["shanghai", "singapore"],
  ["mumbai", "dubai"],
  ["dubai", "rotterdam"],
  ["rotterdam", "miami"],
  ["miami", "lagos"],
  ["lagos", "dubai"],
  ["shanghai", "miami"],
];

export default function MapRoutes({ hubs, className = "" }: MapRoutesProps) {
  const W = 800;
  const H = 420;
  const [activeHub, setActiveHub] = useState<string | null>(null);
  const [animStep, setAnimStep] = useState(0);
  const stepRef = useRef(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const interval = setInterval(() => {
      stepRef.current = (stepRef.current + 1) % ROUTES.length;
      setAnimStep(stepRef.current);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const hubMap = Object.fromEntries(hubs.map((h) => [h.id, h]));

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        aria-label="Global trading routes map"
        role="img"
      >
        {/* Ocean background */}
        <rect width={W} height={H} fill="#0F1624" rx="12" />

        {/* World outline (simplified paths) */}
        <WorldOutline />

        {/* Routes */}
        {ROUTES.map(([fromId, toId], i) => {
          const from = hubMap[fromId];
          const to = hubMap[toId];
          if (!from || !to) return null;
          const p1 = toSVG(from.coords[0], from.coords[1], W, H);
          const p2 = toSVG(to.coords[0], to.coords[1], W, H);
          const isActive = animStep === i;
          const mx = (p1.x + p2.x) / 2;
          const my = Math.min(p1.y, p2.y) - 40;

          return (
            <g key={`route-${i}`}>
              <path
                d={`M ${p1.x} ${p1.y} Q ${mx} ${my} ${p2.x} ${p2.y}`}
                fill="none"
                stroke="rgba(59,111,212,0.15)"
                strokeWidth="1"
              />
              {isActive && (
                <path
                  d={`M ${p1.x} ${p1.y} Q ${mx} ${my} ${p2.x} ${p2.y}`}
                  fill="none"
                  stroke="#3B6FD4"
                  strokeWidth="1.5"
                  strokeDasharray="200"
                  strokeDashoffset="200"
                  style={{
                    animation: "drawRoute 1.2s ease-out forwards",
                  }}
                />
              )}
            </g>
          );
        })}

        {/* Hub nodes */}
        {hubs.map((hub) => {
          const pos = toSVG(hub.coords[0], hub.coords[1], W, H);
          const isActive = activeHub === hub.id;
          return (
            <g
              key={hub.id}
              transform={`translate(${pos.x},${pos.y})`}
              onMouseEnter={() => setActiveHub(hub.id)}
              onMouseLeave={() => setActiveHub(null)}
              className="cursor-pointer"
            >
              <circle r="12" fill="rgba(59,111,212,0.1)" />
              <circle
                r={isActive ? "6" : "4"}
                fill={isActive ? "#5A8DE8" : "#3B6FD4"}
                style={{ transition: "r 0.2s ease" }}
              />
              <circle r="4" fill="none" stroke="#3B6FD4" strokeWidth="1" opacity="0.5">
                <animate attributeName="r" values="4;10;4" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" />
              </circle>
              {isActive && (
                <foreignObject x="-60" y="-48" width="120" height="40">
                  <div
                    style={{
                      background: "rgba(26,43,94,0.95)",
                      border: "1px solid rgba(59,111,212,0.5)",
                      borderRadius: "4px",
                      padding: "4px 8px",
                      textAlign: "center",
                      fontSize: "10px",
                      color: "#fff",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <strong>{hub.name}</strong>
                    <br />
                    <span style={{ color: "#5A8DE8", fontSize: "9px" }}>{hub.markets}</span>
                  </div>
                </foreignObject>
              )}
              <text
                y="18"
                textAnchor="middle"
                fontSize="9"
                fill="rgba(255,255,255,0.5)"
                style={{ pointerEvents: "none" }}
              >
                {hub.name}
              </text>
            </g>
          );
        })}

        <style>{`
          @keyframes drawRoute {
            from { stroke-dashoffset: 200; }
            to { stroke-dashoffset: 0; }
          }
        `}</style>
      </svg>
    </div>
  );
}

function WorldOutline() {
  return (
    <g opacity="0.25" fill="#243572" stroke="#1A2B5E" strokeWidth="0.5">
      {/* Simplified continent shapes */}
      {/* North America */}
      <path d="M 70 60 L 100 55 L 130 65 L 160 70 L 170 90 L 155 120 L 145 140 L 140 170 L 130 200 L 110 210 L 90 195 L 75 175 L 65 150 L 55 120 L 50 95 Z" />
      {/* South America */}
      <path d="M 120 215 L 140 210 L 155 220 L 160 245 L 155 275 L 145 305 L 130 330 L 115 340 L 100 330 L 95 305 L 100 275 L 105 245 Z" />
      {/* Europe */}
      <path d="M 340 50 L 375 45 L 400 55 L 410 70 L 405 90 L 390 100 L 370 105 L 350 100 L 335 85 L 330 65 Z" />
      {/* Africa */}
      <path d="M 340 110 L 380 105 L 415 115 L 430 140 L 435 175 L 430 210 L 420 245 L 400 275 L 375 290 L 355 285 L 335 260 L 320 225 L 315 185 L 320 150 L 330 125 Z" />
      {/* Asia */}
      <path d="M 420 40 L 490 35 L 555 40 L 610 55 L 640 75 L 645 105 L 630 130 L 605 145 L 580 150 L 555 145 L 525 140 L 495 130 L 460 120 L 435 105 L 415 85 L 410 60 Z" />
      {/* Southeast Asia */}
      <path d="M 580 145 L 620 140 L 650 150 L 660 170 L 645 185 L 620 190 L 595 180 L 580 165 Z" />
      {/* Australia */}
      <path d="M 590 235 L 635 225 L 675 235 L 695 260 L 695 295 L 675 315 L 640 320 L 605 310 L 585 285 L 580 260 Z" />
    </g>
  );
}

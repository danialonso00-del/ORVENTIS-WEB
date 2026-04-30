import Link from "next/link";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";

interface BusinessLine {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  cta: { label: string; href: string };
  visual: string;
}

interface BusinessSplitProps {
  lines: BusinessLine[];
}

export default function BusinessSplit({ lines }: BusinessSplitProps) {
  return (
    <section
      className="py-2"
      style={{ background: "#111827" }}
      aria-label="Business Lines"
    >
      <div className="grid lg:grid-cols-2">
        {lines.map((line, i) => (
          <FadeInOnScroll key={line.id} direction={i === 0 ? "left" : "right"} delay={i * 100}>
            <BusinessCard line={line} index={i} />
          </FadeInOnScroll>
        ))}
      </div>
    </section>
  );
}

function BusinessCard({ line, index }: { line: BusinessLine; index: number }) {
  const isTrading = line.visual === "trading";

  return (
    <div
      className="relative flex flex-col justify-end min-h-[560px] lg:min-h-[680px] overflow-hidden group"
      style={{
        background: isTrading
          ? "linear-gradient(160deg, #0A0F1E 0%, #1A2B5E 60%, #1C1C2E 100%)"
          : "linear-gradient(160deg, #1C1C2E 0%, #111827 60%, #0A0F1E 100%)",
        borderRight: index === 0 ? "1px solid rgba(59,111,212,0.15)" : "none",
      }}
    >
      {/* Background visual */}
      <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700">
        {isTrading ? <TradingVisual /> : <BrandVisual />}
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(17,24,39,0.95) 30%, transparent 100%)",
        }}
      />

      {/* Number */}
      <div
        className="absolute top-10 right-10 font-bold opacity-10"
        style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "clamp(6rem, 12vw, 10rem)",
          color: "#3B6FD4",
          lineHeight: 1,
        }}
        aria-hidden="true"
      >
        {index === 0 ? "01" : "02"}
      </div>

      {/* Content */}
      <div className="relative z-10 p-10 lg:p-14">
        <p
          className="text-xs font-semibold uppercase tracking-[0.2em] mb-3"
          style={{ color: "#3B6FD4" }}
        >
          {line.subtitle}
        </p>
        <h2
          className="text-3xl lg:text-4xl font-bold text-white mb-5 leading-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {line.title}
        </h2>
        <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-md">
          {line.description}
        </p>
        <Link
          href={line.cta.href}
          className="inline-flex items-center gap-3 text-sm font-semibold group/link"
          style={{ color: "#5A8DE8" }}
        >
          {line.cta.label}
          <span
            className="inline-block w-6 h-px transition-all duration-300 group-hover/link:w-10"
            style={{ background: "#3B6FD4" }}
          />
          <ArrowIcon />
        </Link>
      </div>
    </div>
  );
}

function TradingVisual() {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full" aria-hidden="true">
      <defs>
        <radialGradient id="tg1" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#3B6FD4" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#1A2B5E" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="180" fill="url(#tg1)" />
      {/* Shipping lanes */}
      {[0, 30, 60, 90, 120, 150].map((deg) => (
        <line
          key={deg}
          x1="200" y1="20"
          x2="200" y2="380"
          stroke="#3B6FD4"
          strokeWidth="0.5"
          strokeOpacity="0.3"
          transform={`rotate(${deg} 200 200)`}
        />
      ))}
      {/* Circles */}
      {[40, 80, 120, 160].map((r) => (
        <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="#3B6FD4" strokeWidth="0.5" strokeOpacity="0.2" />
      ))}
      {/* Nodes */}
      {[[200, 50], [350, 150], [330, 320], [100, 300], [60, 140]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" fill="#3B6FD4" fillOpacity="0.6" />
      ))}
      {/* Connection lines */}
      <polyline points="200,50 350,150 330,320 100,300 60,140 200,50" fill="none" stroke="#3B6FD4" strokeWidth="1" strokeOpacity="0.3" />
    </svg>
  );
}

function BrandVisual() {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full" aria-hidden="true">
      <defs>
        <radialGradient id="bg1" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#5A8DE8" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#1C1C2E" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="400" height="400" fill="url(#bg1)" />
      {/* Grid lines */}
      {[0, 50, 100, 150, 200, 250, 300, 350, 400].map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="400" stroke="#3B6FD4" strokeWidth="0.5" strokeOpacity="0.15" />
      ))}
      {[0, 50, 100, 150, 200, 250, 300, 350, 400].map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} stroke="#3B6FD4" strokeWidth="0.5" strokeOpacity="0.15" />
      ))}
      {/* Abstract brand mark */}
      <circle cx="200" cy="200" r="60" fill="none" stroke="#3B6FD4" strokeWidth="1" strokeOpacity="0.5" />
      <circle cx="200" cy="200" r="30" fill="none" stroke="#5A8DE8" strokeWidth="1" strokeOpacity="0.4" />
      <circle cx="200" cy="200" r="8" fill="#3B6FD4" fillOpacity="0.7" />
      {/* Radiating lines */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <line
            key={deg}
            x1={200 + 35 * Math.cos(rad)}
            y1={200 + 35 * Math.sin(rad)}
            x2={200 + 55 * Math.cos(rad)}
            y2={200 + 55 * Math.sin(rad)}
            stroke="#3B6FD4"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
        );
      })}
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

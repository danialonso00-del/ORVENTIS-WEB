import CounterUp from "@/components/animations/CounterUp";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";

interface Stat { value: number; suffix: string; label: string; }

export default function StatsSection({ stats }: { stats: Stat[] }) {
  return (
    <section
      className="py-28 lg:py-32 relative overflow-hidden"
      style={{ background: "#1A2B5E" }}
      aria-label="Key metrics"
    >
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "88px 88px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-screen-2xl mx-auto px-6 lg:px-16">
        <FadeInOnScroll>
          <p className="text-center eyebrow mb-4" style={{ color: "rgba(255,255,255,0.45)" }}>
            By the Numbers
          </p>
          <h2
            className="display-black text-center text-white mb-16"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
          >
            Proven at a global scale
          </h2>
        </FadeInOnScroll>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <FadeInOnScroll key={stat.label} delay={i * 90}>
              <div
                className="relative flex flex-col items-center text-center py-10 px-6 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div
                  className="absolute top-0 left-1/4 right-1/4 h-[2px]"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                  aria-hidden="true"
                />
                <p
                  className="display-black text-white mb-3 tabular-nums"
                  style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
                  aria-live="polite"
                >
                  <CounterUp value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-200">
                  {stat.label}
                </p>
              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

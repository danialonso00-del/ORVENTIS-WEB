import FadeInOnScroll from "@/components/animations/FadeInOnScroll";

interface IntroSectionProps {
  tagline: string;
  description: string;
  detail: string;
}

export default function IntroSection({ tagline, description, detail }: IntroSectionProps) {
  return (
    <section
      className="py-24 lg:py-32"
      style={{ background: "#1C1C2E" }}
      aria-label="About Orventis"
    >
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left */}
          <FadeInOnScroll direction="left">
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-[0.2em] mb-6"
                style={{ color: "#3B6FD4" }}
              >
                Who We Are
              </p>
              <h2
                className="text-4xl lg:text-5xl font-bold text-white leading-tight"
                style={{ fontFamily: "var(--font-playfair)", letterSpacing: "-0.02em" }}
              >
                {tagline}
              </h2>
            </div>
          </FadeInOnScroll>

          {/* Right */}
          <FadeInOnScroll direction="right" delay={150}>
            <div className="space-y-5">
              <p className="text-lg text-gray-300 leading-relaxed">{description}</p>
              <p className="text-base text-gray-400 leading-relaxed">{detail}</p>

              {/* Divider line */}
              <div
                className="flex items-center gap-4 pt-4"
                style={{ borderTop: "1px solid rgba(59,111,212,0.15)" }}
              >
                <span
                  className="text-sm font-semibold"
                  style={{ color: "#3B6FD4" }}
                >
                  Commodity Trading
                </span>
                <span className="text-gray-600">·</span>
                <span
                  className="text-sm font-semibold"
                  style={{ color: "#3B6FD4" }}
                >
                  Brand Positioning
                </span>
                <span className="text-gray-600">·</span>
                <span className="text-sm text-gray-400">6 Continents</span>
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </div>
    </section>
  );
}

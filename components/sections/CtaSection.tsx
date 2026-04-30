import { Button } from "@/components/ui/Button";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";

interface CtaSectionProps {
  headline: string;
  subtext: string;
  cta: { label: string; href: string };
  secondary?: { label: string; href: string };
  background?: "dark" | "navy" | "light";
}

export default function CtaSection({
  headline,
  subtext,
  cta,
  secondary,
  background = "dark",
}: CtaSectionProps) {
  const bg =
    background === "navy"
      ? "#1A2B5E"
      : background === "light"
      ? "#F4F6FA"
      : "#111827";

  return (
    <section
      className="py-28 lg:py-36 relative overflow-hidden"
      style={{ background: bg }}
      aria-label="Call to action"
    >
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(59,111,212,0.4) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-screen-2xl mx-auto px-6 lg:px-16 text-center">
        <FadeInOnScroll>
          <h2
            className="display-black text-white mb-6 mx-auto"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
              maxWidth: "54rem",
            }}
          >
            {headline}
          </h2>
        </FadeInOnScroll>

        {subtext && (
          <FadeInOnScroll delay={120}>
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              {subtext}
            </p>
          </FadeInOnScroll>
        )}

        <FadeInOnScroll delay={220}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href={cta.href} size="lg">
              {cta.label}
            </Button>
            {secondary && (
              <Button href={secondary.href} variant="outline" size="lg">
                {secondary.label}
              </Button>
            )}
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}

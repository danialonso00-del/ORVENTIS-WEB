import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import Badge from "@/components/ui/Badge";
import SectionTitle from "@/components/ui/SectionTitle";
import CtaSection from "@/components/sections/CtaSection";
import { Button } from "@/components/ui/Button";
import { brandContent } from "@/content/brand";
import { CheckIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Brand Positioning",
  description:
    "Strategic brand positioning and international expansion services. We build the foundation brands need to grow globally.",
};

export default function BrandPositioningPage() {
  const { hero, narrative, services, process, whyOrventis, cta } = brandContent;

  return (
    <>
      <Header />
      <main>
        {/* ── Hero with photo ── */}
        <section
          className="relative min-h-[85vh] flex items-end pb-20 overflow-hidden"
          aria-label="Brand Positioning"
        >
          <Image
            src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80"
            alt="Global city skyline representing international brand expansion"
            fill
            className="object-cover img-editorial"
            priority
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(5,8,16,0.97) 30%, rgba(5,8,16,0.55) 70%, rgba(28,28,46,0.35) 100%)",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 lg:px-16 pt-40">
            <div className="opacity-0" style={{ animation: "slideUp 0.6s ease-out 0.1s forwards" }}>
              <Badge variant="accent" className="mb-6">Brand Positioning</Badge>
            </div>
            <h1
              className="display-black text-white mb-6 opacity-0"
              style={{
                fontSize: "clamp(3rem, 7vw, 6.5rem)",
                animation: "slideUp 0.7s ease-out 0.2s forwards",
                maxWidth: "52rem",
              }}
            >
              {hero.headline}
            </h1>
            <p
              className="text-xl mb-4 opacity-0"
              style={{ color: "#5A8DE8", animation: "slideUp 0.7s ease-out 0.3s forwards" }}
            >
              {hero.subheadline}
            </p>
            <p
              className="text-lg text-gray-300 max-w-2xl opacity-0 mb-6"
              style={{ animation: "slideUp 0.7s ease-out 0.4s forwards" }}
            >
              {hero.description}
            </p>
            <p
              className="display-headline italic text-white opacity-0 mb-10"
              style={{
                fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
                animation: "slideUp 0.7s ease-out 0.45s forwards",
              }}
            >
              &ldquo;{hero.differentiator}&rdquo;
            </p>
            <div className="opacity-0" style={{ animation: "slideUp 0.7s ease-out 0.55s forwards" }}>
              <Button href="/contact" size="lg">
                Schedule a Discovery Call
              </Button>
            </div>
          </div>
          <style>{`
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(28px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </section>

        {/* ── Narrative + why Orventis ── */}
        <section
          className="py-28 lg:py-36"
          style={{ background: "#0D0D1A" }}
          aria-label="Brand narrative"
        >
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-20 items-start">
              <FadeInOnScroll direction="left">
                <div>
                  <p className="eyebrow mb-6">Our Approach</p>
                  <h2
                    className="display-black text-white leading-tight"
                    style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
                  >
                    {narrative.title}
                  </h2>
                  <div className="h-[3px] w-16 mt-6" style={{ background: "#3B6FD4" }} aria-hidden="true" />
                </div>
              </FadeInOnScroll>
              <FadeInOnScroll direction="right" delay={150}>
                <div>
                  <p className="text-lg text-gray-300 leading-relaxed mb-8">{narrative.body}</p>
                  <ul className="space-y-3">
                    {whyOrventis.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckIcon className="w-4 h-4 mt-1 shrink-0" style={{ color: "#3B6FD4" }} aria-hidden="true" />
                        <span className="text-gray-300 text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInOnScroll>
            </div>
          </div>
        </section>

        {/* ── Services grid with image ── */}
        <section
          className="py-28 lg:py-36"
          style={{ background: "#111827" }}
          aria-label="Brand Positioning Services"
        >
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
            <SectionTitle
              eyebrow="Our Services"
              headline="Everything your brand needs to go global"
              subtext="From strategy to execution — the full spectrum of international brand building."
              align="center"
            />

            {/* Photo strip above grid */}
            <FadeInOnScroll delay={100} className="mt-14 mb-14">
              <div
                className="relative w-full overflow-hidden rounded-xl img-cover"
                style={{ height: "320px", border: "1px solid rgba(59,111,212,0.15)" }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1920&q=80"
                  alt="International business strategy meeting"
                  fill
                  className="object-cover img-editorial"
                  sizes="100vw"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "rgba(5,8,16,0.45)" }}
                  aria-hidden="true"
                />
              </div>
            </FadeInOnScroll>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((service, i) => (
                <FadeInOnScroll key={service.id} delay={i * 55}>
                  <div
                    className="p-8 rounded-xl card-hover"
                    style={{
                      background: "var(--color-bg-card)",
                      border: "1px solid rgba(59,111,212,0.12)",
                    }}
                    id={service.id}
                  >
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-5"
                      style={{ background: "rgba(59,111,212,0.15)" }}
                      aria-hidden="true"
                    >
                      <ServiceIcon type={service.icon} />
                    </div>
                    <h3
                      className="display-headline text-white mb-3"
                      style={{ fontSize: "1.15rem" }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5">
                      {service.description}
                    </p>
                    <ul className="space-y-1.5">
                      {service.points.map((point, j) => (
                        <li key={j} className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="w-1 h-1 rounded-full shrink-0" style={{ background: "#3B6FD4" }} aria-hidden="true" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process ── */}
        <section
          className="py-28 lg:py-36"
          style={{ background: "#1A2B5E" }}
          aria-label="Brand Positioning Process"
        >
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
            <SectionTitle
              eyebrow="Our Process"
              headline="From discovery to market presence"
              subtext="A structured, proven approach to building brands that succeed internationally."
              align="center"
            />
            <div className="mt-16 space-y-4">
              {process.map((phase, i) => (
                <FadeInOnScroll key={phase.phase} delay={i * 55}>
                  <div
                    className="grid grid-cols-[72px_1fr_auto] lg:grid-cols-[100px_1fr_150px] gap-6 items-center p-6 lg:p-8 rounded-xl card-hover"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <div
                      className="text-4xl lg:text-5xl font-black opacity-35"
                      style={{ fontFamily: "var(--font-playfair)", color: "#5A8DE8" }}
                      aria-hidden="true"
                    >
                      {phase.phase}
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-1 text-base">{phase.title}</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">{phase.desc}</p>
                    </div>
                    <div className="hidden lg:block text-right text-sm font-semibold" style={{ color: "#5A8DE8" }}>
                      {phase.duration}
                    </div>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ── Brand photo ── */}
        <section
          className="relative overflow-hidden"
          style={{ height: "50vh", minHeight: "320px" }}
          aria-label="Brand work visual"
        >
          <Image
            src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1920&q=80"
            alt="Creative brand identity and design work"
            fill
            className="object-cover img-editorial"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{ background: "rgba(5,8,16,0.5)" }}
            aria-hidden="true"
          />
        </section>

        <CtaSection
          headline={cta.headline}
          subtext={cta.subtext}
          cta={{ label: cta.ctaLabel, href: cta.ctaHref }}
          secondary={{ label: "Commodity Trading", href: "/commodity-trading" }}
        />
      </main>
      <Footer />
    </>
  );
}

function ServiceIcon({ type }: { type: string }) {
  const p = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "#3B6FD4", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const };
  const icons: Record<string, React.ReactNode> = {
    strategy: <svg {...p}><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
    identity: <svg {...p}><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>,
    web: <svg {...p}><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4M7 8h10M7 12h6"/></svg>,
    advertising: <svg {...p}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
    content: <svg {...p}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>,
    market: <svg {...p}><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>,
  };
  return <>{icons[type] ?? icons.strategy}</>;
}

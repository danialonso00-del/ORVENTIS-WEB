import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { OrventisAnimatedHero } from "@/components/ui/animated-hero";
import StatsSection from "@/components/sections/StatsSection";
import CtaSection from "@/components/sections/CtaSection";
import ClientFlowDiagram from "@/components/sections/ClientFlowDiagram";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import { Button } from "@/components/ui/Button";
import { homeContent } from "@/content/home";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Orventis — Global Trade & Brand Strategy",
  description:
    "We Trade Commodities. We Build Brands. We Operate Globally. Orventis is your strategic partner for international commodity trading and brand positioning.",
};

export default function HomePage() {
  const { intro, businessLines, stats, closingCta } = homeContent;

  return (
    <>
      <Header />
      <main>
        {/* ── Animated Hero ── */}
        <OrventisAnimatedHero />

        {/* ── Intro ── */}
        <section
          className="py-28 lg:py-36"
          style={{ background: "#FFFFFF" }}
          aria-label="About Orventis"
        >
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <FadeInOnScroll direction="left">
                <div>
                  <p className="eyebrow mb-6">Who We Are</p>
                  <h2
                    className="display-black text-gray-900 mb-6"
                    style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)" }}
                  >
                    {intro.tagline}
                  </h2>
                  <div
                    className="h-[3px] w-16 mb-8"
                    style={{ background: "#3B6FD4" }}
                    aria-hidden="true"
                  />
                </div>
              </FadeInOnScroll>
              <FadeInOnScroll direction="right" delay={150}>
                <div className="space-y-5">
                  <p className="text-lg text-gray-600 leading-relaxed">{intro.description}</p>
                  <p className="text-base text-gray-500 leading-relaxed">{intro.detail}</p>
                  <div
                    className="flex flex-wrap items-center gap-3 pt-4"
                    style={{ borderTop: "1px solid rgba(15,23,42,0.08)" }}
                  >
                    {["Commodity Trading", "Brand Positioning", "6 Continents", "15+ Years"].map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded"
                        style={{
                          background: "#EEF3FB",
                          border: "1px solid rgba(59,111,212,0.2)",
                          color: "#1A2B5E",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeInOnScroll>
            </div>
          </div>
        </section>

        {/* ── Business Split — editorial 2-up with real images ── */}
        <section
          style={{ background: "#050810" }}
          aria-label="Business Lines"
        >
          <div className="grid lg:grid-cols-2">
            {businessLines.map((line, i) => (
              <FadeInOnScroll key={line.id} direction={i === 0 ? "left" : "right"} delay={i * 80}>
                <BusinessCard line={line} index={i} />
              </FadeInOnScroll>
            ))}
          </div>
        </section>

        {/* ── 3D Client Flow Diagram ── */}
        <ClientFlowDiagram />

        {/* ── Stats ── */}
        <StatsSection stats={stats} />

        {/* ── Editorial image break ── */}
        <section
          className="relative overflow-hidden"
          style={{ height: "55vh", minHeight: "360px" }}
          aria-label="Global operations visual"
        >
          <Image
            src="https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=1920&q=80"
            alt="Cargo ship navigating international waters"
            fill
            className="object-cover img-editorial"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background:
                "linear-gradient(to bottom, rgba(5,8,16,0.7) 0%, rgba(26,43,94,0.5) 50%, rgba(5,8,16,0.8) 100%)",
            }}
          >
            <FadeInOnScroll>
              <blockquote
                className="text-center px-6 max-w-4xl"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                <p
                  className="font-black italic text-white"
                  style={{ fontSize: "clamp(1.6rem, 4vw, 3.2rem)", letterSpacing: "-0.02em" }}
                >
                  &ldquo;Orventis is where global trade meets strategic brand thinking.&rdquo;
                </p>
              </blockquote>
            </FadeInOnScroll>
          </div>
        </section>

        {/* ── CTA ── */}
        <CtaSection
          headline={closingCta.headline}
          subtext={closingCta.subtext}
          cta={closingCta.cta}
          secondary={{ label: "Explore Services", href: "/commodity-trading" }}
        />
      </main>
      <Footer />
    </>
  );
}

/* ── Business card with real photo ── */
type BusinessLine = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  cta: { label: string; href: string };
  visual: string;
};

const CARD_IMAGES: Record<string, { src: string; alt: string }> = {
  "commodity-trading": {
    src: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=900&q=80",
    alt: "Global port with containers representing commodity trading",
  },
  "brand-positioning": {
    src: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=900&q=80",
    alt: "Brand design and creative strategy workspace",
  },
};

function BusinessCard({ line, index }: { line: BusinessLine; index: number }) {
  const img = CARD_IMAGES[line.id];
  return (
    <div
      className="relative flex flex-col justify-end min-h-[600px] lg:min-h-[740px] overflow-hidden group card-hover"
      style={{
        borderRight: index === 0 ? "1px solid rgba(59,111,212,0.12)" : "none",
      }}
    >
      {/* Photo */}
      {img && (
        <Image
          src={img.src}
          alt={img.alt}
          fill
          className="object-cover img-editorial transition-transform duration-700 group-hover:scale-[1.04]"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(5,8,16,0.97) 25%, rgba(5,8,16,0.55) 65%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Number */}
      <span
        className="absolute top-8 right-8 font-black opacity-[0.07] pointer-events-none select-none"
        style={{
          fontFamily: "var(--font-montserrat)",
          fontSize: "clamp(7rem, 14vw, 12rem)",
          color: "#fff",
          lineHeight: 1,
        }}
        aria-hidden="true"
      >
        {index === 0 ? "01" : "02"}
      </span>

      {/* Content */}
      <div className="relative z-10 p-10 lg:p-14">
        <p className="eyebrow mb-4">{line.subtitle}</p>
        <h2
          className="display-headline text-white mb-5"
          style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
        >
          {line.title}
        </h2>
        <p className="text-gray-300 leading-relaxed mb-8 max-w-md">{line.description}</p>
        <Button href={line.cta.href} variant="outline" size="lg" className="gap-3 group/btn">
          {line.cta.label}
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </Button>
      </div>
    </div>
  );
}

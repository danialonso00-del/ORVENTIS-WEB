import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import ShipRoute from "@/components/animations/ShipRoute";
import Badge from "@/components/ui/Badge";
import SectionTitle from "@/components/ui/SectionTitle";
import CtaSection from "@/components/sections/CtaSection";
import { Button } from "@/components/ui/Button";
import { commodityContent } from "@/content/commodity";
import { CheckIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Commodity Trading",
  description:
    "Premium agricultural commodity trading. Rice, grains, and high-volume commercial products sourced and delivered across global markets with verified logistics.",
};

export default function CommodityTradingPage() {
  const { hero, trustMessages, products, process, cta } = commodityContent;

  return (
    <>
      <Header />
      <main>
        {/* ── Hero with photo ── */}
        <section
          className="relative min-h-[85vh] flex items-end pb-20 overflow-hidden"
          aria-label="Commodity Trading"
        >
          <Image
            src="https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1920&q=80"
            alt="International shipping port with containers"
            fill
            className="object-cover img-editorial"
            priority
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(5,8,16,0.97) 30%, rgba(5,8,16,0.6) 70%, rgba(26,43,94,0.4) 100%)",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 lg:px-16 pt-40">
            <div
              className="opacity-0"
              style={{ animation: "slideUp 0.6s ease-out 0.1s forwards" }}
            >
              <Badge variant="accent" className="mb-6">Commodity Trading</Badge>
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
              className="text-lg text-gray-300 max-w-2xl opacity-0 mb-10"
              style={{ animation: "slideUp 0.7s ease-out 0.4s forwards" }}
            >
              {hero.description}
            </p>
            <div
              className="opacity-0"
              style={{ animation: "slideUp 0.7s ease-out 0.5s forwards" }}
            >
              <Button href="/contact" size="lg">
                Contact Trading Desk
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

        {/* ── Trust bar ── */}
        <section
          className="py-5 overflow-x-auto"
          style={{ background: "#1A2B5E", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
          aria-label="Trust indicators"
        >
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
            <div className="flex items-center gap-8 lg:gap-12 flex-nowrap lg:flex-wrap lg:justify-between min-w-max lg:min-w-0">
              {trustMessages.map((msg, i) => (
                <div key={i} className="flex items-center gap-2.5 shrink-0">
                  <CheckIcon
                    className="w-3.5 h-3.5 shrink-0"
                    style={{ color: "#5A8DE8" }}
                    aria-hidden="true"
                  />
                  <span className="text-xs font-medium text-white/75 whitespace-nowrap">
                    {msg}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Featured: Rice ── */}
        <section
          className="py-28 lg:py-36"
          style={{ background: "#0D0D1A" }}
          aria-label="Premium Rice Supply Chain"
          id="rice"
        >
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              {/* Text */}
              <FadeInOnScroll direction="left">
                <div>
                  <Badge variant="accent" className="mb-6">
                    {products.featured.badge}
                  </Badge>
                  <h2
                    className="display-headline text-white mb-6"
                    style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)" }}
                  >
                    {products.featured.title}
                  </h2>
                  <p className="text-lg text-gray-300 leading-relaxed mb-8">
                    {products.featured.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {products.featured.capabilities.map((cap, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckIcon
                          className="w-4 h-4 mt-1 shrink-0"
                          style={{ color: "#3B6FD4" }}
                          aria-hidden="true"
                        />
                        <span className="text-gray-300 text-sm">{cap}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {products.featured.origins.map((o) => (
                      <Badge key={o} variant="navy">{o}</Badge>
                    ))}
                  </div>
                </div>
              </FadeInOnScroll>

              {/* Photo */}
              <FadeInOnScroll direction="right" delay={150}>
                <div
                  className="relative rounded-xl overflow-hidden img-cover"
                  style={{
                    height: "480px",
                    border: "1px solid rgba(59,111,212,0.2)",
                  }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=900&q=80"
                    alt="Premium rice field — flagship commodity"
                    fill
                    className="object-cover img-editorial"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 p-8"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(5,8,16,0.92) 0%, transparent 100%)",
                    }}
                  >
                    <p
                      className="display-headline text-white mb-1"
                      style={{ fontSize: "1.3rem" }}
                    >
                      Premium Origin Sourcing
                    </p>
                    <p className="text-xs text-gray-400 tracking-wide">
                      SE Asia · South Asia · East Africa · Americas
                    </p>
                  </div>
                </div>
              </FadeInOnScroll>
            </div>
          </div>
        </section>

        {/* ── Ship Route Animation ── */}
        <section
          className="py-28 lg:py-36"
          style={{ background: "#050810" }}
          aria-label="Global Trading Network"
          id="map"
        >
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
            <SectionTitle
              eyebrow="Global Reach"
              headline="Our Shipping Routes"
              subtext="Orventis connects the world's key commodity hubs — from South America through Europe, the Gulf, and into Southeast Asia."
              align="center"
            />

            <FadeInOnScroll delay={200} className="mt-16">
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: "1px solid rgba(59,111,212,0.18)" }}
              >
                <ShipRoute />
              </div>
            </FadeInOnScroll>
          </div>
        </section>

        {/* ── Other commodities ── */}
        <section
          className="py-28 lg:py-36"
          style={{ background: "#0D0D1A" }}
          aria-label="Other Commodities"
          id="grains"
        >
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
            <SectionTitle
              eyebrow="Our Portfolio"
              headline="Commodities We Trade"
              subtext="Beyond rice, we source and trade a broad range of agricultural and commercial commodities across verified global supply chains."
              align="center"
            />

            <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {products.secondary.map((product, i) => (
                <FadeInOnScroll key={product.id} delay={i * 70}>
                  <div
                    className="p-7 rounded-xl card-hover"
                    style={{
                      background: "var(--color-bg-card)",
                      border: "1px solid rgba(59,111,212,0.12)",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded flex items-center justify-center mb-5"
                      style={{ background: "rgba(59,111,212,0.15)" }}
                      aria-hidden="true"
                    >
                      <CommodityIcon type={product.icon} />
                    </div>
                    <h3
                      className="display-headline text-white mb-3"
                      style={{ fontSize: "1.1rem" }}
                    >
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{product.description}</p>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process ── */}
        <section
          className="py-28 lg:py-36"
          style={{ background: "#111827" }}
          aria-label="Trading Process"
        >
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
            <SectionTitle
              eyebrow="How We Work"
              headline="End-to-End Transaction Process"
              subtext="From initial source verification to final payment settlement — complete transparency at every step."
              align="center"
            />

            <div className="mt-16 grid grid-cols-1 md:grid-cols-5 gap-3 relative">
              <div
                className="hidden md:block absolute top-10 left-[10%] right-[10%] h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(59,111,212,0.5), transparent)",
                }}
                aria-hidden="true"
              />
              {process.map((step, i) => (
                <FadeInOnScroll key={step.step} delay={i * 70}>
                  <div className="flex flex-col items-center text-center px-4 py-6">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center mb-4 relative z-10"
                      style={{
                        background: "#0D0D1A",
                        border: "2px solid #3B6FD4",
                        color: "#5A8DE8",
                        fontFamily: "var(--font-playfair)",
                        fontSize: "1.1rem",
                        fontWeight: 900,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {step.step}
                    </div>
                    <h3 className="font-semibold text-white mb-2 text-sm">{step.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ── Port photo strip ── */}
        <section
          className="relative overflow-hidden"
          style={{ height: "45vh", minHeight: "300px" }}
          aria-label="Port operations visual"
        >
          <Image
            src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&q=80"
            alt="Container port at dusk — global logistics operations"
            fill
            className="object-cover img-editorial"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(5,8,16,0.55) 0%, rgba(26,43,94,0.45) 50%, rgba(5,8,16,0.75) 100%)",
            }}
            aria-hidden="true"
          />
        </section>

        <CtaSection
          headline={cta.headline}
          subtext={cta.subtext}
          cta={{ label: cta.ctaLabel, href: cta.ctaHref }}
          secondary={{ label: "Brand Positioning", href: "/brand-positioning" }}
          background="navy"
        />
      </main>
      <Footer />
    </>
  );
}

function CommodityIcon({ type }: { type: string }) {
  const p = {
    width: 20, height: 20, viewBox: "0 0 24 24",
    fill: "none", stroke: "#3B6FD4", strokeWidth: 1.5,
    strokeLinecap: "round" as const, "aria-hidden": true as const,
  };
  const icons: Record<string, React.ReactNode> = {
    grains: <svg {...p}><path d="M12 2C6 2 3 6 3 10c0 4 3 8 9 10 6-2 9-6 9-10 0-4-3-8-9-8z"/><path d="M12 2v20M3 10h18"/></svg>,
    agricultural: <svg {...p}><path d="M12 22V12M12 12C12 7 8 3 3 3c0 5 4 9 9 9zM12 12c0-5 4-9 9-9 0 5-4 9-9 9"/></svg>,
    industrial: <svg {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
    consumer: <svg {...p}><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><path d="M3 6h18M16 10a4 4 0 01-8 0"/></svg>,
  };
  return <>{icons[type] ?? icons.grains}</>;
}

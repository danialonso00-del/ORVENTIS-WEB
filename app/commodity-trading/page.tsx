import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import ShipRoute from "@/components/animations/ShipRoute";
import Badge from "@/components/ui/Badge";
import SectionTitle from "@/components/ui/SectionTitle";
import CtaSection from "@/components/sections/CtaSection";
import CommodityAccordion from "@/components/sections/CommodityAccordion";
import { Button } from "@/components/ui/Button";
import { commodityContent } from "@/content/commodity";
import { CheckIcon, Globe, ShieldCheck, Ship, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Commodity Trading",
  description:
    "Premium agricultural commodity trading. Rice, grains, and high-volume commercial products sourced and delivered across global markets with verified logistics.",
};

export default function CommodityTradingPage() {
  const { hero, trustMessages, process, cta } = commodityContent;

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

        {/* ── What We Do ── */}
        <section
          className="py-28 lg:py-36"
          style={{ background: "#FFFFFF" }}
          aria-label="What we do in commodity trading"
          id="what-we-do"
        >
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              {/* Text */}
              <FadeInOnScroll direction="left">
                <div>
                  <p className="eyebrow mb-6">What We Do</p>
                  <h2
                    className="display-black text-gray-900 mb-6"
                    style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
                  >
                    We Source. We Trade. We Deliver.
                  </h2>
                  <div className="h-[3px] w-16 mb-8" style={{ background: "#3B6FD4" }} aria-hidden="true" />
                  <p className="text-lg text-gray-600 leading-relaxed mb-5">
                    Orventis is a global commodity trading company connecting producers, exporters, and end-buyers across 6 continents. We specialize in agricultural commodities, soft commodities, vegetable oils, proteins, and fertilizers.
                  </p>
                  <p className="text-gray-500 leading-relaxed mb-8">
                    With 15+ years of market expertise and relationships in 40+ countries, we provide reliable, certified, and efficiently executed trade solutions — from a single container to bulk vessel shipments.
                  </p>
                  <Button href="/contact" size="lg">
                    Contact Trading Desk
                  </Button>
                </div>
              </FadeInOnScroll>

              {/* Capability cards */}
              <FadeInOnScroll direction="right" delay={150}>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { Icon: Globe, label: "Global Sourcing", desc: "40+ origin countries across 6 continents" },
                    { Icon: ShieldCheck, label: "Quality Assured", desc: "SGS certified, full phytosanitary documentation" },
                    { Icon: Ship, label: "End-to-End Logistics", desc: "Port-to-port or door-to-door solutions" },
                    { Icon: TrendingUp, label: "Market Expertise", desc: "15+ years in international commodity markets" },
                  ].map((item, i) => (
                    <FadeInOnScroll key={item.label} delay={i * 60}>
                      <div
                        className="p-6 rounded-xl card-hover"
                        style={{
                          background: "#F8FAFD",
                          border: "1.5px solid rgba(15,23,42,0.07)",
                          boxShadow: "0 2px 12px rgba(15,23,42,0.04)",
                        }}
                      >
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                          style={{ background: "#EEF3FB" }}
                          aria-hidden="true"
                        >
                          <item.Icon size={18} style={{ color: "#3B6FD4" }} />
                        </div>
                        <h3
                          className="font-black text-gray-900 mb-1"
                          style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.88rem", letterSpacing: "-0.02em" }}
                        >
                          {item.label}
                        </h3>
                        <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </FadeInOnScroll>
                  ))}
                </div>
              </FadeInOnScroll>
            </div>
          </div>
        </section>

        {/* ── Commodity Portfolio Accordion ── */}
        <CommodityAccordion />

        {/* ── Global Sourcing ── */}
        <section
          className="py-28 lg:py-36"
          style={{ background: "#050810" }}
          aria-label="Global Sourcing Network"
          id="global-sourcing"
        >
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
            <SectionTitle
              eyebrow="Global Sourcing"
              headline="Our Sourcing Network"
              subtext="Orventis maintains active sourcing positions across 40+ countries — from South American grain belts to East African coffee estates, Gulf fertilizer plants, and Southeast Asian palm plantations."
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

        {/* ── Process ── */}
        <section
          className="py-28 lg:py-36"
          style={{ background: "#F8FAFD" }}
          aria-label="Trading Process"
        >
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
            <SectionTitle
              eyebrow="How We Work"
              headline="End-to-End Transaction Process"
              subtext="From initial source verification to final payment settlement — complete transparency at every step."
              align="center"
              light={true}
            />

            <div className="mt-16 grid grid-cols-1 md:grid-cols-5 gap-3 relative">
              <div
                className="hidden md:block absolute top-10 left-[10%] right-[10%] h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(59,111,212,0.4), transparent)",
                }}
                aria-hidden="true"
              />
              {process.map((step, i) => (
                <FadeInOnScroll key={step.step} delay={i * 70}>
                  <div className="flex flex-col items-center text-center px-4 py-6">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center mb-4 relative z-10"
                      style={{
                        background: "#FFFFFF",
                        border: "2px solid #3B6FD4",
                        color: "#3B6FD4",
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "1.1rem",
                        fontWeight: 900,
                        letterSpacing: "-0.02em",
                        boxShadow: "0 4px 16px rgba(59,111,212,0.12)",
                      }}
                    >
                      {step.step}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 text-sm">{step.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
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

import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import Badge from "@/components/ui/Badge";
import SectionTitle from "@/components/ui/SectionTitle";
import CtaSection from "@/components/sections/CtaSection";
import { aboutContent } from "@/content/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "Orventis is a global operations firm founded on the conviction that trade and brand strategy are two sides of the same coin. 15+ years of expertise across 6 continents.",
};

export default function AboutPage() {
  const { hero, story, values, team, cta } = aboutContent;

  return (
    <>
      <Header />
      <main>
        {/* ── Hero with photo ── */}
        <section
          className="relative min-h-[80vh] flex items-end pb-20 overflow-hidden"
          aria-label="About Orventis"
        >
          <Image
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&q=80"
            alt="International business team in discussion"
            fill
            className="object-cover img-editorial"
            priority
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(5,8,16,0.97) 30%, rgba(26,43,94,0.65) 70%, rgba(5,8,16,0.3) 100%)",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 lg:px-16 pt-40">
            <div className="opacity-0" style={{ animation: "slideUp 0.6s ease-out 0.1s forwards" }}>
              <Badge variant="accent" className="mb-6">About Orventis</Badge>
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
              className="display-headline text-blue-300 mb-6 opacity-0"
              style={{
                fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                animation: "slideUp 0.7s ease-out 0.3s forwards",
              }}
            >
              {hero.subheadline}
            </p>
            <p
              className="text-lg text-gray-300 max-w-2xl opacity-0"
              style={{ animation: "slideUp 0.7s ease-out 0.4s forwards" }}
            >
              {hero.description}
            </p>
          </div>
          <style>{`
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(28px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </section>

        {/* ── Our Story ── */}
        <section
          className="py-28 lg:py-36"
          style={{ background: "#0D0D1A" }}
          aria-label="Our Story"
        >
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-20 items-start">
              <FadeInOnScroll direction="left">
                <div>
                  <p className="eyebrow mb-6">Our Story</p>
                  <h2
                    className="display-black text-white leading-tight"
                    style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
                  >
                    {story.title}
                  </h2>
                  <div className="h-[3px] w-16 mt-6" style={{ background: "#3B6FD4" }} aria-hidden="true" />
                </div>
              </FadeInOnScroll>
              <FadeInOnScroll direction="right" delay={150}>
                <div className="space-y-5">
                  {story.paragraphs.map((p, i) => (
                    <p key={i} className="text-gray-300 leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </FadeInOnScroll>
            </div>
          </div>
        </section>

        {/* ── Full-bleed image: operations ── */}
        <section
          className="relative overflow-hidden"
          style={{ height: "52vh", minHeight: "340px" }}
          aria-label="Global operations"
        >
          <Image
            src="https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=1920&q=80"
            alt="Cargo vessel at sea representing Orventis global operations"
            fill
            className="object-cover img-editorial"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "rgba(5,8,16,0.55)" }}
            aria-hidden="true"
          />
        </section>

        {/* ── Values ── */}
        <section
          className="py-28 lg:py-36"
          style={{ background: "#111827" }}
          aria-label="Our Values"
        >
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
            <SectionTitle
              eyebrow="Our Values"
              headline="What drives every decision"
              subtext="These principles shape how we work, how we partner, and how we deliver — consistently, across every market we operate in."
              align="center"
            />
            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {values.map((value, i) => (
                <FadeInOnScroll key={value.title} delay={i * 70}>
                  <div
                    className="p-8 rounded-xl card-hover"
                    style={{
                      background: "var(--color-bg-card)",
                      border: "1px solid rgba(59,111,212,0.12)",
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-5"
                      style={{ background: "rgba(59,111,212,0.15)" }}
                      aria-hidden="true"
                    >
                      <ValueIcon type={value.icon} />
                    </div>
                    <h3
                      className="display-headline text-white mb-3"
                      style={{ fontSize: "1.15rem" }}
                    >
                      {value.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{value.description}</p>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ── Team ── */}
        <section
          className="py-28 lg:py-36"
          style={{ background: "#0D0D1A" }}
          aria-label="Our Team"
        >
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              {/* Text */}
              <FadeInOnScroll direction="left">
                <div>
                  <p className="eyebrow mb-6">The Team</p>
                  <h2
                    className="display-black text-white mb-6"
                    style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }}
                  >
                    {team.headline}
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-6">{team.description}</p>
                  <div
                    className="p-6 rounded-xl"
                    style={{
                      background: "rgba(59,111,212,0.1)",
                      border: "1px solid rgba(59,111,212,0.22)",
                    }}
                  >
                    <h3
                      className="font-bold text-white text-lg mb-1"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {team.members[0].name}
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">
                      {team.members[0].role}
                    </p>
                    <p className="text-sm text-gray-300 leading-relaxed">{team.members[0].bio}</p>
                  </div>
                </div>
              </FadeInOnScroll>

              {/* Photo */}
              <FadeInOnScroll direction="right" delay={150}>
                <div
                  className="relative rounded-xl overflow-hidden img-cover"
                  style={{
                    height: "460px",
                    border: "1px solid rgba(59,111,212,0.2)",
                  }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=80"
                    alt="Orventis leadership team in international business context"
                    fill
                    className="object-cover img-editorial"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "rgba(5,8,16,0.3)" }}
                    aria-hidden="true"
                  />
                </div>
              </FadeInOnScroll>
            </div>
          </div>
        </section>

        <CtaSection
          headline={cta.headline}
          subtext=""
          cta={{ label: cta.ctaLabel, href: cta.ctaHref }}
          secondary={{ label: "Our Services", href: "/commodity-trading" }}
          background="navy"
        />
      </main>
      <Footer />
    </>
  );
}

function ValueIcon({ type }: { type: string }) {
  const p = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "#3B6FD4", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const };
  const icons: Record<string, React.ReactNode> = {
    precision: <svg {...p}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="22" y1="12" x2="17" y2="12"/><line x1="7" y1="12" x2="2" y2="12"/><line x1="12" y1="2" x2="12" y2="7"/><line x1="12" y1="17" x2="12" y2="22"/></svg>,
    global: <svg {...p}><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>,
    trust: <svg {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    excellence: <svg {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  };
  return <>{icons[type] ?? icons.precision}</>;
}

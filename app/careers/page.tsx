import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import Badge from "@/components/ui/Badge";
import CtaSection from "@/components/sections/CtaSection";
import { Button } from "@/components/ui/Button";
import { Globe, Zap, Users, TrendingUp, MapPin, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Orventis — a global commodity trading and brand strategy company operating across 6 continents. Build your career at the intersection of international trade and strategic thinking.",
};

const VALUES = [
  {
    Icon: Globe,
    title: "Global Impact",
    desc: "Work on deals that span continents. Every transaction you contribute to moves real goods across real borders.",
  },
  {
    Icon: Zap,
    title: "Move Fast",
    desc: "Commodity markets don't wait. We operate with urgency, clarity, and decisiveness at every level of the organisation.",
  },
  {
    Icon: Users,
    title: "Collaborative Culture",
    desc: "Small team, large scope. You'll work directly with leadership and see the full picture of every deal.",
  },
  {
    Icon: TrendingUp,
    title: "Grow With Us",
    desc: "As Orventis scales, so do our people. We promote from within and invest seriously in professional development.",
  },
];

const OPEN_ROLES = [
  {
    title: "Commodity Trader",
    type: "Full-time",
    location: "Barcelona, Spain / Remote",
    dept: "Trading",
    desc: "Source and negotiate commodity contracts across grains, oilseeds, and soft commodities. Manage counterparty relationships and coordinate logistics from origin to destination.",
    tags: ["Commodity Markets", "Negotiation", "B2B Sales"],
  },
  {
    title: "Supply Chain Coordinator",
    type: "Full-time",
    location: "Barcelona, Spain",
    dept: "Operations",
    desc: "Coordinate end-to-end shipment execution including documentation, shipping line bookings, customs clearance, and communication with inspection agencies.",
    tags: ["Logistics", "Incoterms", "Documentation"],
  },
  {
    title: "Business Development Manager",
    type: "Full-time",
    location: "Dubai, UAE / Singapore",
    dept: "Commercial",
    desc: "Identify, qualify, and close new buyer and seller relationships across the MENA and Asia-Pacific regions. Represent Orventis at international trade events.",
    tags: ["Business Development", "MENA/APAC", "Trade Finance"],
  },
  {
    title: "Brand Strategy Associate",
    type: "Full-time · Junior",
    location: "Barcelona, Spain / Remote",
    dept: "Brand Positioning",
    desc: "Support the brand positioning team in delivering market entry strategies, visual identity projects, and international expansion roadmaps for emerging consumer brands.",
    tags: ["Brand Strategy", "Market Research", "Creative"],
  },
];

export default function CareersPage() {
  return (
    <>
      <Header />
      <main>
        {/* ── Hero ── */}
        <section
          className="relative min-h-[78vh] flex items-end pb-20 overflow-hidden"
          aria-label="Careers at Orventis"
        >
          <Image
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&q=80"
            alt="International team working together"
            fill
            className="object-cover img-editorial"
            priority
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(5,8,16,0.97) 30%, rgba(26,43,94,0.55) 70%, rgba(5,8,16,0.2) 100%)",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 lg:px-16 pt-40">
            <div className="opacity-0" style={{ animation: "slideUp 0.6s ease-out 0.1s forwards" }}>
              <Badge variant="accent" className="mb-6">Careers</Badge>
            </div>
            <h1
              className="display-black text-white mb-6 opacity-0"
              style={{
                fontSize: "clamp(3rem, 7vw, 6.5rem)",
                animation: "slideUp 0.7s ease-out 0.2s forwards",
                maxWidth: "52rem",
              }}
            >
              Build a career in global trade
            </h1>
            <p
              className="text-xl text-blue-300 mb-4 opacity-0"
              style={{ animation: "slideUp 0.7s ease-out 0.3s forwards" }}
            >
              Where ambition meets opportunity
            </p>
            <p
              className="text-lg text-gray-300 max-w-2xl opacity-0 mb-10"
              style={{ animation: "slideUp 0.7s ease-out 0.4s forwards" }}
            >
              Orventis operates at the intersection of international commodity markets and strategic brand thinking.
              We&apos;re a small, focused team with a large global footprint — and we&apos;re growing.
            </p>
            <div className="opacity-0" style={{ animation: "slideUp 0.7s ease-out 0.5s forwards" }}>
              <Button href="#open-roles" size="lg">
                View Open Roles
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

        {/* ── Why Orventis ── */}
        <section
          className="py-28 lg:py-36"
          style={{ background: "#FFFFFF" }}
          aria-label="Why work at Orventis"
        >
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <FadeInOnScroll direction="left">
                <div>
                  <p className="eyebrow mb-6">Why Orventis</p>
                  <h2
                    className="display-black text-gray-900 mb-6"
                    style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)" }}
                  >
                    Small team. Global scope. Real impact.
                  </h2>
                  <div className="h-[3px] w-16 mb-8" style={{ background: "#3B6FD4" }} aria-hidden="true" />
                  <p className="text-gray-600 leading-relaxed mb-5">
                    At Orventis you&apos;re not a number. You&apos;re a key player in transactions that span continents —
                    from sourcing grain in South America to delivering it to buyers in Southeast Asia.
                  </p>
                  <p className="text-gray-500 leading-relaxed">
                    We value clarity, speed, and excellence. If you&apos;re driven by markets, relationships,
                    and the challenge of international commerce, you&apos;ll find your people here.
                  </p>
                </div>
              </FadeInOnScroll>

              <FadeInOnScroll direction="right" delay={150}>
                <div className="grid grid-cols-2 gap-4">
                  {VALUES.map((val, i) => (
                    <FadeInOnScroll key={val.title} delay={i * 60}>
                      <div
                        className="p-6 rounded-xl card-hover"
                        style={{
                          background: "#F8FAFD",
                          border: "1.5px solid rgba(15,23,42,0.07)",
                        }}
                      >
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                          style={{ background: "#EEF3FB" }}
                        >
                          <val.Icon size={18} style={{ color: "#3B6FD4" }} />
                        </div>
                        <h3
                          className="font-black text-gray-900 mb-2"
                          style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.85rem", letterSpacing: "-0.02em" }}
                        >
                          {val.title}
                        </h3>
                        <p className="text-xs text-gray-500 leading-relaxed">{val.desc}</p>
                      </div>
                    </FadeInOnScroll>
                  ))}
                </div>
              </FadeInOnScroll>
            </div>
          </div>
        </section>

        {/* ── Office photo break ── */}
        <section
          className="relative overflow-hidden"
          style={{ height: "45vh", minHeight: "300px" }}
          aria-label="Orventis operations"
        >
          <Image
            src="https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=1920&q=80"
            alt="Global operations — cargo at sea"
            fill
            className="object-cover img-editorial"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: "linear-gradient(to bottom, rgba(26,43,94,0.6) 0%, rgba(5,8,16,0.75) 100%)",
            }}
          >
            <FadeInOnScroll>
              <div className="text-center px-6">
                <p
                  className="font-black italic text-white"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "clamp(1.4rem, 3.5vw, 2.8rem)",
                    letterSpacing: "-0.02em",
                    maxWidth: "48rem",
                  }}
                >
                  &ldquo;We look for people who are curious about markets, relentless about execution, and genuinely excited about global trade.&rdquo;
                </p>
              </div>
            </FadeInOnScroll>
          </div>
        </section>

        {/* ── Open Roles ── */}
        <section
          className="py-28 lg:py-36"
          style={{ background: "#F8FAFD" }}
          aria-label="Open positions"
          id="open-roles"
        >
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
            <FadeInOnScroll>
              <div className="mb-14">
                <p className="eyebrow mb-4">Open Positions</p>
                <h2
                  className="display-black text-gray-900 mb-4"
                  style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", maxWidth: "36rem" }}
                >
                  Join our growing team
                </h2>
                <p className="text-gray-500 text-lg max-w-xl leading-relaxed">
                  We&apos;re hiring across trading, operations, commercial, and brand strategy.
                  Don&apos;t see the right role? Send us an open application.
                </p>
              </div>
            </FadeInOnScroll>

            <div className="space-y-4">
              {OPEN_ROLES.map((role, i) => (
                <FadeInOnScroll key={role.title} delay={i * 60}>
                  <div
                    className="group rounded-2xl p-7 lg:p-8 card-hover cursor-pointer"
                    style={{
                      background: "#FFFFFF",
                      border: "1.5px solid rgba(15,23,42,0.08)",
                      boxShadow: "0 2px 16px rgba(15,23,42,0.05)",
                    }}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span
                            className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                            style={{ background: "#EEF3FB", color: "#1A2B5E" }}
                          >
                            {role.dept}
                          </span>
                          <span
                            className="text-xs font-semibold"
                            style={{ color: "#3B6FD4" }}
                          >
                            {role.type}
                          </span>
                        </div>
                        <h3
                          className="font-black text-gray-900 mb-2"
                          style={{ fontFamily: "var(--font-montserrat)", fontSize: "1.2rem", letterSpacing: "-0.025em" }}
                        >
                          {role.title}
                        </h3>
                        <div className="flex items-center gap-1.5 mb-3">
                          <MapPin size={12} style={{ color: "#94A3B8" }} />
                          <span className="text-sm text-gray-500">{role.location}</span>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed mb-4 max-w-2xl">
                          {role.desc}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {role.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs font-medium px-3 py-1 rounded-full"
                              style={{ background: "#F1F5F9", color: "#475569" }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <Button href="/contact" variant="outline" size="lg" className="gap-2 group/btn">
                          Apply Now
                          <ArrowUpRight size={16} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>

            {/* Open application */}
            <FadeInOnScroll delay={200}>
              <div
                className="mt-8 rounded-2xl p-8 text-center"
                style={{
                  background: "#EEF3FB",
                  border: "1.5px solid rgba(59,111,212,0.2)",
                }}
              >
                <p className="eyebrow mb-3">Don&apos;t See Your Role?</p>
                <h3
                  className="font-black text-gray-900 mb-3"
                  style={{ fontFamily: "var(--font-montserrat)", fontSize: "1.5rem", letterSpacing: "-0.03em" }}
                >
                  Send an open application
                </h3>
                <p className="text-gray-500 mb-6 max-w-xl mx-auto text-sm leading-relaxed">
                  If you&apos;re passionate about global trade, commodity markets, or international brand strategy,
                  we want to hear from you — even if there&apos;s no current opening that matches exactly.
                </p>
                <Button href="mailto:careers@orventis.com" size="lg">
                  Send Open Application
                </Button>
              </div>
            </FadeInOnScroll>
          </div>
        </section>

        <CtaSection
          headline="Ready to trade globally?"
          subtext="Whether you're joining our team or partnering with us — let's talk."
          cta={{ label: "Contact Us", href: "/contact" }}
          secondary={{ label: "Learn About Orventis", href: "/about" }}
          background="navy"
        />
      </main>
      <Footer />
    </>
  );
}

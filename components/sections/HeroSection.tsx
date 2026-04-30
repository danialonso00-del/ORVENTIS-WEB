"use client";

import { useEffect, useRef } from "react";
import TextRotator from "@/components/animations/TextRotator";
import Button from "@/components/ui/Button";

interface HeroSectionProps {
  headline: string[];
  rotatingPhrases: string[];
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
}

export default function HeroSection({
  headline,
  rotatingPhrases,
  ctaPrimary,
  ctaSecondary,
}: HeroSectionProps) {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const onScroll = () => {
      if (bgRef.current) {
        const offset = window.scrollY * 0.08;
        bgRef.current.style.transform = `translateY(${offset}px)`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        {/* Gradient base */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #0A0F1E 0%, #1A2B5E 40%, #1C1C2E 100%)",
          }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59,111,212,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59,111,212,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow orbs */}
        <div
          className="absolute rounded-full opacity-20"
          style={{
            width: "600px",
            height: "600px",
            top: "-100px",
            right: "-100px",
            background: "radial-gradient(circle, #3B6FD4 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute rounded-full opacity-10"
          style={{
            width: "400px",
            height: "400px",
            bottom: "0px",
            left: "10%",
            background: "radial-gradient(circle, #1A2B5E 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40"
          style={{ background: "linear-gradient(to bottom, transparent, #1C1C2E)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 lg:px-16 pt-32 pb-24">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 mb-8 opacity-0"
            style={{ animation: "slideUp 0.6s ease-out 0.1s forwards" }}
          >
            <span
              className="inline-block w-8 h-px"
              style={{ background: "#3B6FD4" }}
            />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              Global Operations
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-white font-bold leading-tight mb-6 opacity-0"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2.5rem, 5.5vw, 5rem)",
              letterSpacing: "-0.02em",
              animation: "slideUp 0.7s ease-out 0.2s forwards",
            }}
          >
            {headline.map((line, i) => (
              <span key={i} className="block">
                {i < headline.length - 1 ? (
                  line
                ) : (
                  <span style={{ color: "#3B6FD4" }}>{line}</span>
                )}
              </span>
            ))}
          </h1>

          {/* Rotating subtitle */}
          <div
            className="mb-10 opacity-0 h-8"
            style={{ animation: "slideUp 0.7s ease-out 0.35s forwards" }}
          >
            <TextRotator
              phrases={rotatingPhrases}
              className="text-lg text-blue-300 font-medium"
            />
          </div>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-start gap-4 opacity-0"
            style={{ animation: "slideUp 0.7s ease-out 0.5s forwards" }}
          >
            <Button href={ctaPrimary.href} variant="primary" size="lg">
              {ctaPrimary.label}
              <ArrowIcon />
            </Button>
            <Button href={ctaSecondary.href} variant="secondary" size="lg">
              {ctaSecondary.label}
            </Button>
          </div>

          {/* Stats teaser */}
          <div
            className="mt-16 pt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 opacity-0"
            style={{
              animation: "slideUp 0.7s ease-out 0.7s forwards",
              borderTop: "1px solid rgba(59,111,212,0.2)",
            }}
          >
            {[
              { val: "6", label: "Continents" },
              { val: "42", label: "Sectors" },
              { val: "95+", label: "Partnerships" },
              { val: "15+", label: "Years" },
            ].map((s) => (
              <div key={s.label}>
                <p
                  className="text-2xl font-bold text-white"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {s.val}
                </p>
                <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="text-xs text-gray-400 uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
          <div
            className="w-full h-6 bg-blue-400"
            style={{ animation: "scrollLine 1.5s ease-in-out infinite" }}
          />
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
      `}</style>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg className="ml-2 w-4 h-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

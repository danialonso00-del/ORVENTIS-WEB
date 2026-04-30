"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoveRight, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

function OrventisAnimatedHero() {
  const [titleNumber, setTitleNumber] = useState(0);

  const titles = useMemo(
    () => ["commodities.", "brands.", "partnerships.", "markets.", "growth."],
    []
  );

  useEffect(() => {
    const id = setTimeout(() => {
      setTitleNumber((n) => (n === titles.length - 1 ? 0 : n + 1));
    }, 2500);
    return () => clearTimeout(id);
  }, [titleNumber, titles]);

  return (
    <section
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      aria-label="Orventis Hero"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0">
        {/* Photo layer */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1920&q=80')`,
          }}
          role="img"
          aria-label="Global port and container shipping operations"
        />
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(10,15,30,0.92) 0%, rgba(26,43,94,0.85) 50%, rgba(28,28,46,0.88) 100%)",
          }}
        />
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
          aria-hidden="true"
        />
        {/* Radial accent */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(circle at top right, #3B6FD4 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
          aria-hidden="true"
        />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{ background: "linear-gradient(to bottom, transparent, #1C1C2E)" }}
          aria-hidden="true"
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 lg:px-16 pt-32 pb-28">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="inline-block w-10 h-[2px] bg-[#3B6FD4]" aria-hidden="true" />
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#3B6FD4]">
            Global Operations · Since 2009
          </span>
        </motion.div>

        {/* Main headline */}
        <div className="max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/60 font-medium mb-2"
            style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)", letterSpacing: "0.02em" }}
          >
            One partner for global
          </motion.p>

          {/* Animated word */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-black text-white leading-none"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(3.5rem, 9vw, 8.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.0,
            }}
          >
            <span className="relative inline-flex items-center">
              We trade&nbsp;
              <span
                className="relative inline-block overflow-hidden"
                style={{ minWidth: "3ch" }}
                aria-live="polite"
                aria-atomic="true"
              >
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute left-0 top-0 font-black"
                    style={{
                      color: "#3B6FD4",
                      fontFamily: "var(--font-playfair)",
                      whiteSpace: "nowrap",
                    }}
                    initial={{ opacity: 0, y: 80 }}
                    animate={
                      titleNumber === index
                        ? { opacity: 1, y: 0 }
                        : {
                            opacity: 0,
                            y: titleNumber > index ? -80 : 80,
                          }
                    }
                    transition={{ type: "spring", stiffness: 60, damping: 18 }}
                  >
                    {title}
                  </motion.span>
                ))}
                {/* invisible spacer for layout */}
                <span className="invisible" aria-hidden="true">
                  partnerships.
                </span>
              </span>
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-8 text-gray-300 max-w-2xl leading-relaxed"
            style={{ fontSize: "clamp(1rem, 1.6vw, 1.2rem)" }}
          >
            Orventis operates at the intersection of global commodity trading and strategic
            brand positioning — moving goods across oceans, moving brands across markets.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Button href="/commodity-trading" size="lg" variant="default" className="gap-3">
              Explore Services <MoveRight className="w-4 h-4" />
            </Button>
            <Button href="/contact" size="lg" variant="outline" className="gap-3">
              Get in Touch <ArrowDownRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="mt-20 pt-8 grid grid-cols-2 sm:grid-cols-4 gap-6"
          style={{ borderTop: "1px solid rgba(59,111,212,0.25)" }}
        >
          {[
            { val: "6", label: "Continents" },
            { val: "42", label: "Sectors" },
            { val: "95+", label: "Partnerships" },
            { val: "15+", label: "Years" },
          ].map((s) => (
            <div key={s.label}>
              <p
                className="text-3xl font-black text-white"
                style={{ fontFamily: "var(--font-playfair)", letterSpacing: "-0.03em" }}
              >
                {s.val}
              </p>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-[0.15em]">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-[10px] text-white/30 uppercase tracking-[0.2em]">scroll</span>
        <div className="w-[1px] h-10 overflow-hidden bg-white/10">
          <motion.div
            className="w-full h-4 bg-[#3B6FD4]"
            animate={{ y: ["-100%", "350%"] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

export { OrventisAnimatedHero };

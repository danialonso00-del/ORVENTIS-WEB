"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, useInView } from "framer-motion";
import {
  Briefcase,
  MessageSquare,
  Settings2,
  Truck,
  CheckCircle2,
  Wheat,
  ShieldCheck,
  Ship,
  Package,
} from "lucide-react";

const STEPS = [
  {
    id: "need",
    number: "01",
    Icon: Briefcase,
    title: "Client Need",
    desc: "You identify an import requirement — commodity, volume, destination, and timeline.",
    isHub: false,
    isSuccess: false,
  },
  {
    id: "contact",
    number: "02",
    Icon: MessageSquare,
    title: "Contact Orventis",
    desc: "Our trading desk reviews your specifications and prepares a tailored proposal within 24h.",
    isHub: false,
    isSuccess: false,
  },
  {
    id: "execute",
    number: "03",
    Icon: Settings2,
    title: "We Execute Everything",
    desc: "From sourcing to certification — every dimension of the trade, handled.",
    isHub: true,
    isSuccess: false,
    services: [
      { Icon: Wheat, label: "Commodity Sourcing" },
      { Icon: ShieldCheck, label: "Quality & Compliance" },
      { Icon: Ship, label: "Logistics & Freight" },
      { Icon: Package, label: "Brand & Packaging" },
    ],
  },
  {
    id: "ship",
    number: "04",
    Icon: Truck,
    title: "Ship & Track",
    desc: "Real-time cargo visibility from origin port to your final destination.",
    isHub: false,
    isSuccess: false,
  },
  {
    id: "success",
    number: "05",
    Icon: CheckCircle2,
    title: "Goal Delivered",
    desc: "Your commodities arrive on-spec, on-time, backed by full documentation.",
    isHub: false,
    isSuccess: true,
  },
] as const;

/* ── Animated connector between steps ── */
function Connector({ delay = 0 }: { delay?: number }) {
  return (
    <div
      className="hidden lg:block flex-shrink-0 relative self-center"
      style={{ width: "48px", height: "20px" }}
      aria-hidden="true"
    >
      {/* Base gradient line */}
      <div
        className="absolute inset-y-0 left-0 right-0 flex items-center"
        style={{ top: "50%", transform: "translateY(-50%)", height: 2 }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #CBD5E1 0%, #3B6FD4 100%)" }}
        />
      </div>

      {/* Arrow head */}
      <div
        className="absolute"
        style={{
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          width: 0,
          height: 0,
          borderLeft: "7px solid #3B6FD4",
          borderTop: "4px solid transparent",
          borderBottom: "4px solid transparent",
        }}
      />

      {/* Animated glowing dot */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 8,
          height: 8,
          top: "50%",
          transform: "translateY(-50%)",
          background: "#3B6FD4",
          boxShadow: "0 0 10px 2px rgba(59,111,212,0.6)",
        }}
        animate={{ x: [-4, 50], opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 1.4,
          delay,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut",
          times: [0, 0.1, 0.85, 1],
        }}
      />
    </div>
  );
}

/* ── Standard step card with 3D tilt ── */
function StepCard({
  step,
  index,
  isInView,
}: {
  step: (typeof STEPS)[number];
  index: number;
  isInView: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-60, 60], [6, -6]);
  const rotateY = useTransform(mx, [-60, 60], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
  };

  const isSuccess = step.isSuccess;

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        borderRadius: "20px",
        overflow: "hidden",
        position: "relative",
        background: isSuccess ? "#F0FDF4" : "#FFFFFF",
        border: `1.5px solid ${isSuccess ? "#BBF7D0" : "rgba(15,23,42,0.08)"}`,
        boxShadow: "0 4px 28px rgba(15,23,42,0.06)",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
        scale: { type: "spring", stiffness: 300, damping: 22 },
      }}
    >
      {/* Gradient top border */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0, height: 3,
          background: isSuccess
            ? "linear-gradient(90deg, #10B981, #059669)"
            : "linear-gradient(90deg, #5A8DE8, #3B6FD4)",
          borderRadius: "20px 20px 0 0",
        }}
      />

      {/* Watermark step number */}
      <div
        style={{
          position: "absolute",
          bottom: -10, right: -4,
          fontSize: "7rem",
          fontWeight: 900,
          lineHeight: 1,
          fontFamily: "var(--font-montserrat)",
          color: isSuccess ? "#DCFCE7" : "#F1F5F9",
          pointerEvents: "none",
          userSelect: "none",
          letterSpacing: "-0.04em",
        }}
        aria-hidden="true"
      >
        {step.number}
      </div>

      {/* Step label */}
      <span
        style={{
          fontSize: "0.58rem",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: isSuccess ? "#16A34A" : "#94A3B8",
          marginBottom: "1rem",
          display: "block",
        }}
      >
        Step {step.number}
      </span>

      {/* Icon */}
      <div
        style={{
          width: 44, height: 44,
          borderRadius: 12,
          background: isSuccess ? "#DCFCE7" : "#EEF3FB",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 16,
          flexShrink: 0,
        }}
      >
        <step.Icon size={20} style={{ color: isSuccess ? "#16A34A" : "#3B6FD4" }} />
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "var(--font-montserrat)",
          fontWeight: 900,
          fontSize: "0.95rem",
          letterSpacing: "-0.025em",
          color: isSuccess ? "#15803D" : "#0F172A",
          marginBottom: 8,
        }}
      >
        {step.title}
      </h3>

      {/* Description */}
      <p style={{ fontSize: "0.8rem", lineHeight: 1.65, color: isSuccess ? "#166534" : "#64748B" }}>
        {step.desc}
      </p>

      {/* Success badge */}
      {isSuccess && (
        <div style={{ marginTop: 16 }}>
          <span
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: "0.68rem", fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase",
              padding: "5px 12px", borderRadius: 999,
              background: "#DCFCE7", color: "#15803D",
            }}
          >
            <CheckCircle2 size={11} /> Delivered
          </span>
        </div>
      )}
    </motion.div>
  );
}

/* ── Hub step card with rotating gradient ring ── */
function HubCard({
  step,
  index,
  isInView,
}: {
  step: typeof STEPS[2];
  index: number;
  isInView: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-60, 60], [5, -5]);
  const rotateY = useTransform(mx, [-60, 60], [-5, 5]);

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", height: "100%" }}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        mx.set(e.clientX - rect.left - rect.width / 2);
        my.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
        scale: { type: "spring", stiffness: 300, damping: 22 },
      }}
    >
      {/* Rotating gradient ring wrapper */}
      <div style={{ position: "relative", padding: "2.5px", borderRadius: "22px", height: "100%" }}>
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "22px",
            background:
              "conic-gradient(from 0deg, #3B6FD4 0deg, #5A8DE8 90deg, #7BA7EF 180deg, #1A2B5E 270deg, #3B6FD4 360deg)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />

        {/* Card body */}
        <div
          style={{
            position: "relative",
            borderRadius: "20px",
            background: "#1A2B5E",
            padding: "24px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Step label */}
          <span
            style={{
              fontSize: "0.58rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              marginBottom: "1rem",
              display: "block",
            }}
          >
            Step {step.number}
          </span>

          {/* Icon */}
          <div
            style={{
              width: 44, height: 44,
              borderRadius: 12,
              background: "rgba(255,255,255,0.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 16,
              flexShrink: 0,
            }}
          >
            <step.Icon size={20} style={{ color: "#fff" }} />
          </div>

          {/* Title */}
          <h3
            style={{
              fontFamily: "var(--font-montserrat)",
              fontWeight: 900,
              fontSize: "0.95rem",
              letterSpacing: "-0.025em",
              color: "#fff",
              marginBottom: 8,
            }}
          >
            {step.title}
          </h3>

          {/* Description */}
          <p style={{ fontSize: "0.8rem", lineHeight: 1.65, color: "rgba(255,255,255,0.6)", marginBottom: 20 }}>
            {step.desc}
          </p>

          {/* Sub-services grid */}
          {"services" in step && step.services && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: "auto" }}>
              {step.services.map((svc) => (
                <motion.div
                  key={svc.label}
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: 10,
                    padding: "9px 10px",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                  whileHover={{ background: "rgba(255,255,255,0.14)" }}
                >
                  <svc.Icon size={13} style={{ color: "#5A8DE8", flexShrink: 0 }} />
                  <span
                    style={{
                      color: "rgba(255,255,255,0.82)",
                      fontSize: "0.63rem",
                      fontWeight: 700,
                      lineHeight: 1.3,
                      letterSpacing: "0.01em",
                    }}
                  >
                    {svc.label}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Component ── */
export default function ClientFlowDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  return (
    <section
      className="py-24 lg:py-32 overflow-hidden"
      style={{ background: "#F8FAFD" }}
      aria-label="How Orventis works"
    >
      {/* Subtle dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(59,111,212,0.07) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-screen-2xl mx-auto px-6 lg:px-16">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <p className="eyebrow mb-5">The Orventis Method</p>
          <h2
            className="display-black text-gray-900 mx-auto mb-5"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.6rem)", maxWidth: "46rem" }}
          >
            From your request to delivery
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            We are your single point of contact throughout the entire trade lifecycle — no hand-offs, no gaps.
          </p>
        </motion.div>

        {/* Flow Steps */}
        <div
          ref={containerRef}
          className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-0"
          style={{ perspective: "1400px" }}
        >
          {STEPS.map((step, i) => (
            <React.Fragment key={step.id}>
              {/* Step */}
              <div className="flex-1 min-w-0">
                {step.isHub ? (
                  <HubCard step={step as typeof STEPS[2]} index={i} isInView={isInView} />
                ) : (
                  <StepCard step={step} index={i} isInView={isInView} />
                )}
              </div>

              {/* Connector */}
              {i < STEPS.length - 1 && (
                <Connector delay={i * 0.35 + 0.6} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-slate-400 font-medium">
            Orventis handles commodities, logistics, compliance, and branding — all under one roof.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "accent" | "navy" | "outline";
  className?: string;
}

const variants = {
  accent: { background: "rgba(59,111,212,0.15)", color: "#5A8DE8", border: "1px solid rgba(59,111,212,0.3)" },
  navy: { background: "rgba(26,43,94,0.5)", color: "#fff", border: "1px solid rgba(59,111,212,0.2)" },
  outline: { background: "transparent", color: "#3B6FD4", border: "1px solid #3B6FD4" },
};

export default function Badge({ children, variant = "accent", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded ${className}`}
      style={{ ...variants[variant], borderRadius: "3px" }}
    >
      {children}
    </span>
  );
}

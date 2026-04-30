"use client";

import { useEffect, useState } from "react";

interface TextRotatorProps {
  phrases: string[];
  interval?: number;
  className?: string;
}

export default function TextRotator({ phrases, interval = 3000, className = "" }: TextRotatorProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % phrases.length);
        setVisible(true);
      }, 400);
    }, interval);

    return () => clearInterval(timer);
  }, [phrases.length, interval]);

  return (
    <span
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 0.4s ease-out, transform 0.4s ease-out",
        display: "block",
      }}
    >
      {phrases[index]}
    </span>
  );
}

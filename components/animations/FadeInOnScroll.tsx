"use client";

import { useRef, useEffect, useState, ReactNode } from "react";

interface FadeInOnScrollProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  className?: string;
  threshold?: number;
}

export default function FadeInOnScroll({
  children,
  delay = 0,
  direction = "up",
  className = "",
  threshold = 0.15,
}: FadeInOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const getTransform = () => {
    if (direction === "up") return "translateY(32px)";
    if (direction === "left") return "translateX(-32px)";
    if (direction === "right") return "translateX(32px)";
    return "none";
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : getTransform(),
        transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

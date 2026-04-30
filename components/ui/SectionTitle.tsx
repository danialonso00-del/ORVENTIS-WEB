import { ReactNode } from "react";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";

interface SectionTitleProps {
  eyebrow?: string;
  headline: ReactNode;
  subtext?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export default function SectionTitle({
  eyebrow,
  headline,
  subtext,
  align = "center",
  light = false,
  className = "",
}: SectionTitleProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  const textColor = light ? "text-gray-900" : "text-white";
  const mutedColor = light ? "text-gray-500" : "text-gray-400";

  return (
    <div className={`max-w-3xl ${alignClass} ${className}`}>
      {eyebrow && (
        <FadeInOnScroll delay={0}>
          <p className="eyebrow mb-5">{eyebrow}</p>
        </FadeInOnScroll>
      )}
      <FadeInOnScroll delay={100}>
        <h2
          className={`display-black leading-tight mb-5 ${textColor}`}
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)" }}
        >
          {headline}
        </h2>
      </FadeInOnScroll>
      {subtext && (
        <FadeInOnScroll delay={200}>
          <p className={`text-lg leading-relaxed ${mutedColor}`}>{subtext}</p>
        </FadeInOnScroll>
      )}
    </div>
  );
}

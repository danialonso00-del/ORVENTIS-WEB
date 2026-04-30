"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Trading", href: "/commodity-trading" },
  { label: "Brand Positioning", href: "/brand-positioning" },
  { label: "Careers", href: "/careers" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(28, 28, 46, 0.95)"
            : "linear-gradient(to bottom, rgba(28,28,46,0.7) 0%, transparent 100%)",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(59,111,212,0.15)" : "none",
        }}
      >
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16 flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="Orventis Home">
            <OrventisLogo />
            <span
              className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors duration-200"
              style={{ fontFamily: "var(--font-playfair)", letterSpacing: "-0.03em" }}
            >
              Orventis
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 relative group ${
                  pathname === link.href ? "text-blue-400" : "text-gray-300 hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-blue-400 transition-all duration-300 ${
                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/contact"
              className="px-5 py-2.5 text-sm font-semibold rounded text-white transition-all duration-200 hover:shadow-lg hover:scale-105"
              style={{ background: "#3B6FD4", borderRadius: "4px" }}
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2 z-50"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <span className="block w-6 h-0.5 bg-white transition-all" />
            <span className="block w-6 h-0.5 bg-white transition-all" />
            <span className="block w-4 h-0.5 bg-white transition-all" />
          </button>
        </div>
      </header>

      <MobileMenu
        links={navLinks}
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        pathname={pathname}
      />
    </>
  );
}

function OrventisLogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <circle cx="18" cy="18" r="17" stroke="#3B6FD4" strokeWidth="1.5" />
      <path
        d="M9 18 Q13 10 18 18 Q23 26 27 18"
        stroke="#3B6FD4"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M9 18 Q13 26 18 18 Q23 10 27 18"
        stroke="#5A8DE8"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
      <circle cx="9" cy="18" r="2.5" fill="#3B6FD4" />
      <circle cx="27" cy="18" r="2.5" fill="#3B6FD4" />
      <circle cx="18" cy="18" r="2" fill="#5A8DE8" />
    </svg>
  );
}

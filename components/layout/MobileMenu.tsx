"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { X } from "lucide-react";

interface MobileMenuProps {
  links: { label: string; href: string }[];
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

export default function MobileMenu({ links, isOpen, onClose, pathname }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ background: "#1C1C2E", borderLeft: "1px solid rgba(59,111,212,0.2)" }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-20 border-b border-white/10">
          <div className="relative h-10 w-44">
            <Image
              src="/Images/Orventis_logo_white.png"
              alt="Orventis"
              fill
              className="object-contain object-left"
            />
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 flex flex-col justify-center px-8 gap-2" aria-label="Mobile navigation">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`flex items-center gap-4 py-4 text-2xl font-medium border-b border-white/5 transition-colors duration-200 ${
                pathname === link.href ? "text-blue-400" : "text-gray-200 hover:text-white"
              }`}
              style={{
                transitionDelay: isOpen ? `${i * 50}ms` : "0ms",
              }}
            >
              <span
                className="text-xs font-mono text-blue-400/60 w-6"
              >
                0{i + 1}
              </span>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Bottom CTA */}
        <div className="px-8 pb-12">
          <Link
            href="/contact"
            onClick={onClose}
            className="block w-full text-center py-4 font-semibold text-white rounded transition-all duration-200 hover:opacity-90"
            style={{ background: "#3B6FD4", borderRadius: "4px" }}
          >
            Get in Touch
          </Link>
          <p className="mt-6 text-xs text-gray-500 text-center">
            © {new Date().getFullYear()} Orventis. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}

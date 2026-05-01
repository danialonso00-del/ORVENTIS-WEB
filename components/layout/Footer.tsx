import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  services: [
    { label: "Trading", href: "/commodity-trading" },
    { label: "Brand Positioning", href: "/brand-positioning" },
    { label: "Careers", href: "/careers" },
    { label: "About Orventis", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  trading: [
    { label: "Rice Supply Chain", href: "/commodity-trading#rice" },
    { label: "Grains & Cereals", href: "/commodity-trading#grains" },
    { label: "Global Trading Hubs", href: "/commodity-trading#map" },
    { label: "Trading Desk", href: "/contact" },
  ],
  brand: [
    { label: "Brand Strategy", href: "/brand-positioning#strategy" },
    { label: "Visual Identity", href: "/brand-positioning#identity" },
    { label: "Web Presence", href: "/brand-positioning#web" },
    { label: "Market Entry", href: "/brand-positioning#market" },
  ],
};

export default function Footer() {
  return (
    <footer
      style={{
        background: "#111827",
        borderTop: "1px solid rgba(59,111,212,0.2)",
      }}
    >
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-16 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center mb-6">
              <div className="relative h-8 w-40">
                <Image
                  src="/images/Orventis_logo_white.png"
                  alt="Orventis"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">
              Where global trade meets strategic brand thinking. Operating across 6 continents with 15+ years of expertise.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://linkedin.com/company/orventis"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600/20 transition-all duration-200"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                aria-label="Orventis on LinkedIn"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>

          {/* Nav columns */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-5">Company</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-5">Trading</h3>
            <ul className="space-y-3">
              {footerLinks.trading.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-5">Brand Services</h3>
            <ul className="space-y-3">
              {footerLinks.brand.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Orventis. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Global Trade & Strategic Brand Positioning
          </p>
        </div>
      </div>
    </footer>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

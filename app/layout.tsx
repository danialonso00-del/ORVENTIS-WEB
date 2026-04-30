import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Orventis",
    default: "Orventis — Global Trade & Brand Strategy",
  },
  description:
    "Orventis operates at the intersection of global commodity trading and strategic brand positioning. We source, move, and grow — across borders, across industries.",
  keywords: ["commodity trading", "brand positioning", "global trade", "rice supply chain", "international expansion"],
  openGraph: {
    type: "website",
    siteName: "Orventis",
    title: "Orventis — Global Trade & Brand Strategy",
    description: "We Trade Commodities. We Build Brands. We Operate Globally.",
    images: [{ url: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1200&q=80" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}

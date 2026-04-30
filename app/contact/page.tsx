import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import Badge from "@/components/ui/Badge";
import ContactForm from "@/components/sections/ContactForm";
import { contactContent } from "@/content/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Orventis for commodity trading inquiries, brand positioning projects, or strategic partnerships.",
};

export default function ContactPage() {
  const { hero, info, reasons, form } = contactContent;

  return (
    <>
      <Header />
      <main>
        {/* ── Hero with photo ── */}
        <section
          className="relative min-h-[65vh] flex items-end pb-16 overflow-hidden"
          aria-label="Contact Orventis"
        >
          <Image
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80"
            alt="Dubai skyline — international business hub"
            fill
            className="object-cover img-editorial"
            priority
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(5,8,16,0.97) 30%, rgba(26,43,94,0.55) 70%, rgba(5,8,16,0.25) 100%)",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 lg:px-16 pt-36">
            <div className="opacity-0" style={{ animation: "slideUp 0.6s ease-out 0.1s forwards" }}>
              <Badge variant="accent" className="mb-6">Contact</Badge>
            </div>
            <h1
              className="display-black text-white mb-4 opacity-0"
              style={{
                fontSize: "clamp(3rem, 7vw, 6rem)",
                animation: "slideUp 0.7s ease-out 0.2s forwards",
                maxWidth: "44rem",
              }}
            >
              {hero.headline}
            </h1>
            <p
              className="display-headline text-blue-300 mb-5 opacity-0"
              style={{
                fontSize: "clamp(1.2rem, 2.2vw, 1.8rem)",
                animation: "slideUp 0.7s ease-out 0.3s forwards",
              }}
            >
              {hero.subheadline}
            </p>
            <p
              className="text-gray-300 text-lg max-w-xl opacity-0"
              style={{ animation: "slideUp 0.7s ease-out 0.4s forwards" }}
            >
              {hero.description}
            </p>
          </div>
          <style>{`
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(28px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </section>

        {/* ── Form + sidebar ── */}
        <section
          className="py-28 lg:py-36"
          style={{ background: "#FFFFFF" }}
          aria-label="Contact form and information"
        >
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
            <div className="grid lg:grid-cols-[1fr_400px] gap-16 xl:gap-24">

              {/* Form */}
              <FadeInOnScroll direction="left">
                <div>
                  <p className="eyebrow mb-4">Send a Message</p>
                  <h2
                    className="display-black text-gray-900 mb-10"
                    style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
                  >
                    Tell us about your project
                  </h2>
                  <ContactForm
                    fields={form.fields}
                    submitLabel={form.submitLabel}
                    successMessage={form.successMessage}
                  />
                </div>
              </FadeInOnScroll>

              {/* Sidebar */}
              <FadeInOnScroll direction="right" delay={200}>
                <div className="space-y-8 lg:pt-24">
                  {/* Contact info */}
                  <div
                    className="p-7 rounded-xl"
                    style={{
                      background: "#F8FAFD",
                      border: "1.5px solid rgba(59,111,212,0.15)",
                    }}
                  >
                    <h3
                      className="display-headline text-gray-900 mb-5"
                      style={{ fontSize: "1.15rem" }}
                    >
                      Contact Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <EmailIcon />
                        <div>
                          <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Email</p>
                          <a
                            href={`mailto:${info.email}`}
                            className="text-sm text-blue-500 hover:text-blue-700 transition-colors duration-200"
                          >
                            {info.email}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <LinkedInIcon />
                        <div>
                          <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">LinkedIn</p>
                          <a
                            href={info.linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-500 hover:text-blue-700 transition-colors duration-200"
                          >
                            Orventis on LinkedIn
                          </a>
                        </div>
                      </div>
                    </div>
                    <div
                      className="mt-5 pt-5 flex items-start gap-2"
                      style={{ borderTop: "1px solid rgba(15,23,42,0.08)" }}
                    >
                      <ClockIcon />
                      <p className="text-xs text-gray-500">{info.responseTime}</p>
                    </div>
                  </div>

                  {/* Reasons */}
                  <div>
                    <p className="eyebrow mb-5">How Can We Help?</p>
                    <div className="space-y-3">
                      {reasons.map((reason) => (
                        <div
                          key={reason.title}
                          className="flex items-start gap-4 p-4 rounded-lg card-hover"
                          style={{
                            background: "#F8FAFD",
                            border: "1.5px solid rgba(15,23,42,0.07)",
                          }}
                        >
                          <div
                            className="w-8 h-8 rounded flex items-center justify-center shrink-0"
                            style={{ background: "#EEF3FB" }}
                            aria-hidden="true"
                          >
                            <ReasonIcon type={reason.icon} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{reason.title}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{reason.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Decorative photo */}
                  <div
                    className="relative rounded-xl overflow-hidden img-cover"
                    style={{ height: "200px", border: "1.5px solid rgba(15,23,42,0.08)", boxShadow: "0 4px 20px rgba(15,23,42,0.06)" }}
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80"
                      alt="Singapore skyline — Orventis Asia hub"
                      fill
                      className="object-cover img-editorial"
                      sizes="400px"
                    />
                    <div
                      className="absolute bottom-0 left-0 right-0 p-4"
                      style={{
                        background: "linear-gradient(to top, rgba(5,8,16,0.9), transparent)",
                      }}
                    >
                      <p className="text-xs text-gray-300 font-medium">Singapore · Asia Hub</p>
                    </div>
                  </div>
                </div>
              </FadeInOnScroll>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function EmailIcon() {
  return <svg className="w-5 h-5 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#3B6FD4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
}
function LinkedInIcon() {
  return <svg className="w-5 h-5 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#3B6FD4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>;
}
function ClockIcon() {
  return <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
}
function ReasonIcon({ type }: { type: string }) {
  const p = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "#3B6FD4", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const };
  const icons: Record<string, React.ReactNode> = {
    trading: <svg {...p}><path d="M18 20V10M12 20V4M6 20v-6"/></svg>,
    brand: <svg {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    partnership: <svg {...p}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
    other: <svg {...p}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  };
  return <>{icons[type] ?? icons.other}</>;
}

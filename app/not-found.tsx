import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main
        className="flex-1 flex items-center justify-center"
        style={{ background: "#1C1C2E", minHeight: "80vh" }}
      >
        <div className="text-center px-6">
          <p
            className="text-8xl font-bold opacity-10 mb-4"
            style={{
              fontFamily: "var(--font-playfair)",
              color: "#3B6FD4",
              fontSize: "10rem",
              lineHeight: 1,
            }}
            aria-hidden="true"
          >
            404
          </p>
          <h1
            className="text-3xl font-semibold text-white mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Page Not Found
          </h1>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white rounded transition-all duration-200 hover:scale-105"
            style={{ background: "#3B6FD4", borderRadius: "4px" }}
          >
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

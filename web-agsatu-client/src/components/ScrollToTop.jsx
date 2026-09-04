import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-5 sm:bottom-6 right-4 sm:right-6 lg:right-8 z-50 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-primary/90 backdrop-blur text-white shadow-lg shadow-primary/30 flex items-center justify-center hover:bg-primary transition-all duration-300 hover:-translate-y-0.5 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-label="Kembali ke atas"
    >
      <svg
        className="w-4 h-4 sm:w-5 sm:h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}

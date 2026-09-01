import { useState, useEffect } from "react";

const navLinks = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang", href: "#tentang" },
  { label: "Layanan", href: "#layanan" },
  { label: "Tim", href: "#tim" },
  { label: "Portofolio", href: "#portofolio" },
  { label: "Kontak", href: "#kontak" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("beranda");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = navLinks.map((link) => link.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[4.5rem] sm:h-20 lg:h-24">
        <a href="#beranda" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-shadow">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <span className="text-lg sm:text-xl font-bold tracking-tight text-dark">
            AG<span className="text-primary">Satu</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-2 lg:gap-3">
          {navLinks.map((link) => {
            const section = link.href.slice(1);
            const isActive = activeSection === section;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  isActive
                    ? "text-primary bg-primary/5"
                    : scrolled
                      ? "text-gray-600 hover:text-primary hover:bg-gray-50"
                      : "text-gray-700 hover:text-primary hover:bg-gray-50"
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <a
            href="#kontak"
            className="ml-4 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-all shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 whitespace-nowrap"
          >
            Hubungi Kami
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 -mr-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span
            className={`w-6 h-0.5 bg-dark transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`w-6 h-0.5 bg-dark transition-all duration-300 ${mobileOpen ? "opacity-0 scale-0" : ""}`}
          />
          <span
            className={`w-6 h-0.5 bg-dark transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="bg-white border-t border-gray-100 shadow-lg px-6 sm:px-8 py-5 flex flex-col gap-2">
          {navLinks.map((link) => {
            const section = link.href.slice(1);
            const isActive = activeSection === section;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 font-medium rounded-lg transition-all ${
                  isActive
                    ? "text-primary bg-primary/5"
                    : "text-gray-700 hover:text-primary hover:bg-gray-50"
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <a
            href="#kontak"
            onClick={() => setMobileOpen(false)}
            className="mt-3 px-5 py-3 bg-primary text-white text-sm font-semibold rounded-lg text-center hover:bg-primary-dark transition-colors"
          >
            Hubungi Kami
          </a>
        </div>
      </div>
    </nav>
  );
}

import { useEffect, useState } from "react";

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="beranda"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float delay-200" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #000 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-32 sm:pt-36 pb-20 sm:pb-24">
        <h1
          className={`text-balance text-4xl sm:text-5xl md:text-6xl 2xl:text-7xl font-extrabold tracking-tight text-dark leading-[1.15] mb-7 sm:mb-8 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          Kami Membangun{" "}
          <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
            Pengalaman Digital
          </span>{" "}
          yang Berarti
        </h1>

        <p
          className={`text-base sm:text-lg md:text-xl text-gray max-w-2xl mx-auto mb-9 sm:mb-11 leading-relaxed transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          AGSatu adalah software house layanan lengkap yang mengkhususkan diri
          dalam aplikasi web, aplikasi mobile, dan solusi perangkat lunak kustom
          yang mendorong pertumbuhan bisnis.
        </p>

        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <a
            href="#portofolio"
            className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 text-center"
          >
            Lihat Karya Kami
          </a>
          <a
            href="#kontak"
            className="w-full sm:w-auto px-8 py-4 bg-white text-dark font-semibold rounded-xl border border-gray-200 hover:border-primary/30 hover:shadow-md transition-all hover:-translate-y-0.5 text-center"
          >
            Mulai Proyek
          </a>
        </div>

        {/* Stats */}
        <div
          className={`mt-16 sm:mt-20 lg:mt-24 grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8 sm:gap-x-12 border-t border-gray-200 pt-12 sm:pt-14 transition-all duration-700 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          {[
            { value: "50+", label: "Proyek Selesai" },
            { value: "30+", label: "Klien Puas" },
            { value: "5+", label: "Tahun Pengalaman" },
            { value: "15+", label: "Anggota Tim" },
          ].map((stat) => (
            <div key={stat.label} className="group">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark group-hover:text-primary transition-colors">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray mt-1.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 delay-700 ${visible ? "opacity-100" : "opacity-0"}`}
      >
        <a
          href="#tentang"
          className="flex flex-col items-center gap-2 text-gray hover:text-primary transition-colors"
          aria-label="Gulir ke bawah"
        >
          <span className="text-xs font-medium uppercase tracking-wider">
            Gulir
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 bg-current rounded-full animate-bounce-gentle" />
          </div>
        </a>
      </div>
    </section>
  );
}

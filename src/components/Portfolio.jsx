const projects = [
  {
    title: "FinTrack Pro",
    category: "FinTech",
    description:
      "Platform pelacakan keuangan komprehensif dengan analitik waktu nyata, perencanaan anggaran, dan manajemen portofolio investasi.",
    tech: ["React", "Node.js", "PostgreSQL", "Chart.js"],
    gradient: "from-indigo-500 to-purple-600",
    pattern:
      "radial-gradient(circle at 30% 70%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(255,255,255,0.1) 0%, transparent 50%)",
  },
  {
    title: "MediCare Connect",
    category: "Kesehatan",
    description:
      "Platform telemedicine yang menghubungkan pasien dengan penyedia layanan kesehatan melalui konsultasi video dan resep digital.",
    tech: ["Next.js", "TypeScript", "WebRTC", "AWS"],
    gradient: "from-emerald-500 to-teal-600",
    pattern:
      "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)",
  },
  {
    title: "EduLearn Academy",
    category: "EdTech",
    description:
      "Platform e-learning interaktif dengan kelas langsung, pelacakan kemajuan, gamifikasi, dan sistem sertifikasi.",
    tech: ["Vue.js", "Python", "MongoDB", "Docker"],
    gradient: "from-orange-500 to-red-500",
    pattern:
      "radial-gradient(circle at 60% 40%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 40% 60%, rgba(255,255,255,0.1) 0%, transparent 50%)",
  },
  {
    title: "ShopFlow",
    category: "E-Commerce",
    description:
      "Solusi e-commerce headless dengan dukungan multi-vendor, inventaris waktu nyata, dan rekomendasi produk berbasis AI.",
    tech: ["Next.js", "GraphQL", "Stripe", "Redis"],
    gradient: "from-pink-500 to-rose-600",
    pattern:
      "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)",
  },
];

export default function Portfolio() {
  return (
    <section
      id="portofolio"
      className="scroll-mt-20 lg:scroll-mt-24 py-24 sm:py-28 lg:py-36 bg-surface"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 lg:mb-24 reveal">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Karya Kami
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mt-3 mb-4">
            Proyek Unggulan
          </h2>
          <p className="text-gray text-lg">
            Kumpulan proyek yang telah kami selesaikan dengan bangga untuk klien
            kami di berbagai industri.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-9 lg:gap-10">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 reveal"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div
                className={`relative h-44 sm:h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
              >
                {/* pattern rendered as its own layer so it no longer overrides the gradient */}
                <div
                  className="absolute inset-0"
                  style={{ backgroundImage: project.pattern }}
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />
                <span className="text-white/30 text-4xl sm:text-5xl md:text-6xl font-black tracking-wider uppercase relative z-10 group-hover:scale-110 transition-transform duration-300">
                  {project.category}
                </span>
                <div className="absolute top-4 right-4 flex gap-1.5">
                  <div className="w-2 h-2 bg-white/40 rounded-full" />
                  <div className="w-2 h-2 bg-white/30 rounded-full" />
                  <div className="w-2 h-2 bg-white/20 rounded-full" />
                </div>
              </div>
              <div className="p-8 sm:p-10">
                <div className="flex items-center gap-3 mb-3.5">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-dark mb-2.5 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 bg-gray-50 text-gray text-xs font-medium rounded-md group-hover:bg-primary/5 group-hover:text-primary transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

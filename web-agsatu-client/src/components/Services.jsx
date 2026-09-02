import { useEffect, useState } from "react";
import api from "../services/api";

// Peta kode "icon" dari database ke SVG lokal.
// Kalau nambah service baru dengan icon baru di admin panel nanti,
// tinggal tambahkan key baru di sini + fallback default di bawah.
const iconMap = {
  web: (
    <svg
      className="w-7 h-7"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
      />
    </svg>
  ),
  mobile: (
    <svg
      className="w-7 h-7"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
      />
    </svg>
  ),
  backend: (
    <svg
      className="w-7 h-7"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
      />
    </svg>
  ),
  design: (
    <svg
      className="w-7 h-7"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
      />
    </svg>
  ),
  default: (
    <svg
      className="w-7 h-7"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
      />
    </svg>
  ),
};

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/services")
      .then((res) => setServices(res.data.data))
      .catch(() => setError("Gagal memuat data layanan."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section
      id="layanan"
      className="scroll-mt-20 lg:scroll-mt-24 py-24 sm:py-28 lg:py-36 bg-surface"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 lg:mb-24 reveal">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Apa yang Kami Lakukan
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mt-3 mb-4">
            Layanan yang Kami Tawarkan
          </h2>
          <p className="text-gray text-lg">
            Dari konsep hingga penerapan, kami menyediakan layanan pengembangan
            perangkat lunak end-to-end yang disesuaikan dengan kebutuhan bisnis
            Anda.
          </p>
        </div>

        {loading && (
          <p className="text-center text-gray">Memuat layanan...</p>
        )}

        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-9 lg:gap-10">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="group bg-white rounded-2xl p-8 sm:p-10 border border-gray-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 reveal"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-7 group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/25">
                  {iconMap[service.icon] || iconMap.default}
                </div>
                <h3 className="text-xl font-bold text-dark mb-3.5 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray leading-relaxed mb-6">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {(service.tags || []).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-gray-50 text-gray text-xs font-medium rounded-md group-hover:bg-primary/5 group-hover:text-primary transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

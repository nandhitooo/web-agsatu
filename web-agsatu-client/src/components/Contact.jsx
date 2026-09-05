import { useState, useEffect } from "react";
import api from "../services/api";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [contactInfo, setContactInfo] = useState({
    email: "",
    phone: "",
    office_address: "",
  });

  useEffect(() => {
    api
      .get("/contact-info")
      .then((res) => setContactInfo(res.data.data))
      .catch(() => {
        // biarkan default kosong kalau gagal, kartu kontak cuma tidak
        // menampilkan nilai daripada bikin seluruh section error
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await api.post("/inquiries", formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", company: "", message: "" });
    } catch (err) {
      if (err.response?.status === 422) {
        // Error validasi dari Laravel, ambil pesan pertama yang ada
        const firstError = Object.values(err.response.data.errors || {})[0];
        setError(firstError?.[0] || "Data yang dikirim tidak valid.");
      } else {
        setError("Gagal mengirim pesan. Silakan coba lagi.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="kontak"
      className="scroll-mt-20 lg:scroll-mt-24 pt-24 sm:pt-28 lg:pt-36 pb-32 sm:pb-36 lg:pb-44 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 lg:items-center">
          {/* Left info */}
          <div className="reveal-left">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Hubungi Kami
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark mt-3 mb-6 leading-tight">
              Mari Membangun Sesuatu yang Hebat Bersama
            </h2>
            <p className="text-gray text-lg leading-relaxed mb-10 sm:mb-12">
              Punya proyek dalam pikiran? Kami ingin mendengarnya. Kirimkan
              pesan kepada kami dan kami akan menghubungi Anda dalam waktu 24
              jam.
            </p>

            <div className="space-y-7 sm:space-y-8">
              {[
                {
                  icon: (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  ),
                  label: "Email",
                  value: contactInfo.email || "-",
                  href: contactInfo.email ? `mailto:${contactInfo.email}` : "#",
                },
                {
                  icon: (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                  ),
                  label: "Telepon",
                  value: contactInfo.phone || "-",
                  href: contactInfo.phone
                    ? `tel:${contactInfo.phone.replace(/\s+/g, "")}`
                    : "#",
                },
                {
                  icon: (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                  ),
                  label: "Kantor",
                  value: contactInfo.office_address || "-",
                  href: "#",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/25">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-sm text-gray">{item.label}</div>
                    <div className="font-semibold text-dark group-hover:text-primary transition-colors">
                      {item.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right form */}
          <div className="reveal-right">
            <div className="bg-surface rounded-2xl p-8 sm:p-10 lg:p-12 border border-gray-100 shadow-sm">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-scale-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-5">
                    <svg
                      className="w-8 h-8 text-emerald-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-2">
                    Pesan Terkirim!
                  </h3>
                  <p className="text-gray mb-6">
                    Terima kasih telah menghubungi. Kami akan segera menghubungi
                    Anda kembali.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-primary font-semibold hover:underline"
                  >
                    Kirim pesan lainnya
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="px-4 py-3 rounded-xl bg-red-50 text-red-600 text-sm">
                      {error}
                    </div>
                  )}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-dark mb-2"
                    >
                      Nama Lengkap
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={`w-full px-4 py-3 rounded-xl border bg-white outline-none transition-all text-sm ${
                        focused === "name"
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-dark mb-2"
                    >
                      Alamat Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={`w-full px-4 py-3 rounded-xl border bg-white outline-none transition-all text-sm ${
                        focused === "email"
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      placeholder="john@perusahaan.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-dark mb-2"
                    >
                      Perusahaan{" "}
                      <span className="text-gray font-normal">(opsional)</span>
                    </label>
                    <input
                      id="company"
                      type="text"
                      value={formData.company}
                      onFocus={() => setFocused("company")}
                      onBlur={() => setFocused(null)}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className={`w-full px-4 py-3 rounded-xl border bg-white outline-none transition-all text-sm ${
                        focused === "company"
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      placeholder="Acme Inc."
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-dark mb-2"
                    >
                      Detail Proyek
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className={`w-full px-4 py-3 rounded-xl border bg-white outline-none transition-all text-sm resize-none ${
                        focused === "message"
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      placeholder="Ceritakan tentang proyek Anda..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-all shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {submitting ? "Mengirim..." : "Kirim Pesan"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

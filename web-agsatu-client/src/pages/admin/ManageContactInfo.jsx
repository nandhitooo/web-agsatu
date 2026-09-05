import { useEffect, useState } from "react";
import api from "../../services/api";

const emptyForm = {
  email: "",
  phone: "",
  office_address: "",
  whatsapp_url: "",
  instagram_url: "",
  linkedin_url: "",
};

export default function ManageContactInfo() {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    api
      .get("/admin/contact-info")
      .then((res) => {
        const data = res.data.data;
        setForm({
          email: data.email || "",
          phone: data.phone || "",
          office_address: data.office_address || "",
          whatsapp_url: data.whatsapp_url || "",
          instagram_url: data.instagram_url || "",
          linkedin_url: data.linkedin_url || "",
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      await api.put("/admin/contact-info", form);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      if (err.response?.status === 422) {
        const firstError = Object.values(err.response.data.errors || {})[0];
        setError(firstError?.[0] || "Data tidak valid.");
      } else {
        setError("Gagal menyimpan data.");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-gray text-sm">Memuat...</p>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-dark mb-1">
          Kelola Info Kontak
        </h1>
        <p className="text-gray">
          Informasi yang ditampilkan di bagian "Kontak" landing page.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
        {error && (
          <div className="px-4 py-2.5 rounded-xl bg-red-50 text-red-600 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-600 text-sm">
            Perubahan berhasil disimpan.
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="font-bold text-dark">Kontak Utama</h2>
          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="hello@agsatu.id"
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">
              Telepon
            </label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+62 21 5555 0123"
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">
              Alamat Kantor
            </label>
            <input
              value={form.office_address}
              onChange={(e) =>
                setForm({ ...form, office_address: e.target.value })
              }
              placeholder="Kota Kediri, Indonesia"
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="font-bold text-dark">
            Media Sosial{" "}
            <span className="text-gray font-normal text-sm">(opsional)</span>
          </h2>
          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">
              WhatsApp
            </label>
            <input
              value={form.whatsapp_url}
              onChange={(e) =>
                setForm({ ...form, whatsapp_url: e.target.value })
              }
              placeholder="https://wa.me/6282112345678"
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">
              Instagram
            </label>
            <input
              value={form.instagram_url}
              onChange={(e) =>
                setForm({ ...form, instagram_url: e.target.value })
              }
              placeholder="https://instagram.com/agsatu"
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">
              LinkedIn
            </label>
            <input
              value={form.linkedin_url}
              onChange={(e) =>
                setForm({ ...form, linkedin_url: e.target.value })
              }
              placeholder="https://linkedin.com/company/agsatu"
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-60"
        >
          {saving ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </form>
    </div>
  );
}

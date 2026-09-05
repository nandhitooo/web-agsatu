import { useEffect, useState } from "react";
import api from "../../services/api";

const emptyForm = {
  headline: "",
  description_1: "",
  description_2: "",
  highlight_title: "",
  highlight_description: "",
  tech_badges: "",
  features: [{ title: "", description: "" }],
};

export default function ManageAbout() {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    api
      .get("/admin/about")
      .then((res) => {
        const data = res.data.data;
        setForm({
          headline: data.headline || "",
          description_1: data.description_1 || "",
          description_2: data.description_2 || "",
          highlight_title: data.highlight_title || "",
          highlight_description: data.highlight_description || "",
          tech_badges: (data.tech_badges || []).join(", "),
          features:
            data.features && data.features.length > 0
              ? data.features
              : [{ title: "", description: "" }],
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const updateFeature = (index, field, value) => {
    const updated = [...form.features];
    updated[index] = { ...updated[index], [field]: value };
    setForm({ ...form, features: updated });
  };

  const addFeature = () => {
    setForm({
      ...form,
      features: [...form.features, { title: "", description: "" }],
    });
  };

  const removeFeature = (index) => {
    setForm({
      ...form,
      features: form.features.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    const payload = {
      headline: form.headline,
      description_1: form.description_1,
      description_2: form.description_2,
      highlight_title: form.highlight_title,
      highlight_description: form.highlight_description,
      tech_badges: form.tech_badges
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      features: form.features.filter((f) => f.title.trim() !== ""),
    };

    try {
      await api.put("/admin/about", payload);
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
          Kelola Tentang Kami
        </h1>
        <p className="text-gray">
          Konten yang ditampilkan di bagian "Tentang Kami" landing page.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
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
          <h2 className="font-bold text-dark">Konten Utama</h2>
          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">
              Judul (Headline)
            </label>
            <input
              required
              value={form.headline}
              onChange={(e) => setForm({ ...form, headline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">
              Paragraf 1
            </label>
            <textarea
              rows={3}
              value={form.description_1}
              onChange={(e) =>
                setForm({ ...form, description_1: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">
              Paragraf 2
            </label>
            <textarea
              rows={3}
              value={form.description_2}
              onChange={(e) =>
                setForm({ ...form, description_2: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm resize-none"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="font-bold text-dark">
            Kotak Highlight{" "}
            <span className="text-gray font-normal text-sm">
              (kotak kartu di sisi kiri)
            </span>
          </h2>
          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">
              Judul Highlight
            </label>
            <input
              value={form.highlight_title}
              onChange={(e) =>
                setForm({ ...form, highlight_title: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">
              Deskripsi Highlight
            </label>
            <textarea
              rows={2}
              value={form.highlight_description}
              onChange={(e) =>
                setForm({ ...form, highlight_description: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">
              Tech Badges (pisahkan dengan koma)
            </label>
            <input
              value={form.tech_badges}
              onChange={(e) =>
                setForm({ ...form, tech_badges: e.target.value })
              }
              placeholder="Laravel, PHP, Flutter"
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-dark">Fitur / Keunggulan</h2>
            <button
              type="button"
              onClick={addFeature}
              className="text-primary text-sm font-medium hover:underline"
            >
              + Tambah Fitur
            </button>
          </div>

          {form.features.map((feature, index) => (
            <div
              key={index}
              className="flex gap-3 items-start p-3 rounded-lg border border-gray-100"
            >
              <div className="flex-1 space-y-2">
                <input
                  placeholder="Judul fitur"
                  value={feature.title}
                  onChange={(e) =>
                    updateFeature(index, "title", e.target.value)
                  }
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm"
                />
                <input
                  placeholder="Deskripsi singkat"
                  value={feature.description}
                  onChange={(e) =>
                    updateFeature(index, "description", e.target.value)
                  }
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm"
                />
              </div>
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="text-red-500 text-xs font-medium hover:underline mt-2"
              >
                Hapus
              </button>
            </div>
          ))}
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

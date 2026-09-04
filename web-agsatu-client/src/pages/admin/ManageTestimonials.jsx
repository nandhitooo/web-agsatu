import { useEffect, useState } from "react";
import api from "../../services/api";
import Modal from "../../components/admin/Modal";

const emptyForm = {
  id: null,
  client_name: "",
  company: "",
  message: "",
  rating: 5,
  is_published: true,
  photo: null,
};

export default function ManageTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const loadTestimonials = () => {
    setLoading(true);
    api
      .get("/admin/testimonials")
      .then((res) => setTestimonials(res.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const openCreate = () => {
    setForm(emptyForm);
    setError(null);
    setModalOpen(true);
  };

  const openEdit = (testimonial) => {
    setForm({
      id: testimonial.id,
      client_name: testimonial.client_name,
      company: testimonial.company || "",
      message: testimonial.message,
      rating: testimonial.rating,
      is_published: testimonial.is_published,
      photo: null,
    });
    setError(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const data = new FormData();
    data.append("client_name", form.client_name);
    data.append("company", form.company);
    data.append("message", form.message);
    data.append("rating", form.rating);
    data.append("is_published", form.is_published ? "1" : "0");
    if (form.photo) {
      data.append("photo", form.photo);
    }

    try {
      if (form.id) {
        data.append("_method", "PUT");
        await api.post(`/admin/testimonials/${form.id}`, data);
      } else {
        await api.post("/admin/testimonials", data);
      }
      setModalOpen(false);
      loadTestimonials();
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

  const handleDelete = async (testimonial) => {
    if (!confirm(`Hapus testimoni dari "${testimonial.client_name}"?`)) return;
    await api.delete(`/admin/testimonials/${testimonial.id}`);
    loadTestimonials();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-dark mb-1">
            Kelola Testimoni
          </h1>
          <p className="text-gray">Ulasan klien yang ditampilkan di landing page.</p>
        </div>
        <button
          onClick={openCreate}
          className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-colors"
        >
          + Tambah Testimoni
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {loading ? (
          <p className="p-6 text-gray text-sm">Memuat...</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray">
              <tr>
                <th className="px-6 py-3 font-medium">Klien</th>
                <th className="px-6 py-3 font-medium">Perusahaan</th>
                <th className="px-6 py-3 font-medium">Rating</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((testimonial) => (
                <tr key={testimonial.id} className="border-t border-gray-100">
                  <td className="px-6 py-4 font-medium text-dark">
                    {testimonial.client_name}
                  </td>
                  <td className="px-6 py-4 text-gray">
                    {testimonial.company}
                  </td>
                  <td className="px-6 py-4 text-gray">
                    {"★".repeat(testimonial.rating)}
                    {"☆".repeat(5 - testimonial.rating)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        testimonial.is_published
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-gray-100 text-gray"
                      }`}
                    >
                      {testimonial.is_published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button
                      onClick={() => openEdit(testimonial)}
                      className="text-primary font-medium hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial)}
                      className="text-red-500 font-medium hover:underline"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {testimonials.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray">
                    Belum ada data testimoni.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <Modal
        open={modalOpen}
        title={form.id ? "Edit Testimoni" : "Tambah Testimoni"}
        onClose={() => setModalOpen(false)}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="px-4 py-2.5 rounded-xl bg-red-50 text-red-600 text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">
              Nama Klien
            </label>
            <input
              required
              value={form.client_name}
              onChange={(e) =>
                setForm({ ...form, client_name: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">
              Perusahaan
            </label>
            <input
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">
              Pesan / Ulasan
            </label>
            <textarea
              required
              rows={3}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">
              Rating
            </label>
            <select
              value={form.rating}
              onChange={(e) =>
                setForm({ ...form, rating: Number(e.target.value) })
              }
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} bintang
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">
              Foto{" "}
              <span className="text-gray font-normal">
                (opsional, kosongkan kalau tidak diubah)
              </span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm({ ...form, photo: e.target.files[0] })
              }
              className="w-full text-sm"
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-dark">
            <input
              type="checkbox"
              checked={form.is_published}
              onChange={(e) =>
                setForm({ ...form, is_published: e.target.checked })
              }
              className="w-4 h-4"
            />
            Published (tampil di landing page)
          </label>
          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-60"
          >
            {saving ? "Menyimpan..." : "Simpan"}
          </button>
        </form>
      </Modal>
    </div>
  );
}

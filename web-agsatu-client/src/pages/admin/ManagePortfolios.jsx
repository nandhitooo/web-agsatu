import { useEffect, useState } from "react";
import api from "../../services/api";
import Modal from "../../components/admin/Modal";

const emptyForm = {
  id: null,
  title: "",
  slug: "",
  description: "",
  category: "",
  tech: "",
  client_name: "",
  is_published: true,
  thumbnail: null,
};

export default function ManagePortfolios() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const loadPortfolios = () => {
    setLoading(true);
    api
      .get("/admin/portfolios")
      .then((res) => setPortfolios(res.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadPortfolios();
  }, []);

  const openCreate = () => {
    setForm(emptyForm);
    setError(null);
    setModalOpen(true);
  };

  const openEdit = (portfolio) => {
    setForm({
      id: portfolio.id,
      title: portfolio.title,
      slug: portfolio.slug,
      description: portfolio.description || "",
      category: portfolio.category || "",
      tech: (portfolio.tech || []).join(", "),
      client_name: portfolio.client_name || "",
      is_published: portfolio.is_published,
      thumbnail: null,
    });
    setError(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const data = new FormData();
    data.append("title", form.title);
    data.append("slug", form.slug);
    data.append("description", form.description);
    data.append("category", form.category);
    data.append("client_name", form.client_name);
    data.append("is_published", form.is_published ? "1" : "0");
    form.tech
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .forEach((t) => data.append("tech[]", t));
    if (form.thumbnail) {
      data.append("thumbnail", form.thumbnail);
    }

    try {
      if (form.id) {
        data.append("_method", "PUT");
        await api.post(`/admin/portfolios/${form.id}`, data);
      } else {
        await api.post("/admin/portfolios", data);
      }
      setModalOpen(false);
      loadPortfolios();
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

  const handleDelete = async (portfolio) => {
    if (!confirm(`Hapus portofolio "${portfolio.title}"?`)) return;
    await api.delete(`/admin/portfolios/${portfolio.id}`);
    loadPortfolios();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-dark mb-1">
            Kelola Portofolio
          </h1>
          <p className="text-gray">Proyek yang ditampilkan di landing page.</p>
        </div>
        <button
          onClick={openCreate}
          className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-colors"
        >
          + Tambah Portofolio
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {loading ? (
          <p className="p-6 text-gray text-sm">Memuat...</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray">
              <tr>
                <th className="px-6 py-3 font-medium">Judul</th>
                <th className="px-6 py-3 font-medium">Kategori</th>
                <th className="px-6 py-3 font-medium">Klien</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {portfolios.map((portfolio) => (
                <tr key={portfolio.id} className="border-t border-gray-100">
                  <td className="px-6 py-4 font-medium text-dark">
                    {portfolio.title}
                  </td>
                  <td className="px-6 py-4 text-gray">
                    {portfolio.category}
                  </td>
                  <td className="px-6 py-4 text-gray">
                    {portfolio.client_name}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        portfolio.is_published
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-gray-100 text-gray"
                      }`}
                    >
                      {portfolio.is_published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button
                      onClick={() => openEdit(portfolio)}
                      className="text-primary font-medium hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(portfolio)}
                      className="text-red-500 font-medium hover:underline"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {portfolios.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray">
                    Belum ada data portofolio.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <Modal
        open={modalOpen}
        title={form.id ? "Edit Portofolio" : "Tambah Portofolio"}
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
              Judul
            </label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">
              Slug
            </label>
            <input
              required
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">
              Deskripsi
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">
                Kategori
              </label>
              <input
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
                placeholder="E-Commerce"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">
                Nama Klien
              </label>
              <input
                value={form.client_name}
                onChange={(e) =>
                  setForm({ ...form, client_name: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">
              Tech Stack (pisahkan dengan koma)
            </label>
            <input
              value={form.tech}
              onChange={(e) => setForm({ ...form, tech: e.target.value })}
              placeholder="React, Laravel, MySQL"
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">
              Thumbnail{" "}
              <span className="text-gray font-normal">
                (kosongkan kalau tidak diubah)
              </span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm({ ...form, thumbnail: e.target.files[0] })
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

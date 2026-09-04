import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import Modal from "../../components/admin/Modal";

const emptyForm = {
  id: null,
  client_id: "",
  name: "",
  description: "",
  status: "planning",
  start_date: "",
  deadline: "",
};

const statusLabel = {
  planning: "Perencanaan",
  development: "Pengembangan",
  testing: "Pengujian",
  delivered: "Selesai",
};

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const loadData = () => {
    setLoading(true);
    Promise.all([api.get("/admin/projects"), api.get("/admin/clients")])
      .then(([projectsRes, clientsRes]) => {
        setProjects(projectsRes.data.data);
        setClients(clientsRes.data.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreate = () => {
    setForm(emptyForm);
    setError(null);
    setModalOpen(true);
  };

  const openEdit = (project) => {
    setForm({
      id: project.id,
      client_id: project.client?.id || "",
      name: project.name,
      description: project.description || "",
      status: project.status,
      start_date: project.start_date || "",
      deadline: project.deadline || "",
    });
    setError(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      if (form.id) {
        await api.put(`/admin/projects/${form.id}`, form);
      } else {
        await api.post("/admin/projects", form);
      }
      setModalOpen(false);
      loadData();
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

  const handleDelete = async (project) => {
    if (!confirm(`Hapus proyek "${project.name}"?`)) return;
    await api.delete(`/admin/projects/${project.id}`);
    loadData();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-dark mb-1">Kelola Proyek</h1>
          <p className="text-gray">
            Proyek yang bisa dipantau progressnya oleh klien.
          </p>
        </div>
        <button
          onClick={openCreate}
          disabled={clients.length === 0}
          className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50"
        >
          + Tambah Proyek
        </button>
      </div>

      {clients.length === 0 && !loading && (
        <div className="mb-6 px-4 py-3 rounded-xl bg-amber-50 text-amber-700 text-sm">
          Belum ada data klien. Tambahkan klien dulu di menu{" "}
          <strong>Klien</strong> sebelum membuat proyek.
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {loading ? (
          <p className="p-6 text-gray text-sm">Memuat...</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray">
              <tr>
                <th className="px-6 py-3 font-medium">Nama Proyek</th>
                <th className="px-6 py-3 font-medium">Klien</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-t border-gray-100">
                  <td className="px-6 py-4 font-medium text-dark">
                    {project.name}
                  </td>
                  <td className="px-6 py-4 text-gray">
                    {project.client?.name}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {statusLabel[project.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <Link
                      to={`/admin/projects/${project.id}`}
                      className="text-primary font-medium hover:underline"
                    >
                      Kelola
                    </Link>
                    <button
                      onClick={() => openEdit(project)}
                      className="text-gray font-medium hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project)}
                      className="text-red-500 font-medium hover:underline"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray">
                    Belum ada data proyek.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <Modal
        open={modalOpen}
        title={form.id ? "Edit Proyek" : "Tambah Proyek"}
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
              Klien
            </label>
            <select
              required
              value={form.client_id}
              onChange={(e) =>
                setForm({ ...form, client_id: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm"
            >
              <option value="">Pilih klien...</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                  {client.company_name ? ` — ${client.company_name}` : ""}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">
              Nama Proyek
            </label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
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
          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm"
            >
              <option value="planning">Perencanaan</option>
              <option value="development">Pengembangan</option>
              <option value="testing">Pengujian</option>
              <option value="delivered">Selesai</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">
                Tanggal Mulai
              </label>
              <input
                type="date"
                value={form.start_date}
                onChange={(e) =>
                  setForm({ ...form, start_date: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">
                Deadline
              </label>
              <input
                type="date"
                value={form.deadline}
                onChange={(e) =>
                  setForm({ ...form, deadline: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm"
              />
            </div>
          </div>
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

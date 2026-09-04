import { useEffect, useState } from "react";
import api from "../../services/api";
import Modal from "../../components/admin/Modal";

const emptyForm = {
  id: null,
  name: "",
  email: "",
  password: "",
  company_name: "",
  phone: "",
  address: "",
};

export default function ManageClients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const loadClients = () => {
    setLoading(true);
    api
      .get("/admin/clients")
      .then((res) => setClients(res.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadClients();
  }, []);

  const openCreate = () => {
    setForm(emptyForm);
    setError(null);
    setModalOpen(true);
  };

  const openEdit = (client) => {
    setForm({
      id: client.id,
      name: client.name,
      email: client.email,
      password: "",
      company_name: client.company_name || "",
      phone: client.phone || "",
      address: client.address || "",
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
        await api.put(`/admin/clients/${form.id}`, form);
      } else {
        await api.post("/admin/clients", form);
      }
      setModalOpen(false);
      loadClients();
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

  const handleDelete = async (client) => {
    if (!confirm(`Hapus klien "${client.name}"? Akun login klien ini juga akan terhapus.`))
      return;
    await api.delete(`/admin/clients/${client.id}`);
    loadClients();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-dark mb-1">Kelola Klien</h1>
          <p className="text-gray">
            Akun klien yang bisa login ke Portal Klien.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-colors"
        >
          + Tambah Klien
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {loading ? (
          <p className="p-6 text-gray text-sm">Memuat...</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray">
              <tr>
                <th className="px-6 py-3 font-medium">Nama</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Perusahaan</th>
                <th className="px-6 py-3 font-medium">Proyek</th>
                <th className="px-6 py-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="border-t border-gray-100">
                  <td className="px-6 py-4 font-medium text-dark">
                    {client.name}
                  </td>
                  <td className="px-6 py-4 text-gray">{client.email}</td>
                  <td className="px-6 py-4 text-gray">
                    {client.company_name}
                  </td>
                  <td className="px-6 py-4 text-gray">
                    {client.projects_count}
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button
                      onClick={() => openEdit(client)}
                      className="text-primary font-medium hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(client)}
                      className="text-red-500 font-medium hover:underline"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {clients.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray">
                    Belum ada data klien.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <Modal
        open={modalOpen}
        title={form.id ? "Edit Klien" : "Tambah Klien"}
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
              Nama
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
              Email
            </label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">
              Password{" "}
              <span className="text-gray font-normal">
                {form.id ? "(kosongkan kalau tidak diubah)" : ""}
              </span>
            </label>
            <input
              type="password"
              required={!form.id}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">
              Nama Perusahaan
            </label>
            <input
              value={form.company_name}
              onChange={(e) =>
                setForm({ ...form, company_name: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">
              No. Telepon
            </label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">
              Alamat
            </label>
            <textarea
              rows={2}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm resize-none"
            />
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

import { useEffect, useState } from "react";
import api from "../../services/api";
import Modal from "../../components/admin/Modal";

const emptyForm = {
  id: null,
  name: "",
  role: "",
  bio: "",
  github_url: "",
  linkedin_url: "",
  twitter_url: "",
  order: 0,
  is_active: true,
  photo: null,
};

export default function ManageTeam() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const loadMembers = () => {
    setLoading(true);
    api
      .get("/admin/team")
      .then((res) => setMembers(res.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const openCreate = () => {
    setForm(emptyForm);
    setError(null);
    setModalOpen(true);
  };

  const openEdit = (member) => {
    setForm({
      id: member.id,
      name: member.name,
      role: member.role,
      bio: member.bio || "",
      github_url: member.github_url || "",
      linkedin_url: member.linkedin_url || "",
      twitter_url: member.twitter_url || "",
      order: member.order || 0,
      is_active: member.is_active,
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
    data.append("name", form.name);
    data.append("role", form.role);
    data.append("bio", form.bio);
    data.append("github_url", form.github_url);
    data.append("linkedin_url", form.linkedin_url);
    data.append("twitter_url", form.twitter_url);
    data.append("order", form.order);
    data.append("is_active", form.is_active ? "1" : "0");
    if (form.photo) {
      data.append("photo", form.photo);
    }

    try {
      if (form.id) {
        data.append("_method", "PUT");
        await api.post(`/admin/team/${form.id}`, data);
      } else {
        await api.post("/admin/team", data);
      }
      setModalOpen(false);
      loadMembers();
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

  const handleDelete = async (member) => {
    if (!confirm(`Hapus anggota tim "${member.name}"?`)) return;
    await api.delete(`/admin/team/${member.id}`);
    loadMembers();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-dark mb-1">Kelola Tim</h1>
          <p className="text-gray">
            Anggota tim yang ditampilkan di landing page.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-colors"
        >
          + Tambah Anggota
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
                <th className="px-6 py-3 font-medium">Jabatan</th>
                <th className="px-6 py-3 font-medium">Urutan</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id} className="border-t border-gray-100">
                  <td className="px-6 py-4 font-medium text-dark flex items-center gap-3">
                    {member.photo_url ? (
                      <img
                        src={member.photo_url}
                        alt={member.name}
                        className="w-8 h-8 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                        {member.name
                          .split(" ")
                          .map((w) => w[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                    )}
                    {member.name}
                  </td>
                  <td className="px-6 py-4 text-gray">{member.role}</td>
                  <td className="px-6 py-4 text-gray">{member.order}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        member.is_active
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-gray-100 text-gray"
                      }`}
                    >
                      {member.is_active ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button
                      onClick={() => openEdit(member)}
                      className="text-primary font-medium hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(member)}
                      className="text-red-500 font-medium hover:underline"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {members.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray">
                    Belum ada data anggota tim.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <Modal
        open={modalOpen}
        title={form.id ? "Edit Anggota Tim" : "Tambah Anggota Tim"}
        onClose={() => setModalOpen(false)}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="px-4 py-2.5 rounded-xl bg-red-50 text-red-600 text-sm">
              {error}
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
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
                Jabatan
              </label>
              <input
                required
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="Tech Lead"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">
              Bio Singkat
            </label>
            <textarea
              rows={3}
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">
              Foto{" "}
              <span className="text-gray font-normal">
                (opsional — kalau kosong, tampil avatar inisial otomatis)
              </span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setForm({ ...form, photo: e.target.files[0] })}
              className="w-full text-sm"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">
                GitHub
              </label>
              <input
                value={form.github_url}
                onChange={(e) =>
                  setForm({ ...form, github_url: e.target.value })
                }
                placeholder="https://github.com/..."
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
                placeholder="https://linkedin.com/in/..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">
                Twitter
              </label>
              <input
                value={form.twitter_url}
                onChange={(e) =>
                  setForm({ ...form, twitter_url: e.target.value })
                }
                placeholder="https://twitter.com/..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">
                Urutan
              </label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm"
              />
            </div>
            <div className="flex items-end pb-2.5">
              <label className="flex items-center gap-2 text-sm text-dark">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) =>
                    setForm({ ...form, is_active: e.target.checked })
                  }
                  className="w-4 h-4"
                />
                Aktif
              </label>
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

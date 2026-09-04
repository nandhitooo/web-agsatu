import { useEffect, useState } from "react";
import api from "../../services/api";

const statusLabel = {
  new: "Baru",
  in_progress: "Diproses",
  done: "Selesai",
};

const statusColor = {
  new: "bg-blue-50 text-blue-600",
  in_progress: "bg-amber-50 text-amber-600",
  done: "bg-emerald-50 text-emerald-600",
};

export default function ManageInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const loadInquiries = (status) => {
    setLoading(true);
    api
      .get("/admin/inquiries", { params: status ? { status } : {} })
      .then((res) => setInquiries(res.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadInquiries(filter);
  }, [filter]);

  const handleStatusChange = async (inquiry, status) => {
    await api.put(`/admin/inquiries/${inquiry.id}`, { status });
    loadInquiries(filter);
  };

  const handleDelete = async (inquiry) => {
    if (!confirm(`Hapus pesan dari "${inquiry.name}"?`)) return;
    await api.delete(`/admin/inquiries/${inquiry.id}`);
    loadInquiries(filter);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-dark mb-1">Pesan Masuk</h1>
          <p className="text-gray">
            Pesan dari form kontak di landing page.
          </p>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary"
        >
          <option value="">Semua Status</option>
          <option value="new">Baru</option>
          <option value="in_progress">Diproses</option>
          <option value="done">Selesai</option>
        </select>
      </div>

      <div className="space-y-4">
        {loading && <p className="text-gray text-sm">Memuat...</p>}

        {!loading && inquiries.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-gray text-sm">
            Belum ada pesan masuk.
          </div>
        )}

        {!loading &&
          inquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              className="bg-white rounded-2xl border border-gray-100 p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-dark">{inquiry.name}</h3>
                  <p className="text-sm text-gray">
                    {inquiry.email}
                    {inquiry.phone && ` · ${inquiry.phone}`}
                    {inquiry.company && ` · ${inquiry.company}`}
                  </p>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                    statusColor[inquiry.status]
                  }`}
                >
                  {statusLabel[inquiry.status]}
                </span>
              </div>
              <p className="text-dark text-sm mb-4 leading-relaxed">
                {inquiry.message}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray">
                  {inquiry.created_at}
                </span>
                <div className="flex items-center gap-3">
                  <select
                    value={inquiry.status}
                    onChange={(e) =>
                      handleStatusChange(inquiry, e.target.value)
                    }
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs outline-none focus:border-primary"
                  >
                    <option value="new">Baru</option>
                    <option value="in_progress">Diproses</option>
                    <option value="done">Selesai</option>
                  </select>
                  <button
                    onClick={() => handleDelete(inquiry)}
                    className="text-red-500 text-xs font-medium hover:underline"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

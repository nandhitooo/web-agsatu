import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";

const milestoneStatusLabel = {
  pending: "Belum Mulai",
  in_progress: "Sedang Berjalan",
  done: "Selesai",
};

const documentTypeLabel = {
  proposal: "Proposal",
  bast: "BAST",
  deliverable: "Deliverable",
  lainnya: "Lainnya",
};

const emptyMilestoneForm = {
  id: null,
  title: "",
  description: "",
  status: "pending",
  due_date: "",
  order: 0,
};

export default function ProjectDetailAdmin() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const [milestoneForm, setMilestoneForm] = useState(emptyMilestoneForm);
  const [savingMilestone, setSavingMilestone] = useState(false);

  const [docFile, setDocFile] = useState(null);
  const [docType, setDocType] = useState("lainnya");
  const [uploadingDoc, setUploadingDoc] = useState(false);

  const loadProject = () => {
    setLoading(true);
    api
      .get(`/admin/projects/${id}`)
      .then((res) => setProject(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProject();
  }, [id]);

  const handleMilestoneSubmit = async (e) => {
    e.preventDefault();
    setSavingMilestone(true);

    try {
      if (milestoneForm.id) {
        await api.put(`/admin/milestones/${milestoneForm.id}`, milestoneForm);
      } else {
        await api.post(`/admin/projects/${id}/milestones`, milestoneForm);
      }
      setMilestoneForm(emptyMilestoneForm);
      loadProject();
    } finally {
      setSavingMilestone(false);
    }
  };

  const editMilestone = (milestone) => {
    setMilestoneForm({
      id: milestone.id,
      title: milestone.title,
      description: milestone.description || "",
      status: milestone.status,
      due_date: milestone.due_date || "",
      order: milestone.order,
    });
  };

  const deleteMilestone = async (milestone) => {
    if (!confirm(`Hapus milestone "${milestone.title}"?`)) return;
    await api.delete(`/admin/milestones/${milestone.id}`);
    loadProject();
  };

  const handleUploadDocument = async (e) => {
    e.preventDefault();
    if (!docFile) return;

    setUploadingDoc(true);
    const data = new FormData();
    data.append("file", docFile);
    data.append("type", docType);

    try {
      await api.post(`/admin/projects/${id}/documents`, data);
      setDocFile(null);
      setDocType("lainnya");
      document.getElementById("doc-file-input").value = "";
      loadProject();
    } finally {
      setUploadingDoc(false);
    }
  };

  const deleteDocument = async (doc) => {
    if (!confirm(`Hapus dokumen "${doc.file_name}"?`)) return;
    await api.delete(`/admin/documents/${doc.id}`);
    loadProject();
  };

  if (loading) return <p className="text-gray text-sm">Memuat...</p>;
  if (!project) return <p className="text-gray text-sm">Proyek tidak ditemukan.</p>;

  return (
    <div>
      <Link
        to="/admin/projects"
        className="text-sm text-gray hover:text-primary mb-4 inline-block"
      >
        &larr; Kembali ke daftar proyek
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-dark mb-1">{project.name}</h1>
        <p className="text-gray">
          Klien: {project.client?.name}
          {project.client?.company_name ? ` — ${project.client.company_name}` : ""}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Milestones */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-dark mb-4">Kelola Milestone</h2>

          <form onSubmit={handleMilestoneSubmit} className="space-y-3 mb-6">
            <input
              required
              placeholder="Judul milestone"
              value={milestoneForm.title}
              onChange={(e) =>
                setMilestoneForm({ ...milestoneForm, title: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm"
            />
            <textarea
              rows={2}
              placeholder="Deskripsi (opsional)"
              value={milestoneForm.description}
              onChange={(e) =>
                setMilestoneForm({
                  ...milestoneForm,
                  description: e.target.value,
                })
              }
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm resize-none"
            />
            <div className="grid grid-cols-2 gap-3">
              <select
                value={milestoneForm.status}
                onChange={(e) =>
                  setMilestoneForm({
                    ...milestoneForm,
                    status: e.target.value,
                  })
                }
                className="px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm"
              >
                <option value="pending">Belum Mulai</option>
                <option value="in_progress">Sedang Berjalan</option>
                <option value="done">Selesai</option>
              </select>
              <input
                type="date"
                value={milestoneForm.due_date}
                onChange={(e) =>
                  setMilestoneForm({
                    ...milestoneForm,
                    due_date: e.target.value,
                  })
                }
                className="px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={savingMilestone}
                className="flex-1 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-60"
              >
                {milestoneForm.id ? "Update Milestone" : "Tambah Milestone"}
              </button>
              {milestoneForm.id && (
                <button
                  type="button"
                  onClick={() => setMilestoneForm(emptyMilestoneForm)}
                  className="px-4 py-2.5 border border-gray-200 text-gray text-sm font-medium rounded-lg hover:bg-gray-50"
                >
                  Batal
                </button>
              )}
            </div>
          </form>

          <div className="space-y-2">
            {project.milestones.map((milestone) => (
              <div
                key={milestone.id}
                className="flex items-center justify-between p-3 rounded-lg border border-gray-100"
              >
                <div className="min-w-0">
                  <p className="font-medium text-dark text-sm truncate">
                    {milestone.title}
                  </p>
                  <p className="text-gray text-xs">
                    {milestoneStatusLabel[milestone.status]}
                    {milestone.due_date && ` · Target: ${milestone.due_date}`}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  <button
                    onClick={() => editMilestone(milestone)}
                    className="text-primary text-xs font-medium hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteMilestone(milestone)}
                    className="text-red-500 text-xs font-medium hover:underline"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
            {project.milestones.length === 0 && (
              <p className="text-gray text-sm">Belum ada milestone.</p>
            )}
          </div>
        </div>

        {/* Documents */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-dark mb-4">Kelola Dokumen</h2>

          <form onSubmit={handleUploadDocument} className="space-y-3 mb-6">
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm"
            >
              <option value="proposal">Proposal</option>
              <option value="bast">BAST</option>
              <option value="deliverable">Deliverable</option>
              <option value="lainnya">Lainnya</option>
            </select>
            <input
              id="doc-file-input"
              type="file"
              required
              onChange={(e) => setDocFile(e.target.files[0])}
              className="w-full text-sm"
            />
            <button
              type="submit"
              disabled={uploadingDoc}
              className="w-full py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-60"
            >
              {uploadingDoc ? "Mengunggah..." : "Unggah Dokumen"}
            </button>
          </form>

          <div className="space-y-2">
            {project.documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3 rounded-lg border border-gray-100"
              >
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-0 hover:text-primary"
                >
                  <p className="font-medium text-dark text-sm truncate">
                    {doc.file_name}
                  </p>
                  <p className="text-gray text-xs">
                    {documentTypeLabel[doc.type]} &middot; {doc.created_at}
                  </p>
                </a>
                <button
                  onClick={() => deleteDocument(doc)}
                  className="text-red-500 text-xs font-medium hover:underline flex-shrink-0 ml-2"
                >
                  Hapus
                </button>
              </div>
            ))}
            {project.documents.length === 0 && (
              <p className="text-gray text-sm">Belum ada dokumen.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";

const statusLabel = {
  planning: "Perencanaan",
  development: "Pengembangan",
  testing: "Pengujian",
  delivered: "Selesai",
};

const milestoneStatusColor = {
  pending: "bg-gray-100 text-gray",
  in_progress: "bg-amber-50 text-amber-600",
  done: "bg-emerald-50 text-emerald-600",
};

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

export default function ClientProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    api
      .get(`/client/projects/${id}`)
      .then((res) => setProject(res.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="text-gray text-sm">Memuat...</p>;
  }

  if (notFound || !project) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
        <p className="text-gray mb-4">Proyek tidak ditemukan.</p>
        <Link to="/client" className="text-primary font-medium hover:underline">
          Kembali ke daftar proyek
        </Link>
      </div>
    );
  }

  const doneCount = project.milestones.filter((m) => m.status === "done").length;
  const progress = project.milestones.length
    ? Math.round((doneCount / project.milestones.length) * 100)
    : 0;

  return (
    <div>
      <Link
        to="/client"
        className="text-sm text-gray hover:text-primary mb-4 inline-block"
      >
        &larr; Kembali ke daftar proyek
      </Link>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 mb-6">
        <div className="flex items-start justify-between mb-3">
          <h1 className="text-2xl font-bold text-dark">{project.name}</h1>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary whitespace-nowrap">
            {statusLabel[project.status]}
          </span>
        </div>
        <p className="text-gray mb-6">{project.description}</p>

        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-dark font-medium">Progress Keseluruhan</span>
          <span className="text-gray">{progress}%</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center gap-6 mt-6 text-sm text-gray">
          {project.start_date && <span>Mulai: {project.start_date}</span>}
          {project.deadline && <span>Deadline: {project.deadline}</span>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Milestones */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-dark mb-4">Tahapan Proyek</h2>
          <div className="space-y-3">
            {project.milestones.map((milestone) => (
              <div
                key={milestone.id}
                className="flex items-start gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0"
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${
                    milestone.status === "done"
                      ? "bg-emerald-500"
                      : milestone.status === "in_progress"
                        ? "bg-amber-500"
                        : "bg-gray-300"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium text-dark text-sm">
                      {milestone.title}
                    </p>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
                        milestoneStatusColor[milestone.status]
                      }`}
                    >
                      {milestoneStatusLabel[milestone.status]}
                    </span>
                  </div>
                  {milestone.description && (
                    <p className="text-gray text-xs mt-1">
                      {milestone.description}
                    </p>
                  )}
                  {milestone.due_date && (
                    <p className="text-gray text-xs mt-1">
                      Target: {milestone.due_date}
                    </p>
                  )}
                </div>
              </div>
            ))}
            {project.milestones.length === 0 && (
              <p className="text-gray text-sm">Belum ada tahapan tercatat.</p>
            )}
          </div>
        </div>

        {/* Documents */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-dark mb-4">Dokumen</h2>
          <div className="space-y-3">
            {project.documents.map((doc) => (
              <a
                key={doc.id}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-primary/30 hover:bg-gray-50 transition-all"
              >
                <div className="min-w-0">
                  <p className="font-medium text-dark text-sm truncate">
                    {doc.file_name}
                  </p>
                  <p className="text-gray text-xs">
                    {documentTypeLabel[doc.type]} &middot; {doc.created_at}
                  </p>
                </div>
                <span className="text-primary text-xs font-medium whitespace-nowrap ml-3">
                  Unduh
                </span>
              </a>
            ))}
            {project.documents.length === 0 && (
              <p className="text-gray text-sm">Belum ada dokumen dibagikan.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const statusLabel = {
  planning: "Perencanaan",
  development: "Pengembangan",
  testing: "Pengujian",
  delivered: "Selesai",
};

const statusColor = {
  planning: "bg-gray-100 text-gray",
  development: "bg-blue-50 text-blue-600",
  testing: "bg-amber-50 text-amber-600",
  delivered: "bg-emerald-50 text-emerald-600",
};

export default function ClientProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/client/projects")
      .then((res) => setProjects(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-dark mb-1">Proyek Saya</h1>
      <p className="text-gray mb-8">
        Daftar proyek yang sedang atau telah dikerjakan untuk Anda.
      </p>

      {loading && <p className="text-gray text-sm">Memuat...</p>}

      {!loading && projects.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
          <p className="text-gray">Belum ada proyek yang terdaftar.</p>
        </div>
      )}

      <div className="space-y-4">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/client/projects/${project.id}`}
            className="block bg-white rounded-2xl border border-gray-100 p-6 hover:border-primary/30 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-dark text-lg">{project.name}</h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                  statusColor[project.status]
                }`}
              >
                {statusLabel[project.status]}
              </span>
            </div>
            <p className="text-gray text-sm mb-4">{project.description}</p>
            <div className="flex items-center gap-4 text-xs text-gray">
              {project.start_date && <span>Mulai: {project.start_date}</span>}
              {project.deadline && <span>Deadline: {project.deadline}</span>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

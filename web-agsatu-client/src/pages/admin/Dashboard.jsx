import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Dashboard() {
  const [counts, setCounts] = useState({
    services: null,
    portfolios: null,
    team: null,
    testimonials: null,
    inquiries: null,
  });

  useEffect(() => {
    Promise.all([
      api.get("/admin/services"),
      api.get("/admin/portfolios"),
      api.get("/admin/team"),
      api.get("/admin/testimonials"),
      api.get("/admin/inquiries"),
    ])
      .then(([services, portfolios, team, testimonials, inquiries]) => {
        setCounts({
          services: services.data.data.length,
          portfolios: portfolios.data.data.length,
          team: team.data.data.length,
          testimonials: testimonials.data.data.length,
          inquiries: inquiries.data.data.length,
        });
      })
      .catch(() => {
        // biarkan tetap null kalau gagal, kartu akan menampilkan "-"
      });
  }, []);

  const cards = [
    { label: "Layanan Aktif", value: counts.services },
    { label: "Portofolio", value: counts.portfolios },
    { label: "Anggota Tim", value: counts.team },
    { label: "Testimoni", value: counts.testimonials },
    { label: "Pesan Masuk", value: counts.inquiries },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-dark mb-1">Dashboard</h1>
      <p className="text-gray mb-8">Ringkasan data company profile AGSatu.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-2xl p-6 border border-gray-100"
          >
            <p className="text-gray text-sm mb-2">{card.label}</p>
            <p className="text-3xl font-bold text-dark">
              {card.value === null ? "-" : card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

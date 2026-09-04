import { useEffect, useState } from "react";
import api from "../services/api";

// Preset warna gradient di-cycle berdasarkan index, dipakai untuk avatar
// inisial kalau anggota tim belum upload foto.
const colorPresets = [
  "from-primary to-indigo-400",
  "from-pink-500 to-rose-400",
  "from-secondary to-cyan-400",
  "from-accent to-amber-400",
  "from-emerald-500 to-green-400",
  "from-violet-500 to-purple-400",
];

function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Team() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/team")
      .then((res) => setTeam(res.data.data))
      .catch(() => setError("Gagal memuat data tim."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section
      id="tim"
      className="scroll-mt-20 lg:scroll-mt-24 py-24 sm:py-28 lg:py-36 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 lg:mb-24 reveal">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Tim Kami
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mt-3 mb-4">
            Kenali Orang-Orang di Balik AGSatu
          </h2>
          <p className="text-gray text-lg">
            Tim yang beragam dari individu-individu berbakat yang bersatu oleh
            semangat yang sama untuk membangun perangkat lunak hebat.
          </p>
        </div>

        {loading && <p className="text-center text-gray">Memuat tim...</p>}

        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            {team.map((member, index) => {
              const color = colorPresets[index % colorPresets.length];

              return (
                <div
                  key={member.id}
                  className="group text-center bg-white rounded-2xl p-8 sm:p-10 border border-gray-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 reveal"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-6">
                    {member.photo_url ? (
                      <img
                        src={member.photo_url}
                        alt={member.name}
                        className="w-full h-full rounded-2xl object-cover shadow-lg group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div
                        className={`w-full h-full rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300`}
                      >
                        <span className="text-white text-2xl font-bold">
                          {getInitials(member.name)}
                        </span>
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 border-2 border-white rounded-full" />
                  </div>
                  <h3 className="text-lg font-bold text-dark group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-primary text-sm font-medium mt-1.5">
                    {member.role}
                  </p>
                  <p className="text-gray text-sm mt-3 max-w-xs mx-auto leading-relaxed">
                    {member.bio}
                  </p>

                  <div className="flex items-center justify-center gap-2.5 mt-5">
                    {member.github_url && (
                      <a
                        href={member.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-primary/10 flex items-center justify-center text-gray hover:text-primary transition-colors"
                        aria-label={`${member.name}'s GitHub`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                    )}
                    {member.linkedin_url && (
                      <a
                        href={member.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-primary/10 flex items-center justify-center text-gray hover:text-primary transition-colors"
                        aria-label={`${member.name}'s LinkedIn`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    )}
                    {member.twitter_url && (
                      <a
                        href={member.twitter_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-primary/10 flex items-center justify-center text-gray hover:text-primary transition-colors"
                        aria-label={`${member.name}'s Twitter`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

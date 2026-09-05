import { useEffect, useState } from "react";
import api from "../services/api";

const badgeColors = [
  "bg-primary/10 text-red-600",
  "bg-secondary/10 text-indigo-500",
  "bg-accent/10 text-amber-600",
];

export default function About() {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    api
      .get("/about")
      .then((res) => setAbout(res.data.data))
      .catch(() => setAbout(null));
  }, []);

  if (!about) return null;

  return (
    <section
      id="tentang"
      className="scroll-mt-20 lg:scroll-mt-24 py-24 sm:py-28 lg:py-36 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: visual */}
          <div className="relative reveal-left">
            <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 p-6 sm:p-8">
              <div className="rounded-xl bg-white shadow-xl border border-gray-100 p-8 sm:p-10 flex flex-col gap-8">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 shadow-lg shadow-primary/25">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-dark mb-3">
                    {about.highlight_title}
                  </h3>
                  <p className="text-gray leading-relaxed">
                    {about.highlight_description}
                  </p>
                </div>
                {about.tech_badges.length > 0 && (
                  <div className="flex flex-wrap gap-2.5 pt-6 border-t border-gray-100">
                    {about.tech_badges.map((badge, index) => (
                      <div
                        key={badge}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-full ${
                          badgeColors[index % badgeColors.length]
                        }`}
                      >
                        {badge}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary to-secondary rounded-2xl -z-10 shadow-lg shadow-primary/20" />
            <div className="absolute -top-4 -left-4 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-accent to-amber-400 rounded-xl -z-10 opacity-60" />
          </div>

          {/* Right: content */}
          <div className="reveal-right">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Tentang Kami
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark mt-3 mb-6 leading-tight">
              {about.headline}
            </h2>
            {about.description_1 && (
              <p className="text-gray text-lg leading-relaxed mb-6">
                {about.description_1}
              </p>
            )}
            {about.description_2 && (
              <p className="text-gray leading-relaxed mb-10">
                {about.description_2}
              </p>
            )}

            {about.features.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
                {about.features.map((item) => (
                  <div key={item.title} className="flex gap-3.5 group">
                    <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <svg
                        className="w-3 h-3 text-primary"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-dark text-sm">
                        {item.title}
                      </h4>
                      <p className="text-gray text-sm mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

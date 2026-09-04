import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const menuItems = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/services", label: "Layanan" },
  { to: "/admin/portfolios", label: "Portofolio" },
  { to: "/admin/team", label: "Tim" },
  { to: "/admin/testimonials", label: "Testimoni" },
  { to: "/admin/inquiries", label: "Pesan Masuk" },
  { to: "/admin/clients", label: "Klien" },
  { to: "/admin/projects", label: "Proyek" },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center font-bold">
              A
            </div>
            <span className="font-bold text-dark">AGSatu Admin</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray hover:bg-gray-50 hover:text-dark"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="px-4 py-2 mb-2">
            <p className="text-sm font-medium text-dark truncate">
              {user?.name}
            </p>
            <p className="text-xs text-gray truncate">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors text-left"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Konten */}
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

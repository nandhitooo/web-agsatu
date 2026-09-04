import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Kalau sudah login, jangan tampilkan halaman login lagi —
  // arahkan sesuai role, bukan selalu ke /admin.
  if (user) {
    return <Navigate to={user.role === "admin" ? "/admin" : "/client"} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const loggedInUser = await login(email, password);
      if (loggedInUser.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/client");
      }
    } catch (err) {
      if (err.response?.status === 422 || err.response?.status === 401) {
        setError("Email atau password salah.");
      } else {
        setError("Terjadi kesalahan. Silakan coba lagi.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sm:p-10">
        <div className="text-center mb-8">
          <Link
            to="/"
            className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-xl mx-auto mb-4 hover:opacity-90 transition-opacity"
          >
            A
          </Link>
          <h1 className="text-2xl font-bold text-dark">Masuk ke AGSatu</h1>
          <p className="text-gray text-sm mt-1">
            Khusus admin dan klien terdaftar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-50 text-red-600 text-sm">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-dark mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
              placeholder="admin@agsatu.test"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-dark mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-all shadow-md shadow-primary/25 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <p className="text-center text-sm text-gray mt-6">
          <Link to="/" className="text-primary font-medium hover:underline">
            &larr; Kembali ke Beranda
          </Link>
        </p>
      </div>
    </div>
  );
}

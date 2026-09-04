import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/public/LandingPage";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ManageServices from "./pages/admin/ManageServices";
import ManagePortfolios from "./pages/admin/ManagePortfolios";
import ManageTeam from "./pages/admin/ManageTeam";
import ManageTestimonials from "./pages/admin/ManageTestimonials";
import ManageInquiries from "./pages/admin/ManageInquiries";
import ManageClients from "./pages/admin/ManageClients";
import ManageProjects from "./pages/admin/ManageProjects";
import ProjectDetailAdmin from "./pages/admin/ProjectDetailAdmin";
import ClientLayout from "./layouts/ClientLayout";
import ClientProjects from "./pages/client/ClientProjects";
import ClientProjectDetail from "./pages/client/ClientProjectDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="services" element={<ManageServices />} />
        <Route path="portfolios" element={<ManagePortfolios />} />
        <Route path="team" element={<ManageTeam />} />
        <Route path="testimonials" element={<ManageTestimonials />} />
        <Route path="inquiries" element={<ManageInquiries />} />
        <Route path="clients" element={<ManageClients />} />
        <Route path="projects" element={<ManageProjects />} />
        <Route path="projects/:id" element={<ProjectDetailAdmin />} />
      </Route>

      <Route
        path="/client"
        element={
          <ProtectedRoute allowedRoles={["client"]}>
            <ClientLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ClientProjects />} />
        <Route path="projects/:id" element={<ClientProjectDetail />} />
      </Route>
    </Routes>
  );
}

export default App;

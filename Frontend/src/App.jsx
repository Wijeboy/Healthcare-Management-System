import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AdminDashboard from "./pages/AdminDashboard";
import DashboardLayout from "./components/layout/DashboardLayout";
import StaffManagement from "./pages/StaffManagement";
import PatientManagement from "./pages/PatientManagement";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Protected Routes (wrapped in DashboardLayout) */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="staff-management" element={<StaffManagement />} />
        <Route path="patient-management" element={<PatientManagement />} />
      </Route>

      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;

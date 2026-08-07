import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AdminDashboard from "./pages/AdminDashboard";
import DashboardLayout from "./components/layout/DashboardLayout";

import PatientManagement from "./pages/patients/PatientManagement";
import DoctorsManagement from "./pages/doctors/DoctorsManagement";
import AddDoctorPage from "./pages/doctors/AddDoctorPage";
import EditDoctorPage from "./pages/doctors/EditDoctorPage";


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
        <Route path="doctors-management" element={<DoctorsManagement />} />
        <Route path="doctors-management/add-doctor" element={<AddDoctorPage />} />
        <Route path="doctors-management/edit-doctor" element={<EditDoctorPage />} />
        <Route path="patients-management" element={<PatientManagement />} />
      </Route>

      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;

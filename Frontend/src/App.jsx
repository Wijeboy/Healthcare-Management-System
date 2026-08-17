import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AdminDashboard from "./pages/AdminDashboard";
import DashboardLayout from "./components/layout/DashboardLayout";
import DoctorsManagement from "./pages/AdminPages/doctors/DoctorsManagement";
import AddDoctorPage from "./pages/AdminPages/doctors/AddDoctorPage";
import EditDoctorPage from "./pages/AdminPages/doctors/EditDoctorPage";
import DoctorDetails from "./pages/AdminPages/doctors/DoctorDetails";
import PatientsManagement from "./pages/AdminPages/patients/PatientsManagement";
import AddPatient from "./pages/AdminPages/patients/AddPatient";
import EditPatient from "./pages/AdminPages/patients/EditPatient";
import PatientDetails from "./pages/AdminPages/patients/PatientDetails";
import SystemSettingsPage from "./pages/AdminPages/SystemSettingsPage";
import StaffManagement from "./pages/AdminPages/staff/StaffManagement";
import AddStaff from "./pages/AdminPages/staff/AddStaff";
import EditStaff from "./pages/AdminPages/staff/EditStaff";
import StaffDetails from "./pages/AdminPages/staff/StaffDetails";
import ReportsAnalytics from "./pages/AdminPages/reports/ReportsAnalytics";
import UserManagement from "./pages/AdminPages/UserManagement";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";

const getCurrentRole = () => localStorage.getItem("hmsRole");

function RequireRole({ role, children }) {
  const currentRole = getCurrentRole();

  if (!currentRole) {
    return <Navigate to="/login" replace />;
  }

  if (currentRole !== role) {
    if (currentRole === "Admin") return <Navigate to="/admin" replace />;
    if (currentRole === "Doctor") return <Navigate to="/doctor" replace />;
    if (currentRole === "Patient") return <Navigate to="/patient" replace />;
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Admin Role Routes */}
      <Route
        path="/admin"
        element={
          <RequireRole role="Admin">
            <DashboardLayout />
          </RequireRole>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="doctors" element={<DoctorsManagement />} />
        <Route path="doctors/details" element={<DoctorDetails />} />
        <Route path="doctors/add" element={<AddDoctorPage />} />
        <Route path="doctors/edit" element={<EditDoctorPage />} />

        <Route path="patients" element={<PatientsManagement />} />
        <Route path="patients/details" element={<PatientDetails />} />
        <Route path="patients/add" element={<AddPatient />} />
        <Route path="patients/edit" element={<EditPatient />} />

        <Route path="staff" element={<StaffManagement />} />
        <Route path="staff/add" element={<AddStaff />} />
        <Route path="staff/edit" element={<EditStaff />} />
        <Route path="staff/details" element={<StaffDetails />} />

        <Route path="reports" element={<ReportsAnalytics />} />
        <Route path="settings" element={<SystemSettingsPage />} />
        <Route path="users" element={<UserManagement />} />
      </Route>

      {/* Doctor Role Routes */}
      <Route
        path="/doctor"
        element={
          <RequireRole role="Doctor">
            <DoctorDashboard />
          </RequireRole>
        }
      />

      {/* Patient Role Routes */}
      <Route
        path="/patient"
        element={
          <RequireRole role="Patient">
            <PatientDashboard />
          </RequireRole>
        }
      />

      {/* Legacy /dashboard redirects for backward compatibility */}
      <Route path="/dashboard" element={<Navigate to="/admin" replace />} />
      <Route path="/dashboard/admin" element={<Navigate to="/admin" replace />} />
      <Route path="/dashboard/doctor" element={<Navigate to="/doctor" replace />} />
      <Route path="/dashboard/patient" element={<Navigate to="/patient" replace />} />
      <Route path="/dashboard/doctors-management" element={<Navigate to="/admin/doctors" replace />} />
      <Route path="/dashboard/patients-management" element={<Navigate to="/admin/patients" replace />} />
      <Route path="/dashboard/staff-management" element={<Navigate to="/admin/staff" replace />} />
      <Route path="/dashboard/user-management" element={<Navigate to="/admin/users" replace />} />
      <Route path="/dashboard/system-settings" element={<Navigate to="/admin/settings" replace />} />
      <Route path="/dashboard/reports-analytics" element={<Navigate to="/admin/reports" replace />} />

      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;

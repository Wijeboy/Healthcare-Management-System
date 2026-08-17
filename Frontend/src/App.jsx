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
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";

const getCurrentRole = () => localStorage.getItem("hmsRole");

function RequireRole({ role, children }) {
  const currentRole = getCurrentRole();

  if (!currentRole) {
    return <Navigate to="/login" replace />;
  }

  if (currentRole !== role) {
    if (currentRole === "Admin") return <Navigate to="/dashboard" replace />;
    if (currentRole === "Doctor")
      return <Navigate to="/dashboard/doctor" replace />;
    if (currentRole === "Patient")
      return <Navigate to="/dashboard/patient" replace />;
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Protected Routes (wrapped in DashboardLayout) */}
      <Route
        path="/dashboard"
        element={
          <RequireRole role="Admin">
            <DashboardLayout />
          </RequireRole>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="doctors-management" element={<DoctorsManagement />} />
        <Route path="doctors-management/details" element={<DoctorDetails />} />
        <Route
          path="doctors-management/add-doctor"
          element={<AddDoctorPage />}
        />
        <Route
          path="doctors-management/edit-doctor"
          element={<EditDoctorPage />}
        />
        <Route path="patients-management" element={<PatientsManagement />} />
        <Route
          path="patients-management/details"
          element={<PatientDetails />}
        />
        <Route
          path="patients-management/add-patient"
          element={<AddPatient />}
        />
        <Route
          path="patients-management/edit-patient"
          element={<EditPatient />}
        />
        <Route path="staff-management" element={<StaffManagement />} />
        <Route path="staff-management/add-staff" element={<AddStaff />} />
        <Route path="staff-management/edit-staff" element={<EditStaff />} />
        <Route path="staff-management/details" element={<StaffDetails />} />
        <Route path="reports-analytics" element={<ReportsAnalytics />} />
        <Route path="system-settings" element={<SystemSettingsPage />} />
      </Route>

      {/* Role-specific dashboards */}
      <Route
        path="/dashboard/doctor"
        element={
          <RequireRole role="Doctor">
            <DoctorDashboard />
          </RequireRole>
        }
      />
      <Route
        path="/dashboard/patient"
        element={
          <RequireRole role="Patient">
            <PatientDashboard />
          </RequireRole>
        }
      />

      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;

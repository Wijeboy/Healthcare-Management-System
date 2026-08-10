import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AdminDashboard from "./pages/AdminDashboard";
import DashboardLayout from "./components/layout/DashboardLayout";
import DoctorsManagement from "./pages/doctors/DoctorsManagement";
import AddDoctorPage from "./pages/doctors/AddDoctorPage";
import EditDoctorPage from "./pages/doctors/EditDoctorPage";
import DoctorDetails from "./pages/doctors/DoctorDetails";
import PatientsManagement from "./pages/patients/PatientsManagement";
import AddPatient from "./pages/patients/AddPatient";
import EditPatient from "./pages/patients/EditPatient";
import PatientDetails from "./pages/patients/PatientDetails";
import SystemSettingsPage from "./pages/SystemSettingsPage";
import StaffManagement from "./pages/staff/StaffManagement";
import AddStaff from "./pages/staff/AddStaff";
import EditStaff from "./pages/staff/EditStaff";
import StaffDetails from "./pages/staff/StaffDetails";


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
        <Route path="doctors-management/details" element={<DoctorDetails />} />
        <Route path="doctors-management/add-doctor" element={<AddDoctorPage />} />
        <Route path="doctors-management/edit-doctor" element={<EditDoctorPage />} />
        <Route path="patients-management" element={<PatientsManagement />} />
        <Route path="patients-management/details" element={<PatientDetails />} />
        <Route path="patients-management/add-patient" element={<AddPatient />} />
        <Route path="patients-management/edit-patient" element={<EditPatient />} />
        <Route path="staff-management" element={<StaffManagement />} />
        <Route path="staff-management/add-staff" element={<AddStaff />} />
        <Route path="staff-management/edit-staff" element={<EditStaff />} />
        <Route path="staff-management/details" element={<StaffDetails />} />
        <Route path="system-settings" element={<SystemSettingsPage />} />
      </Route>

      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;

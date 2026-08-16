import { Routes, Route, Navigate } from "react-router-dom";

// Auth / public pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

// Admin portal
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
import ReportsAnalytics from "./pages/reports/ReportsAnalytics";

// Doctor portal
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import DoctorSchedule from "./pages/doctor/DoctorSchedule";
import TodaysAppointments from "./pages/doctor/TodaysAppointments";
import DoctorAppointmentDetails from "./pages/doctor/DoctorAppointmentDetails";
import PatientHistory from "./pages/doctor/PatientHistory";
import ClinicalNotifications from "./pages/doctor/ClinicalNotifications";

// Shared pages (Records, Prescriptions, booking)
import ScheduleAppointmentPage from "./pages/ScheduleAppointment";
import RecordsPage from "./pages/Records";
import PrescriptionsPage from "./pages/Prescriptions";
import PrescriptionFormPage from "./pages/PrescriptionForm";
import PrescriptionViewPage from "./pages/PrescriptionView";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/doctor" replace />} />

      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Protected Admin Routes (wrapped in DashboardLayout) */}
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
        <Route path="reports-analytics" element={<ReportsAnalytics />} />
        <Route path="system-settings" element={<SystemSettingsPage />} />
      </Route>

      {/* Doctor portal */}
      <Route path="/doctor" element={<DoctorDashboard />} />
      <Route path="/doctor/profile" element={<DoctorProfile />} />
      <Route path="/doctor/schedule" element={<DoctorSchedule />} />
      <Route path="/doctor/appointments/today" element={<TodaysAppointments />} />
      <Route path="/doctor/appointments/:id" element={<DoctorAppointmentDetails />} />
      <Route path="/doctor/patients/:patientId" element={<PatientHistory />} />
      <Route path="/doctor/notifications" element={<ClinicalNotifications />} />

      {/* Shared pages (Records, Prescriptions, booking) — same DoctorSidebar shell */}
      <Route path="/appointments/new" element={<ScheduleAppointmentPage />} />
      <Route path="/records" element={<RecordsPage />} />
      <Route path="/prescriptions" element={<PrescriptionsPage />} />
      <Route path="/prescriptions/new" element={<PrescriptionFormPage />} />
      <Route path="/prescriptions/:id/edit" element={<PrescriptionFormPage />} />
      <Route path="/prescriptions/:id" element={<PrescriptionViewPage />} />
    </Routes>
  );
}
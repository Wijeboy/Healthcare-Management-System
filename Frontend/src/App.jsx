import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ScheduleAppointmentPage from "./pages/ScheduleAppointment";
import RecordsPage from "./pages/Records";
import PrescriptionsPage from "./pages/Prescriptions";
import PrescriptionFormPage from "./pages/PrescriptionForm";
import PrescriptionViewPage from "./pages/PrescriptionView";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import DoctorSchedule from "./pages/doctor/DoctorSchedule";
import TodaysAppointments from "./pages/doctor/TodaysAppointments";
import DoctorAppointmentDetails from "./pages/doctor/DoctorAppointmentDetails";
import PatientHistory from "./pages/doctor/PatientHistory";
import ClinicalNotifications from "./pages/doctor/ClinicalNotifications";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/doctor" replace />} />

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

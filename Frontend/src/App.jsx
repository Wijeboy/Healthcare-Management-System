import { Routes, Route, Navigate } from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'

import AdminDashboard from './pages/AdminDashboard'
import DashboardLayout from './components/layout/DashboardLayout'

import GlobalAppointmentScheduler from './pages/GlobalAppointmentScheduler'
import RecordsUploadMain from './pages/RecordsUploadMain'
import FinancialBillingReports from './pages/FinancialBillingReports'

function App() {
  return (
    <Routes>

      {/* =========================
          Public Routes
      ========================== */}
      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPasswordPage />}
      />

      {/* =========================
          Dashboard Routes
      ========================== */}
      <Route
        path="/dashboard"
        element={<DashboardLayout />}
      >

        {/* Admin Dashboard */}
        <Route
          index
          element={<AdminDashboard />}
        />

        {/* Appointment Scheduler */}
        <Route
          path="appointments"
          element={<GlobalAppointmentScheduler />}
        />

        {/* Medical Records */}
        <Route
          path="records"
          element={<RecordsUploadMain />}
        />

        {/* Financial & Billing Reports */}
        <Route
          path="payments"
          element={<FinancialBillingReports />}
        />

      </Route>

      {/* =========================
          Default Redirect
      ========================== */}
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />

    </Routes>
  )
}

export default App
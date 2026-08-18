// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Auth Pages
import Login from './pages/auth/patient/Login';
import Register from './pages/auth/patient/Register';
import ForgotPassword from './pages/auth/patient/ForgotPassword';
import ResetPassword from './pages/auth/patient/ResetPassword';

// Patient Pages
import Dashboard from './pages/patient/Dashboard';
import Appointments from './pages/patient/Appointments';
import MedicalRecords from './pages/patient/MedicalRecords';
import Notifications from './pages/patient/Notifications';
import Prescriptions from './pages/patient/Prescriptions';
import Payments from './pages/patient/Payments';
import Support from './pages/patient/Support';
import Profile from './pages/patient/Profile';
import Settings from './pages/patient/Settings';
import BookAppointment from './pages/patient/AppointmentBooking';

import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* Patient Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/medical-records" element={<MedicalRecords />} />
        <Route path="/prescriptions" element={<Prescriptions />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/support" element={<Support />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
      </Routes>
    </Router>
  );
}

export default App;
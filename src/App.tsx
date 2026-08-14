// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import MedicalRecords from './pages/MedicalRecords';
import Prescriptions from './pages/Prescriptions';
import Payments from './pages/Payments';
import Support from './pages/Support';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import BookAppointment from './pages/BookAppointment';
import './index.css';

// Landing Page Component
const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mx-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary mb-2">
            🏥 Medimate
          </h1>
          <h2 className="text-xl font-semibold text-gray-text mb-4">
            Healthcare System
          </h2>
          <p className="text-gray-600 mb-6">
            Welcome to Medimate Healthcare System. Manage your appointments, medical records, prescriptions, and payments.
          </p>
          <div className="space-y-3">
            <Link 
              to="/dashboard"
              className="block w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors text-center font-medium"
            >
              Patient Dashboard
            </Link>
            <Link
              to="/book-appointment"
              className="block w-full bg-white text-primary border-2 border-primary px-4 py-2 rounded-lg hover:bg-primary-light transition-colors text-center font-medium"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
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
// components/common/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Calendar, FileText, Pill, 
  CreditCard, HelpCircle, LogOut, Phone 
} from 'lucide-react';

const Sidebar = ({ patientData }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/appointments', icon: Calendar, label: 'Appointments' },
    { path: '/medical-records', icon: FileText, label: 'Medical Records' },
    { path: '/prescriptions', icon: Pill, label: 'Prescriptions' },
    { path: '/payments', icon: CreditCard, label: 'Payments' },
    { path: '/support', icon: HelpCircle, label: 'Support' },
  ];

  return (
    <div className="h-screen w-64 bg-white shadow-lg fixed left-0 top-0">
      {/* Profile Card */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <img 
            src={patientData?.avatar || '/default-avatar.png'} 
            alt="Profile" 
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-gray-text">
              {patientData?.name || 'Patient'}
            </h3>
            <p className="text-sm text-gray-500">Patient ID: {patientData?.id}</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-6 py-3 text-gray-600 hover:bg-primary-light hover:text-primary transition-colors ${
              location.pathname === item.path ? 'bg-primary-light text-primary border-r-3 border-primary' : ''
            }`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Emergency Call */}
      <div className="absolute bottom-20 left-6 right-6">
        <button className="w-full bg-danger text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-red-700 transition-colors">
          <Phone size={20} />
          <span>Call Doctor</span>
        </button>
      </div>

      {/* Logout */}
      <div className="absolute bottom-6 left-6 right-6">
        <button className="w-full bg-gray-200 text-gray-text py-3 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-300 transition-colors">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
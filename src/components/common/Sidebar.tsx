// src/components/common/Sidebar.tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Calendar, FileText, Pill, 
  CreditCard, HelpCircle, LogOut, Phone
} from 'lucide-react';
import { Patient } from '../../types';
import EmergencyCall from '../EmergencyCall';

interface SidebarProps {
  patientData: Patient | null;
}

const Sidebar: React.FC<SidebarProps> = ({ patientData }) => {
  const location = useLocation();
  const [showEmergencyCall, setShowEmergencyCall] = useState(false);

  const menuItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/appointments', icon: Calendar, label: 'Appointments' },
    { path: '/medical-records', icon: FileText, label: 'Records' },
    { path: '/prescriptions', icon: Pill, label: 'Prescriptions' },
    { path: '/payments', icon: CreditCard, label: 'Payments' },
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      window.location.href = '/';
    }
  };

  return (
    <div className="h-screen w-64 bg-white shadow-lg fixed left-0 top-0 z-50 flex flex-col">
      {/* Brand Header - Fixed Height */}
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <h2 className="text-xl font-bold text-gray-800"> Medimate</h2>
        <p className="text-sm text-gray-500">Healthcare</p>
      </div>

      {/* Patient Profile - Fixed Height */}
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center space-x-3">
          {/* Patient Photo - WHITE BACKGROUND */}
          <div className="relative flex-shrink-0">
            {patientData?.avatar ? (
              <img 
                src={patientData.avatar} 
                alt={patientData.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="w-10 h-10 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center text-gray-700 font-bold text-sm shadow-sm">
                {patientData?.name?.charAt(0) || 'P'}
              </div>
            )}
            {/* Online Status Indicator */}
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 font-medium">Welcome,</p>
            <h3 className="font-bold text-gray-800 truncate text-sm">
              {patientData?.name || 'Patient'}
            </h3>
          </div>
        </div>
      </div>

      {/* Navigation Menu - Flexible Height */}
      <nav className="flex-1 py-2 min-h-0 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 mx-3 px-3 py-2.5 text-gray-600 hover:bg-blue-50 hover:text-primary transition-colors rounded-lg text-sm ${
              location.pathname === item.path 
                ? 'bg-blue-50 text-primary font-semibold border border-blue-100' 
                : ''
            }`}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Bottom Actions - Fixed Height */}
      <div className="p-3 space-y-2 border-t border-gray-200 flex-shrink-0">
        {/* Support */}
        <Link
          to="/support"
          className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors text-sm"
        >
          <HelpCircle size={16} />
          <span className="font-medium">Support</span>
        </Link>

        {/* Logout Button - Red */}
        <button 
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors group text-sm"
        >
          <LogOut size={16} className="group-hover:text-red-700" />
          <span className="font-medium group-hover:text-red-700">Logout</span>
        </button>

        {/* Call Doctor Button - RED BACKGROUND - PROMINENT */}
        <button 
          onClick={() => setShowEmergencyCall(true)}
          className="w-full bg-red-500 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-red-600 transition-all duration-200 font-bold shadow-md hover:shadow-lg transform hover:scale-105"
        >
          <Phone size={18} />
          <span> Call Doctor</span>
        </button>
      </div>

      {/* Emergency Call Modal */}
      <EmergencyCall 
        isOpen={showEmergencyCall}
        onClose={() => setShowEmergencyCall(false)}
      />
    </div>
  );
};

export default Sidebar;
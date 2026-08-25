// src/pages/PatientPages/Notifications.jsx
import React, { useState } from 'react';
import { 
  Bell, 
  CheckCheck, 
  Filter, 
  Calendar, 
  Pill, 
  Receipt, 
  ShieldCheck, 
  FlaskConical, 
  Info, 
  Activity,
  CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const initialNotifications = [
  {
    id: 'n1',
    type: 'appointment',
    title: 'Upcoming Appointment',
    time: 'Today, 9:30 AM',
    message: 'Appointment with Dr. Aris today at 2 PM in the Main Cardiology Wing.',
    read: false,
    actionText: 'View Details',
    actionRoute: '/patient/appointments'
  },
  {
    id: 'n2',
    type: 'prescription',
    title: 'Prescription Ready',
    time: '2 hours ago',
    message: 'Your prescription for Metformin is ready for pickup at Pharmacy B.',
    read: false,
    actionText: 'Find Pharmacy',
    actionRoute: '/patient/prescriptions'
  },
  {
    id: 'n3',
    type: 'payment',
    title: 'Payment Successful',
    time: 'Yesterday',
    message: 'Payment for invoice #88291 successful. You can download your receipt now.',
    read: false,
    actionText: 'Download Receipt',
    actionRoute: '/patient/payments'
  },
  {
    id: 'n4',
    type: 'system',
    title: 'System Update',
    time: '3 days ago',
    message: 'The Medimate patient portal has been updated with new security features. Review the changes in Settings.',
    read: true,
    actionText: null,
    actionRoute: null
  },
  {
    id: 'n5',
    type: 'lab',
    title: 'Lab Results Posted',
    time: 'Oct 12, 2023',
    message: 'Your blood panel results from Oct 10 are now available for review.',
    read: true,
    actionText: 'View Results',
    actionRoute: '/patient/medical-records'
  }
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const navigate = useNavigate();

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleMarkRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#003f87] tracking-tight">
          Support
        </h1>
      </div>

      {/* Title & Actions Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
          <p className="text-xs text-gray-500 mt-1">Stay updated with your healthcare journey.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleMarkAllRead}
            className="px-4 py-2 border border-gray-300 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <CheckCheck size={14} />
            <span>Mark all as read</span>
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 transition-all">
            <Filter size={14} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Activity Overview & Promo Banner (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Activity Overview Card */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900">Activity Overview</h3>
              <Activity size={18} className="text-[#1d70f5]" />
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="font-semibold text-gray-700">Unread Notifications</span>
                <span className="w-6 h-6 rounded-full bg-[#1d70f5] text-white flex items-center justify-center font-extrabold text-[11px]">
                  {unreadCount}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="font-semibold text-gray-700">Upcoming Today</span>
                <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-extrabold text-[11px]">
                  1
                </span>
              </div>
            </div>

            {/* Secure Data Encryption Box */}
            <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-100 text-xs space-y-1">
              <div className="font-bold text-[#1d70f5] uppercase text-[10px] tracking-wider flex items-center gap-1">
                <ShieldCheck size={14} /> Secure Data Encryption
              </div>
              <p className="text-gray-600 text-[11px] leading-relaxed">
                All your notification data is encrypted and HIPAA compliant.
              </p>
            </div>
          </div>

          {/* Medical Image Graphic Card */}
          <div className="rounded-2xl overflow-hidden relative shadow-xs group min-h-[160px] flex items-end p-4">
            <img
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600"
              alt="Medical Lab"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <p className="relative z-10 text-white font-bold text-sm">
              Your health is our priority.
            </p>
          </div>
        </div>

        {/* Right Column: Notification Feed (8 cols) */}
        <div className="lg:col-span-8 space-y-3">
          {notifications.map((n) => {
            const getIcon = () => {
              switch (n.type) {
                case 'appointment': return <Calendar size={18} className="text-[#1d70f5]" />;
                case 'prescription': return <Pill size={18} className="text-red-500" />;
                case 'payment': return <Receipt size={18} className="text-green-600" />;
                case 'lab': return <FlaskConical size={18} className="text-purple-600" />;
                default: return <Info size={18} className="text-gray-500" />;
              }
            };

            const getIconBg = () => {
              switch (n.type) {
                case 'appointment': return 'bg-blue-50';
                case 'prescription': return 'bg-red-50';
                case 'payment': return 'bg-green-50';
                case 'lab': return 'bg-purple-50';
                default: return 'bg-gray-100';
              }
            };

            return (
              <div
                key={n.id}
                className={`bg-white rounded-2xl border ${
                  !n.read ? 'border-blue-200 bg-blue-50/10' : 'border-gray-200/80'
                } p-5 shadow-xs flex items-start gap-4 hover:border-blue-300 transition-all relative`}
              >
                {!n.read && (
                  <span className="w-2 h-2 rounded-full bg-[#1d70f5] absolute left-3 top-6" />
                )}

                <div className={`w-10 h-10 rounded-xl ${getIconBg()} flex items-center justify-center shrink-0`}>
                  {getIcon()}
                </div>

                <div className="flex-1 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-gray-900 text-sm">{n.title}</h4>
                    <span className="text-[11px] text-gray-400 font-medium">{n.time}</span>
                  </div>

                  <p className="text-gray-600 leading-relaxed">{n.message}</p>

                  <div className="pt-2 flex items-center gap-4">
                    {n.actionText && (
                      <button
                        onClick={() => navigate(n.actionRoute)}
                        className="text-[#1d70f5] font-bold hover:underline cursor-pointer"
                      >
                        {n.actionText}
                      </button>
                    )}
                    {!n.read && (
                      <button
                        onClick={() => handleMarkRead(n.id)}
                        className="text-gray-400 hover:text-gray-600 font-medium"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Load Previous Notifications Button */}
          <div className="text-center pt-3">
            <button className="px-6 py-2.5 bg-blue-50 hover:bg-blue-100 text-[#1d70f5] font-bold text-xs rounded-xl transition-all border border-blue-100 cursor-pointer">
              Load Previous Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

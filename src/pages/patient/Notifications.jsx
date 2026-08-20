// src/pages/Notifications.jsx
import React, { useState } from 'react';
import Sidebar from '../../components/common/Sidebar';
import Header from '../../components/common/Header';
import {
  Calendar,
  Pill,
  CreditCard,
  Settings,
  FlaskConical,
  ShieldCheck,
  CheckCircle,
  Filter
} from 'lucide-react';

const mockPatient = {
  id: 'P001',
  name: 'Imasha Perera',
  email: 'imasha@example.com',
  phone: '+94 77 123 4567',
  dateOfBirth: '1995-06-15',
  gender: 'Female',
  address: 'Colombo, Sri Lanka',
};

const initialNotifications = [
  {
    id: '1',
    type: 'appointment',
    title: 'Upcoming Appointment',
    message: 'Appointment with Dr. Aris today at 2 PM in the Main Cardiology Wing.',
    time: 'Today, 9:30 AM',
    isRead: false,
    actions: ['View Details']
  },
  {
    id: '2',
    type: 'prescription',
    title: 'Prescription Ready',
    message: 'Your prescription for Metformin is ready for pickup at Pharmacy B.',
    time: '2 hours ago',
    isRead: false,
    actions: ['Find Pharmacy']
  },
  {
    id: '3',
    type: 'payment',
    title: 'Payment Successful',
    message: 'Payment for invoice #88291 successful. You can download your receipt now.',
    time: 'Yesterday',
    isRead: false,
    actions: ['Download Receipt']
  },
  {
    id: '4',
    type: 'system',
    title: 'System Update',
    message: 'The Medimate patient portal has been updated with new security features. Review the changes in Settings.',
    time: '3 days ago',
    isRead: true,
    actions: []
  },
  {
    id: '5',
    type: 'lab',
    title: 'Lab Results Posted',
    message: 'Your blood panel results from Oct 10 are now available for review.',
    time: 'Oct 12, 2023',
    isRead: true,
    actions: ['View Results']
  }
];

const typeConfig = {
  appointment: { icon: Calendar, iconBg: 'bg-blue-50', iconColor: 'text-blue-600' },
  prescription: { icon: Pill, iconBg: 'bg-red-50', iconColor: 'text-red-500' },
  payment: { icon: CreditCard, iconBg: 'bg-green-50', iconColor: 'text-green-600' },
  system: { icon: Settings, iconBg: 'bg-gray-100', iconColor: 'text-gray-500' },
  lab: { icon: FlaskConical, iconBg: 'bg-sky-50', iconColor: 'text-sky-600' }
};

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const upcomingToday = notifications.filter((n) => n.time.startsWith('Today')).length;

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar patientData={mockPatient} />
      <Header />

      <main className="ml-64 pt-20 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-500 text-sm mt-1">Stay updated with your healthcare journey.</p>
            </div>
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <button
                onClick={markAllAsRead}
                className="flex items-center space-x-2 border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold"
              >
                <CheckCircle size={16} />
                <span>Mark all as read</span>
              </button>
              <button className="flex items-center space-x-2 border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold">
                <Filter size={16} />
                <span>Filter</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-1 space-y-6">
              {/* Activity Overview */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h3 className="font-bold text-gray-900 mb-4">Activity Overview</h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
                    <span className="text-sm text-gray-600">Unread Notifications</span>
                    <span className="w-6 h-6 flex items-center justify-center bg-primary text-white text-xs font-bold rounded-full">
                      {unreadCount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
                    <span className="text-sm text-gray-600">Upcoming Today</span>
                    <span className="w-6 h-6 flex items-center justify-center bg-gray-300 text-white text-xs font-bold rounded-full">
                      {upcomingToday}
                    </span>
                  </div>
                </div>

                <div className="bg-primary-light rounded-lg p-4 mt-4 flex items-start space-x-3">
                  <ShieldCheck size={18} className="text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-primary tracking-wide">SECURE DATA ENCRYPTION</p>
                    <p className="text-xs text-gray-600 mt-1">
                      All your notification data is encrypted and HIPAA compliant.
                    </p>
                  </div>
                </div>
              </div>

              {/* Image Card */}
              <div className="relative rounded-2xl overflow-hidden h-48">
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&h=400&fit=crop"
                  alt="Healthcare team in the lab"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent"></div>
                <p className="absolute bottom-4 left-4 text-white font-semibold text-sm">
                  Your health is our priority
                </p>
              </div>
            </div>

            {/* Right Column - Notification Feed */}
            <div className="lg:col-span-2 space-y-4">
              {notifications.map((notification) => {
                const config = typeConfig[notification.type];
                const Icon = config.icon;
                return (
                  <div
                    key={notification.id}
                    className="relative bg-white rounded-2xl border border-gray-100 p-5 pl-6"
                  >
                    {!notification.isRead && (
                      <span className="absolute left-2 top-6 w-2 h-2 rounded-full bg-primary"></span>
                    )}

                    <div className="flex items-start space-x-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${config.iconBg}`}>
                        <Icon size={20} className={config.iconColor} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-semibold text-gray-900 text-sm">{notification.title}</h4>
                          <span className="text-xs text-gray-400 flex-shrink-0">{notification.time}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{notification.message}</p>

                        {(notification.actions.length > 0 || !notification.isRead) && (
                          <div className="flex items-center space-x-4 mt-3">
                            {notification.actions.map((action) => (
                              <button
                                key={action}
                                className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors"
                              >
                                {action}
                              </button>
                            ))}
                            {!notification.isRead && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors"
                              >
                                Mark as read
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="flex justify-center pt-2">
                <button className="border border-gray-200 text-gray-600 text-sm font-semibold px-5 py-2 rounded-full hover:bg-gray-50 transition-colors">
                  Load Previous Notifications
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-primary/70">
              <p>© 2024 CareConnect Health Systems. All rights reserved.</p>
              <div className="flex space-x-6 mt-3 md:mt-0">
                <button className="hover:text-primary transition-colors">Privacy</button>
                <button className="hover:text-primary transition-colors">Terms</button>
                <button className="hover:text-primary transition-colors">Audit Log</button>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};


export default Notifications;
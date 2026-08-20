// src/pages/Notifications.jsx
import React, { useState } from 'react';
import Sidebar from '../../components/common/Sidebar';
import Header from '../../components/common/Header';
import { Bell, Calendar, FileText, CreditCard, AlertTriangle, CheckCircle, Trash2 } from 'lucide-react';

const mockPatient = {
  id: 'P001',
  name: 'Imasha Perera',
  email: 'imasha@example.com',
  phone: '+94 77 123 4567',
  dateOfBirth: '1995-06-15',
  gender: 'Female',
  address: 'Colombo, Sri Lanka',
};

const mockNotifications = [
  {
    id: '1',
    type: 'appointment',
    title: 'Appointment Reminder',
    message: 'Your appointment with Dr. Nimal Fernando is tomorrow at 10:00 AM',
    timestamp: '2024-06-09T14:30:00Z',
    isRead: false,
    priority: 'high'
  },
  {
    id: '2',
    type: 'report',
    title: 'New Lab Results Available',
    message: 'Your blood test results from June 5th are now available for review',
    timestamp: '2024-06-08T09:15:00Z',
    isRead: false,
    priority: 'medium'
  },
  {
    id: '3',
    type: 'payment',
    title: 'Payment Due Soon',
    message: 'Invoice #INV-2024-001 for Rs. 1,800 is due on June 15th',
    timestamp: '2024-06-07T16:45:00Z',
    isRead: true,
    priority: 'medium'
  },
  {
    id: '4',
    type: 'system',
    title: 'System Maintenance',
    message: 'Scheduled maintenance on June 12th from 2:00 AM to 4:00 AM',
    timestamp: '2024-06-06T11:20:00Z',
    isRead: true,
    priority: 'low'
  },
  {
    id: '5',
    type: 'appointment',
    title: 'Appointment Confirmed',
    message: 'Your appointment with Dr. Priya Silva has been confirmed for June 20th',
    timestamp: '2024-06-05T13:10:00Z',
    isRead: true,
    priority: 'low'
  },
  {
    id: '6',
    type: 'emergency',
    title: 'Emergency Contact Updated',
    message: 'Your emergency contact information has been successfully updated',
    timestamp: '2024-06-04T10:30:00Z',
    isRead: true,
    priority: 'medium'
  }
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState('all');

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'appointment': return Calendar;
      case 'payment': return CreditCard;
      case 'report': return FileText;
      case 'emergency': return AlertTriangle;
      default: return Bell;
    }
  };

  const getNotificationColor = (type, priority) => {
    if (priority === 'high') return 'border-l-red-500 bg-red-50';
    if (type === 'appointment') return 'border-l-blue-500 bg-blue-50';
    if (type === 'payment') return 'border-l-yellow-500 bg-yellow-50';
    if (type === 'report') return 'border-l-green-500 bg-green-50';
    if (type === 'emergency') return 'border-l-red-500 bg-red-50';
    return 'border-l-gray-500 bg-gray-50';
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - past.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return past.toLocaleDateString();
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.isRead;
    if (filter === 'all') return true;
    return notif.type === filter;
  });

  const unreadCount = notifications.filter(notif => !notif.isRead).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar patientData={mockPatient} />
      <Header />
      
      <main className="ml-64 pt-20 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
                  <Bell size={32} className="mr-3 text-primary" />
                  Notifications
                  {unreadCount > 0 && (
                    <span className="ml-3 bg-danger text-white text-sm px-3 py-1 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </h1>
                <p className="text-gray-600">Stay updated with your healthcare information</p>
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="mt-4 lg:mt-0 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors flex items-center space-x-2"
                >
                  <CheckCircle size={20} />
                  <span>Mark All as Read</span>
                </button>
              )}
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'all', label: 'All', count: notifications.length },
                { key: 'unread', label: 'Unread', count: unreadCount },
                { key: 'appointment', label: 'Appointments', count: notifications.filter(n => n.type === 'appointment').length },
                { key: 'report', label: 'Reports', count: notifications.filter(n => n.type === 'report').length },
                { key: 'payment', label: 'Payments', count: notifications.filter(n => n.type === 'payment').length },
                { key: 'system', label: 'System', count: notifications.filter(n => n.type === 'system').length }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                    filter === tab.key
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    filter === tab.key ? 'bg-white text-primary' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <Bell size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-500 mb-2">No notifications found</h3>
                <p className="text-gray-400">You're all caught up!</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => {
                const IconComponent = getNotificationIcon(notification.type);
                
                return (
                  <div
                    key={notification.id}
                    className={`bg-white rounded-xl shadow-md border-l-4 overflow-hidden transition-all duration-200 ${
                      getNotificationColor(notification.type, notification.priority)
                    } ${!notification.isRead ? 'ring-2 ring-blue-200' : ''}`}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className={`p-3 rounded-lg ${
                            notification.priority === 'high' ? 'bg-red-100' :
                            notification.type === 'appointment' ? 'bg-blue-100' :
                            notification.type === 'payment' ? 'bg-yellow-100' :
                            notification.type === 'report' ? 'bg-green-100' : 'bg-gray-100'
                          }`}>
                            <IconComponent size={24} className={`${
                              notification.priority === 'high' ? 'text-red-600' :
                              notification.type === 'appointment' ? 'text-blue-600' :
                              notification.type === 'payment' ? 'text-yellow-600' :
                              notification.type === 'report' ? 'text-green-600' : 'text-gray-600'
                            }`} />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="text-lg font-semibold text-gray-800">
                                {notification.title}
                              </h3>
                              {!notification.isRead && (
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                              )}
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                notification.priority === 'high' ? 'bg-red-100 text-red-800' :
                                notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-600'
                              }`}>
                                {notification.priority}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-3">{notification.message}</p>
                            <p className="text-sm text-gray-500">{getTimeAgo(notification.timestamp)}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 ml-4">
                          {!notification.isRead && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                              title="Mark as read"
                            >
                              <CheckCircle size={18} />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                            title="Delete notification"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>
    </div>
  );
};


export default Notifications;
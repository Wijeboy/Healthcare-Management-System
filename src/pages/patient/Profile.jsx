// src/pages/Profile.jsx
import React, { useState } from 'react';
import Sidebar from '../../components/common/Sidebar';
import Header from '../../components/common/Header';
import {
  User,
  Shield,
  Bell,
  CreditCard,
  Camera,
  Fingerprint,
  AlertTriangle,
  Trash2
} from 'lucide-react';

const mockPatient = {
  id: 'P001',
  name: 'Imasha Seewandi',
  email: 'imasha@example.com',
  phone: '+94 77 123 4567',
  dateOfBirth: '1995-06-15',
  gender: 'Female',
  address: 'No. 123, Galle Road, Colombo 03, Sri Lanka',
  avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop&crop=faces'
};

const tabs = [
  { key: 'personal', label: 'Personal Info', icon: User },
  { key: 'security', label: 'Security', icon: Shield },
  { key: 'notifications', label: 'Notifications', icon: Bell },
  { key: 'payment', label: 'Payment Methods', icon: CreditCard }
];

const FieldIcon = () => (
  <Fingerprint
    size={14}
    className="absolute right-3 bottom-2.5 text-gray-300 pointer-events-none"
  />
);

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [savedProfile, setSavedProfile] = useState({
    fullName: mockPatient.name,
    email: mockPatient.email,
    phone: mockPatient.phone,
    bio: 'Chief of Cardiology with 15+ years experience in interventional cardiology and hospital administration.'
  });
  const [form, setForm] = useState(savedProfile);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setSavedProfile(form);
    alert('Your changes have been saved.');
  };

  const handleCancel = () => {
    setForm(savedProfile);
  };

  const handleDeleteAccount = () => {
    if (window.confirm('This will permanently delete your account. Are you sure you want to continue?')) {
      alert('Account deletion requested.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar patientData={mockPatient} />
      <Header />

      <main className="ml-64 pt-20 p-6">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
            <p className="text-gray-500 text-sm mt-1">Manage your professional profile and security preferences.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Tab Nav */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-100 p-2 space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.key;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                        isActive
                          ? 'bg-primary text-white'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon size={17} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-3 space-y-6">
              {activeTab === 'personal' && (
                <>
                  <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-[auto,1fr] gap-6">
                      {/* Avatar */}
                      <div className="flex flex-col items-center sm:items-start">
                        <div className="relative w-28 h-28">
                          <img
                            src={mockPatient.avatar}
                            alt={savedProfile.fullName}
                            className="w-28 h-28 rounded-xl object-cover"
                          />
                          <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white shadow-md hover:bg-primary-dark transition-colors">
                            <Camera size={15} />
                          </button>
                        </div>
                        <button className="text-xs font-semibold text-primary mt-3 hover:text-primary-dark transition-colors">
                          ↑ Upload new photo
                        </button>
                      </div>

                      {/* Form */}
                      <div>
                        <h3 className="font-bold text-gray-900 mb-4">Personal Information</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div className="relative">
                            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Full Name</label>
                            <input
                              type="text"
                              value={form.fullName}
                              onChange={(e) => handleChange('fullName', e.target.value)}
                              className="w-full pl-3 pr-8 py-2.5 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                            />
                            <FieldIcon />
                          </div>

                          <div className="relative">
                            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Email Address</label>
                            <input
                              type="email"
                              value={form.email}
                              onChange={(e) => handleChange('email', e.target.value)}
                              className="w-full pl-3 pr-8 py-2.5 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                            />
                            <FieldIcon />
                          </div>

                          <div className="relative">
                            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Phone Number</label>
                            <input
                              type="tel"
                              value={form.phone}
                              onChange={(e) => handleChange('phone', e.target.value)}
                              className="w-full pl-3 pr-8 py-2.5 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                            />
                            <FieldIcon />
                          </div>
                        </div>

                        <div className="relative mt-5">
                          <label className="block text-xs font-semibold text-gray-400 mb-1.5">Professional Bio</label>
                          <textarea
                            rows={3}
                            value={form.bio}
                            onChange={(e) => handleChange('bio', e.target.value)}
                            className="w-full pl-3 pr-8 py-2.5 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary focus:border-transparent text-sm resize-none"
                          />
                          <FieldIcon />
                        </div>

                        <div className="flex justify-end space-x-4 mt-6">
                          <button
                            onClick={handleCancel}
                            className="text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSave}
                            className="bg-primary-dark text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-primary transition-colors"
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
                    <div className="flex items-center space-x-2 mb-1">
                      <AlertTriangle size={17} className="text-red-500" />
                      <h4 className="font-bold text-red-600">Danger Zone</h4>
                    </div>
                    <p className="text-sm text-red-500 mb-3">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button
                      onClick={handleDeleteAccount}
                      className="flex items-center space-x-1.5 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
                    >
                      <Trash2 size={14} />
                      <span>Delete Account</span>
                    </button>
                  </div>
                </>
              )}

              {activeTab === 'security' && (
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Security</h3>
                  <p className="text-sm text-gray-500">
                    Password and two-factor authentication settings will appear here.
                  </p>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Notifications</h3>
                  <p className="text-sm text-gray-500">
                    Manage which notifications you receive by email, SMS, or in-app alerts here.
                  </p>
                </div>
              )}

              {activeTab === 'payment' && (
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Payment Methods</h3>
                  <p className="text-sm text-gray-500">
                    Saved cards and billing preferences will appear here.
                  </p>
                </div>
              )}
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
export default Profile;
// src/pages/Settings.jsx
import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Shield, User, Moon, Globe, Smartphone, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const mockPatient = {
  id: 'P001',
  name: 'Imasha Perera',
  email: 'imasha@example.com',
  phone: '+94 77 123 4567',
  dateOfBirth: '1995-06-15',
  gender: 'Female',
  address: 'Colombo, Sri Lanka',
};

const Settings = () => {
  const [activeTab, setActiveTab] = useState('notifications');
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: true,
      push: true,
      appointmentReminders: true,
      paymentReminders: true,
      reportAlerts: true
    },
    privacy: {
      dataSharing: false,
      marketingEmails: false,
      profileVisibility: 'limited'
    },
    preferences: {
      language: 'English',
      timezone: 'Asia/Colombo',
      dateFormat: 'DD/MM/YYYY',
      theme: 'light'
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      loginAlerts: true
    }
  });

  const handleToggle = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value !== undefined ? value : !prev[section][key]
      }
    }));
  };

  const saveSettings = () => {
    // Handle save settings
    alert('Settings saved successfully!');
  };

  return (
    <section className="p-6 space-y-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
                  <SettingsIcon size={32} className="mr-3 text-primary" />
                  Settings
                </h1>
                <p className="text-gray-600">Manage your account preferences and privacy settings</p>
              </div>
              <button
                onClick={saveSettings}
                className="mt-4 lg:mt-0 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Settings Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6">
                <nav className="space-y-2">
                  {[
                    { key: 'notifications', label: 'Notifications', icon: Bell },
                    { key: 'privacy', label: 'Privacy', icon: Shield },
                    { key: 'preferences', label: 'Preferences', icon: User },
                    { key: 'security', label: 'Security', icon: Lock }
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.key
                          ? 'bg-primary text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <tab.icon size={20} />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-md p-6">
                {/* Notifications Settings */}
                {activeTab === 'notifications' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Notification Preferences</h2>
                    
                    <div className="space-y-6">
                      {/* Delivery Methods */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-4">Delivery Methods</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Mail size={20} className="text-gray-600" />
                              <div>
                                <p className="font-medium text-gray-800">Email Notifications</p>
                                <p className="text-sm text-gray-600">Receive notifications via email</p>
                              </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={settings.notifications.email}
                                onChange={() => handleToggle('notifications', 'email')}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Smartphone size={20} className="text-gray-600" />
                              <div>
                                <p className="font-medium text-gray-800">SMS Notifications</p>
                                <p className="text-sm text-gray-600">Receive notifications via text message</p>
                              </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={settings.notifications.sms}
                                onChange={() => handleToggle('notifications', 'sms')}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Bell size={20} className="text-gray-600" />
                              <div>
                                <p className="font-medium text-gray-800">Push Notifications</p>
                                <p className="text-sm text-gray-600">Receive push notifications in browser</p>
                              </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={settings.notifications.push}
                                onChange={() => handleToggle('notifications', 'push')}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Notification Types */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-4">Notification Types</h3>
                        <div className="space-y-3">
                          {[
                            { key: 'appointmentReminders', label: 'Appointment Reminders', desc: 'Get reminded about upcoming appointments' },
                            { key: 'paymentReminders', label: 'Payment Reminders', desc: 'Notifications for due payments' },
                            { key: 'reportAlerts', label: 'Report Alerts', desc: 'When new medical reports are available' }
                          ].map((item) => (
                            <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                              <div>
                                <p className="font-medium text-gray-800">{item.label}</p>
                                <p className="text-sm text-gray-600">{item.desc}</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={settings.notifications[item.key]}
                                  onChange={() => handleToggle('notifications', item.key)}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Privacy Settings */}
                {activeTab === 'privacy' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Privacy & Data</h2>
                    
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-800">Data Sharing</p>
                          <p className="text-sm text-gray-600">Allow sharing anonymous data for medical research</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.privacy.dataSharing}
                            onChange={() => handleToggle('privacy', 'dataSharing')}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-800">Marketing Emails</p>
                          <p className="text-sm text-gray-600">Receive promotional emails and health tips</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.privacy.marketingEmails}
                            onChange={() => handleToggle('privacy', 'marketingEmails')}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>

                      <div className="p-4 border border-gray-200 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Profile Visibility</label>
                        <select
                          value={settings.privacy.profileVisibility}
                          onChange={(e) => handleToggle('privacy', 'profileVisibility', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="public">Public - Visible to all healthcare providers</option>
                          <option value="limited">Limited - Visible to your assigned doctors only</option>
                          <option value="private">Private - Visible to you only</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Preferences Settings */}
                {activeTab === 'preferences' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">App Preferences</h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Language</label>
                        <select
                          value={settings.preferences.language}
                          onChange={(e) => handleToggle('preferences', 'language', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="English">English</option>
                          <option value="Sinhala">Sinhala</option>
                          <option value="Tamil">Tamil</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Timezone</label>
                        <select
                          value={settings.preferences.timezone}
                          onChange={(e) => handleToggle('preferences', 'timezone', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="Asia/Colombo">Asia/Colombo (UTC+05:30)</option>
                          <option value="Asia/Dubai">Asia/Dubai (UTC+04:00)</option>
                          <option value="Asia/Singapore">Asia/Singapore (UTC+08:00)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Date Format</label>
                        <select
                          value={settings.preferences.dateFormat}
                          onChange={(e) => handleToggle('preferences', 'dateFormat', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Theme</label>
                        <select
                          value={settings.preferences.theme}
                          onChange={(e) => handleToggle('preferences', 'theme', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="light">Light Mode</option>
                          <option value="dark">Dark Mode</option>
                          <option value="auto">Auto (System)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Settings */}
                {activeTab === 'security' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Security Settings</h2>
                    
                    <div className="space-y-6">
                      {/* Password Change */}
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <h3 className="text-lg font-medium text-gray-800 mb-4">Change Password</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                            <div className="relative">
                              <input
                                type={showPassword ? 'text' : 'password'}
                                className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Enter current password"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-gray-600"
                              >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                              </button>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                            <input
                              type="password"
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                              placeholder="Enter new password"
                            />
                          </div>
                        </div>
                        <button className="mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
                          Update Password
                        </button>
                      </div>

                      {/* Two-Factor Authentication */}
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-800">Two-Factor Authentication</p>
                          <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.security.twoFactorAuth}
                            onChange={() => handleToggle('security', 'twoFactorAuth')}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>

                      {/* Session Timeout */}
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Session Timeout (minutes)</label>
                        <select
                          value={settings.security.sessionTimeout}
                          onChange={(e) => handleToggle('security', 'sessionTimeout', parseInt(e.target.value))}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value={15}>15 minutes</option>
                          <option value={30}>30 minutes</option>
                          <option value={60}>1 hour</option>
                          <option value={120}>2 hours</option>
                        </select>
                      </div>

                      {/* Login Alerts */}
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-800">Login Alerts</p>
                          <p className="text-sm text-gray-600">Get notified when someone logs into your account</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.security.loginAlerts}
                            onChange={() => handleToggle('security', 'loginAlerts')}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
    </section>
  );
};

export default Settings;

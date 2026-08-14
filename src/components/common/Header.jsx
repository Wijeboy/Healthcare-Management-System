// components/common/Header.jsx
import React, { useState } from 'react';
import { Search, Bell, Moon, Sun, Settings, User } from 'lucide-react';

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(3);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 ml-64 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search appointments, records..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-primary">
            <Bell size={20} />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-danger text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>

          {/* Dark Mode Toggle */}
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 text-gray-600 hover:text-primary"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Settings */}
          <button className="p-2 text-gray-600 hover:text-primary">
            <Settings size={20} />
          </button>

          {/* Profile */}
          <button className="p-2 text-gray-600 hover:text-primary">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
// src/components/patient/Dashboard/WelcomeSection.jsx
import React from 'react';
import { Calendar, Clock, Activity, Heart } from 'lucide-react';

const WelcomeSection = ({ patientName }) => {
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="bg-gradient-to-r from-primary to-blue-600 rounded-xl shadow-lg text-white p-8 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="mb-6 lg:mb-0">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {patientName}! 👋
          </h1>
          <p className="text-blue-100 text-lg mb-4">
            Here's what's happening with your health today.
          </p>
          <div className="flex flex-wrap items-center space-x-6 text-blue-100">
            <div className="flex items-center space-x-2">
              <Calendar size={18} />
              <span>{currentDate}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={18} />
              <span>{currentTime}</span>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <Activity size={24} className="mx-auto mb-2" />
            <div className="text-2xl font-bold">98.6°F</div>
            <div className="text-xs text-blue-100">Normal</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <Heart size={24} className="mx-auto mb-2" />
            <div className="text-2xl font-bold">72</div>
            <div className="text-xs text-blue-100">BPM</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
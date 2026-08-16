// components/patient/Dashboard/DashboardCards.jsx
import React from 'react';
import { Calendar, FileText, CreditCard, ChevronRight } from 'lucide-react';

const DashboardCards = ({ dashboardData }) => {
  const cards = [
    {
      title: 'Next Appointment',
      content: (
        <div>
          <div className="text-2xl font-bold text-gray-text">
            {dashboardData?.nextAppointment?.date || 'No upcoming'}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {dashboardData?.nextAppointment?.time} - Dr. {dashboardData?.nextAppointment?.doctor}
          </div>
        </div>
      ),
      icon: Calendar,
      color: 'bg-primary',
      urgent: dashboardData?.nextAppointment?.isUrgent,
    },
    {
      title: 'Unread Reports',
      content: (
        <div>
          <div className="text-2xl font-bold text-gray-text">
            {dashboardData?.unreadReports || 0}
          </div>
          <div className="text-sm text-gray-500 mt-1">New Reports</div>
        </div>
      ),
      icon: FileText,
      color: 'bg-primary-light',
    },
    {
      title: 'Pending Bills',
      content: (
        <div>
          <div className="text-2xl font-bold text-danger">
            Rs.{dashboardData?.pendingBills || 0}
          </div>
          <div className="text-sm text-gray-500 mt-1">Outstanding</div>
        </div>
      ),
      icon: CreditCard,
      color: 'bg-primary-light',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6 relative overflow-hidden">
          {card.urgent && (
            <span className="absolute top-4 right-4 bg-danger text-white text-xs px-2 py-1 rounded-full">
              Urgent
            </span>
          )}
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-500 mb-3">{card.title}</h3>
              {card.content}
            </div>
            <div className={`p-3 rounded-lg ${card.color}`}>
              <card.icon className="text-white" size={24} />
            </div>
          </div>

          <button className="mt-4 text-primary text-sm font-medium flex items-center hover:underline">
            View Details <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
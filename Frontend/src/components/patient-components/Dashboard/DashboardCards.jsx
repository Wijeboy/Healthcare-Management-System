// src/components/patient/Dashboard/DashboardCards.jsx
import React from 'react';
import { Calendar, FileText, CreditCard, ChevronRight, Clock, AlertCircle } from 'lucide-react';

const DashboardCards = ({ dashboardData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Next Appointment Card */}
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-primary rounded-lg">
                <Calendar className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Next Appointment</h3>
                {dashboardData?.nextAppointment?.isUrgent && (
                  <div className="flex items-center space-x-1 mt-1">
                    <AlertCircle size={14} className="text-danger" />
                    <span className="text-xs font-medium text-danger">Urgent</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {dashboardData?.nextAppointment ? (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Calendar size={16} className="text-gray-400" />
                <span className="text-2xl font-bold text-gray-800">
                  {dashboardData.nextAppointment.date}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} className="text-gray-400" />
                <span className="text-gray-600">
                  {dashboardData.nextAppointment.time}
                </span>
              </div>
              <div className="text-gray-600 font-medium">
                Dr. {dashboardData.nextAppointment.doctor}
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="text-2xl font-bold text-gray-400 mb-2">No upcoming</div>
              <div className="text-sm text-gray-500">appointments</div>
            </div>
          )}

          <button className="mt-6 w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center space-x-2 font-medium">
            <span>View Details</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Unread Reports Card */}
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="text-primary" size={24} />
              </div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Unread Reports</h3>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">
              {dashboardData?.unreadReports || 0}
            </div>
            <div className="text-gray-600">New laboratory reports</div>
          </div>

          <button className="mt-6 w-full bg-primary-light text-primary py-2 px-4 rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center space-x-2 font-medium">
            <span>Open Portal</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Pending Bills Card */}
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-red-100 rounded-lg">
                <CreditCard className="text-danger" size={24} />
              </div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Pending Bills</h3>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-4xl font-bold text-danger">
              Rs.{dashboardData?.pendingBills || 0}
            </div>
            <div className="text-gray-600">Outstanding payments</div>
          </div>

          <button className="mt-6 w-full bg-danger text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 font-medium">
            <span>Pay Now</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
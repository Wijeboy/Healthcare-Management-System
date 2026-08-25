// src/pages/PatientPages/Dashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar as CalendarIcon,
  Folder,
  CreditCard,
  ChevronRight,
  ExternalLink,
  Plus,
  MoreVertical,
  Heart
} from "lucide-react";

export default function Dashboard({
  patient = { name: "Imasha" },
  dashboardData = {
    nextAppointment: {
      date: "June 10",
      time: "10:00 AM",
      doctor: "Nirmal Jayawardhana",
      isUrgent: true,
    },
    unreadReports: 2,
    pendingBills: 150,
  },
  appointments = [
    {
      id: "1",
      date: "June 12, 2024",
      time: "10:00 AM",
      doctor: "Dr. Nimal",
      department: "Cardiology",
      status: "Confirmed",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&h=80&fit=crop&crop=face",
    }
  ]
}) {
  const navigate = useNavigate();

  const patientName = patient?.name || "Imasha";

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* Welcome Banner */}
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
          Welcome, {patientName} 👋
        </h1>
        <p className="text-xs text-gray-500 mt-1 font-normal">
          Here's what's happening with your health today.
        </p>
      </div>

      {/* 3 Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Next Appointment */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs relative flex flex-col justify-between hover:border-blue-300 transition-all">
          {/* URGENT Badge */}
          <div className="absolute top-4 right-4 bg-[#001f54] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wider">
            URGENT
          </div>

          <div>
            <div className="w-10 h-10 rounded-xl bg-[#e8f3ff] text-[#1d70f5] flex items-center justify-center mb-4">
              <CalendarIcon size={20} />
            </div>

            <div className="text-xs font-bold text-gray-800 mb-1">Next Appointment</div>
            <div className="text-lg font-extrabold text-[#003f87] tracking-tight mb-1">
              June 10, 10:00 AM
            </div>
            <div className="text-xs text-gray-500 font-medium mb-6">
              Dr. Nirmal Jayawardhana
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/patient/appointments")}
            className="w-full border border-[#1d70f5] text-[#003f87] hover:bg-blue-50 py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer"
          >
            <span>View Details</span>
            <ChevronRight size={15} />
          </button>
        </div>

        {/* Card 2: Unread Reports */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs flex flex-col justify-between hover:border-blue-300 transition-all">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#e8f3ff] text-[#1d70f5] flex items-center justify-center mb-4">
              <Folder size={20} />
            </div>

            <div className="text-xs font-bold text-gray-800 mb-1">Unread Reports</div>
            <div className="text-lg font-extrabold text-gray-900 tracking-tight mb-6">
              2 new reports
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/patient/medical-records")}
            className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <span>Open Portal</span>
            <ExternalLink size={14} />
          </button>
        </div>

        {/* Card 3: Pending Bills */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs flex flex-col justify-between hover:border-blue-300 transition-all">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#e8f3ff] text-[#1d70f5] flex items-center justify-center mb-4">
              <CreditCard size={20} />
            </div>

            <div className="text-xs font-bold text-gray-800 mb-1">Pending Bills</div>
            <div className="text-lg font-extrabold text-red-600 tracking-tight mb-6">
              Rs. 150
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/patient/payments")}
            className="w-full bg-[#1d70f5] hover:bg-blue-700 text-white py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
          >
            <span>Pay now</span>
            <CreditCard size={14} />
          </button>
        </div>
      </div>

      {/* Upcoming Appointments Table Section */}
      <div className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-xs">
        {/* Table Header Row */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100 bg-gray-50/40">
          <h2 className="text-base font-bold text-gray-900">Upcoming Appointments</h2>
          <button
            type="button"
            onClick={() => navigate("/patient/appointments")}
            className="bg-[#1e3a8a] hover:bg-[#1e40af] text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
          >
            <Plus size={15} />
            <span>Schedule New</span>
          </button>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/60">
                <th className="py-3 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  DATE
                </th>
                <th className="py-3 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  DOCTOR NAME
                </th>
                <th className="py-3 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  DEPARTMENT
                </th>
                <th className="py-3 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  STATUS
                </th>
                <th className="py-3 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-right">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {appointments && appointments.length > 0 ? (
                appointments.map((apt, index) => (
                  <tr key={apt.id || index} className="hover:bg-blue-50/30 transition-colors">
                    {/* DATE */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#dbeafe] text-[#1d70f5] flex flex-col items-center justify-center shrink-0">
                          <span className="text-[9px] font-bold uppercase leading-none">JUN</span>
                          <span className="text-sm font-extrabold leading-none mt-0.5">12</span>
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-xs">June 12, 2024</div>
                          <div className="text-[11px] text-gray-400 font-medium mt-0.5">10:00 AM</div>
                        </div>
                      </div>
                    </td>

                    {/* DOCTOR NAME */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={apt.avatar || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&h=80&fit=crop&crop=face"}
                          alt={apt.doctor}
                          className="w-8 h-8 rounded-full object-cover border border-white shadow-xs shrink-0"
                        />
                        <span className="font-bold text-gray-900">{apt.doctor}</span>
                      </div>
                    </td>

                    {/* DEPARTMENT */}
                    <td className="py-4 px-6">
                      <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#e0f2fe] text-[#0284c7]">
                        <Heart size={12} className="shrink-0" />
                        <span>{apt.department}</span>
                      </div>
                    </td>

                    {/* STATUS */}
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#dcfce7] text-[#16a34a] border border-[#bbf7d0]">
                        CONFIRMED
                      </span>
                    </td>

                    {/* ACTION */}
                    <td className="py-4 px-6 text-right">
                      <button 
                        type="button"
                        className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-400">
                    No upcoming appointments
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

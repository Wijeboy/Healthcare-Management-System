import React from "react";
import { Edit, MoreHorizontal } from "lucide-react";

const PatientHeaderCard = ({ patient, onEdit }) => {
  return (
    <div className="space-y-4 mb-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <nav className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1.5">
            <a
              href="#"
              className="text-[#2563EB] hover:underline font-semibold"
            >
              Patients Management
            </a>
            <span>›</span>
            <span className="text-slate-400">Patient Details</span>
          </nav>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Patient Details
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            View the patient's personal information, medical summary, emergency
            contact, appointments, and account access.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-[#0256CA] hover:bg-blue-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm transition"
          >
            <Edit size={14} />
            Edit Patient
          </button>
          <button className="p-2 border border-[#E2E8F0] bg-white text-slate-600 hover:bg-slate-50 rounded-lg transition">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-xl bg-[#DBEAFE] text-[#1D4ED8] font-bold text-xl flex items-center justify-center shrink-0">
            {patient.initials}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">
                {patient.name}
              </h2>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold tracking-wider rounded uppercase">
                {patient.status}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Patient ID: {patient.id} · User ID: {patient.userId}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-0.5 bg-rose-100 text-rose-700 text-[10px] font-bold rounded">
                {patient.bloodGroup} BLOOD GROUP
              </span>
              <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-bold rounded">
                {patient.age} YEARS
              </span>
              <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-bold rounded uppercase">
                {patient.gender}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-3 max-w-xl">
              {patient.summaryNote}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="w-full lg:w-auto grid grid-cols-2 gap-px bg-slate-100 border border-slate-100 rounded-lg overflow-hidden shrink-0">
          <div className="bg-white p-3.5 min-w-[140px]">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              LAST VISIT
            </p>
            <p className="text-sm font-bold text-slate-800 mt-1">
              {patient.lastVisit}
            </p>
          </div>
          <div className="bg-white p-3.5 min-w-[140px]">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              UPCOMING APPOINTMENT
            </p>
            <p className="text-sm font-bold text-slate-800 mt-1">
              {patient.upcomingAppointment}
            </p>
          </div>
          <div className="bg-white p-3.5 min-w-[140px]">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              MEDICAL RECORDS
            </p>
            <p className="text-sm font-bold text-slate-800 mt-1">
              {patient.medicalRecordsCount} Records
            </p>
          </div>
          <div className="bg-white p-3.5 min-w-[140px]">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              RISK ALERTS
            </p>
            <p className="text-sm font-bold text-emerald-600 mt-1">
              {patient.riskAlerts}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientHeaderCard;

import React from "react";

const PatientHeaderCard = ({ patient }) => {
  return (
    <div className="space-y-4 mb-6">
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
          <div className="bg-white p-3.5 min-w-35">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              LAST VISIT
            </p>
            <p className="text-sm font-bold text-slate-800 mt-1">
              {patient.lastVisit}
            </p>
          </div>
          <div className="bg-white p-3.5 min-w-35">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              UPCOMING APPOINTMENT
            </p>
            <p className="text-sm font-bold text-slate-800 mt-1">
              {patient.upcomingAppointment}
            </p>
          </div>
          <div className="bg-white p-3.5 min-w-35">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              MEDICAL RECORDS
            </p>
            <p className="text-sm font-bold text-slate-800 mt-1">
              {patient.medicalRecordsCount} Records
            </p>
          </div>
          <div className="bg-white p-3.5 min-w-35">
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



import React from 'react'
import { Users, CalendarCheck, AlertTriangle, Activity } from "lucide-react";

const PatientStatCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Patients */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 flex items-center gap-4 shadow-sm">
        <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
          <Users size={20} />
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
            TOTAL PATIENTS
          </p>
          <h3 className="text-xl font-bold text-slate-900 leading-tight">
            {stats.totalPatients}
          </h3>
        </div>
      </div>

      {/* Active Patients */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 flex items-center gap-4 shadow-sm">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <CalendarCheck size={20} />
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
            ACTIVE PATIENTS
          </p>
          <h3 className="text-xl font-bold text-slate-900 leading-tight">
            {stats.activeVisits}
          </h3>
        </div>
      </div>

      {/* Allergies / Alerts */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 flex items-center gap-4 shadow-sm">
        <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
          <AlertTriangle size={20} />
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
            KNOWN ALLERGIES
          </p>
          <h3 className="text-xl font-bold text-slate-900 leading-tight">
            {stats.criticalAlerts}
          </h3>
        </div>
      </div>

      {/* Inactive Patients */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 flex items-center gap-4 shadow-sm">
        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
          <Activity size={20} />
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
            INACTIVE PATIENTS
          </p>
          <h3 className="text-xl font-bold text-slate-900 leading-tight">
            {stats.dataHealth}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default PatientStatCards


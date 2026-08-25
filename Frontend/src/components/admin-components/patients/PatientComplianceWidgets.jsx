import React from 'react'
import { Info, ShieldCheck } from "lucide-react";

const PatientComplianceWidgets = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Record Integrity Check Card */}
      <div className="lg:col-span-2 bg-[#0256CA] text-white rounded-2xl p-6 shadow-sm flex items-start justify-between relative overflow-hidden">
        <div className="max-w-xl z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <Info size={16} className="text-white" />
            </div>
            <h4 className="text-base font-bold tracking-tight">
              Record Integrity Check
            </h4>
          </div>
          <p className="text-xs text-blue-100 leading-relaxed mb-4">
            Patient records are synchronized with the central health information
            system. Access and changes should be logged during implementation.
          </p>
          <button className="px-4 py-2 bg-white text-[#0256CA] font-bold text-xs rounded-lg hover:bg-blue-50 transition shadow-sm cursor-pointer">
            View Compliance Logs
          </button>
        </div>
      </div>

      {/* Data Privacy Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <ShieldCheck size={20} />
        </div>
        <div>
          <h4 className="text-base font-bold text-slate-900 leading-tight mb-1">
            Data Privacy
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            You are viewing patient information. All access should be protected
            through role-based permissions and recorded in activity logs.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PatientComplianceWidgets



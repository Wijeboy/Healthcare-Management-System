import React from "react";
import { ShieldCheck } from "lucide-react";

const EditPatientHeaderBanner = ({ patient }) => {
  return (
    <div className="space-y-3 mb-6">
      {/* Top Details Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#DBEAFE] text-[#1D4ED8] font-bold text-base flex items-center justify-center shrink-0">
            {patient.initials}
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
              EDITING PATIENT PROFILE
            </span>
            <h2 className="text-lg font-bold text-slate-900 leading-tight">
              {patient.name}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Patient ID: {patient.id} · {patient.age} years ·{" "}
              {patient.bloodGroup} · {patient.status} account
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-slate-500 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              LAST VISIT
            </p>
            <p className="font-semibold text-slate-800 mt-0.5">
              {patient.lastVisit}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              LAST UPDATED
            </p>
            <p className="font-semibold text-slate-800 mt-0.5">
              {patient.lastUpdated}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              UPDATED BY
            </p>
            <p className="font-semibold text-slate-800 mt-0.5">
              {patient.updatedBy}
            </p>
          </div>
        </div>
      </div>

      {/* Record Protection Notice */}
      <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg p-3 flex items-center gap-2 text-xs text-[#1E40AF]">
        <ShieldCheck size={16} className="shrink-0 text-[#2563EB]" />
        <span>
          <strong className="font-semibold">Patient record protection:</strong>{" "}
          Changes should be saved through authorized role-based access and
          recorded in the audit log during implementation.
        </span>
      </div>
    </div>
  );
};

export default EditPatientHeaderBanner;

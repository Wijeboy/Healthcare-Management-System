import React from 'react'

const EditDoctorHeaderBanner = ({ doctor }) => {
  return (
    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#BFDBFE]/60 text-[#1D4ED8] flex items-center justify-center font-bold text-base shrink-0">
          {doctor.initials}
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
            EDITING DOCTOR PROFILE
          </span>
          <h2 className="text-base font-bold text-slate-900 leading-tight">
            {doctor.name}
          </h2>
          <p className="text-xs text-slate-500">
            Doctor ID: {doctor.id} · {doctor.department} ·{" "}
            {doctor.accountStatus} account
          </p>
        </div>
      </div>

      <div className="flex items-center gap-8 text-right">
        <div>
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
            LAST UPDATED
          </p>
          <p className="text-xs font-bold text-slate-700 mt-0.5">
            {doctor.lastUpdated}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
            UPDATED BY
          </p>
          <p className="text-xs font-bold text-slate-700 mt-0.5">
            {doctor.updatedBy}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditDoctorHeaderBanner


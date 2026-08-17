import React from 'react'
import { Briefcase } from "lucide-react";

const ProfessionalInfoCard = ({ professional }) => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Professional Information
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Department, qualifications, and credentials
          </p>
        </div>
        <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
          <Briefcase size={16} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-4 text-xs">
        <div>
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-0.5">
            DEPARTMENT
          </p>
          <p className="font-semibold text-slate-800">
            {professional.department}
          </p>
        </div>

        <div>
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-0.5">
            SPECIALIZATION
          </p>
          <p className="font-semibold text-slate-800">
            {professional.specialization}
          </p>
        </div>

        <div>
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-0.5">
            QUALIFICATION
          </p>
          <p className="font-semibold text-slate-800">
            {professional.qualification}
          </p>
        </div>

        <div>
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-0.5">
            MEDICAL LICENCE
          </p>
          <p className="font-semibold text-slate-800">
            {professional.licenceNumber}
          </p>
        </div>

        <div>
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-0.5">
            YEARS OF EXPERIENCE
          </p>
          <p className="font-semibold text-slate-800">
            {professional.experience}
          </p>
        </div>

        <div>
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-0.5">
            CONSULTATION DURATION
          </p>
          <p className="font-semibold text-slate-800">
            {professional.consultationDuration}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalInfoCard


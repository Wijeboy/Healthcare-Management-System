import React from 'react'
import { User } from "lucide-react";

const PersonalInfoCard = ({ personal }) => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Personal Information
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Identity and contact details
          </p>
        </div>
        <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
          <User size={16} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-4 text-xs">
        <div>
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-0.5">
            FULL NAME
          </p>
          <p className="font-semibold text-slate-800">{personal.fullName}</p>
        </div>

        <div>
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-0.5">
            DATE OF BIRTH
          </p>
          <p className="font-semibold text-slate-800">{personal.dob}</p>
        </div>

        <div>
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-0.5">
            GENDER
          </p>
          <p className="font-semibold text-slate-800">{personal.gender}</p>
        </div>

        <div>
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-0.5">
            EMAIL ADDRESS
          </p>
          <p className="font-semibold text-slate-800">{personal.email}</p>
        </div>

        <div>
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-0.5">
            PHONE NUMBER
          </p>
          <p className="font-semibold text-slate-800">{personal.phone}</p>
        </div>

        <div className="col-span-2 mt-1">
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-0.5">
            ADDRESS
          </p>
          <p className="font-semibold text-slate-800">{personal.address}</p>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoCard
import React from "react";
import { User } from "lucide-react";

const PersonalInfoCard = ({ personal }) => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-bold text-slate-900 leading-tight">
            Personal Information
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Identity and demographic details
          </p>
        </div>
        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          <User size={16} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-4 text-xs">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            FULL NAME
          </p>
          <p className="font-semibold text-slate-800 mt-1">
            {personal.fullName}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            DATE OF BIRTH
          </p>
          <p className="font-semibold text-slate-800 mt-1">{personal.dob}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            AGE
          </p>
          <p className="font-semibold text-slate-800 mt-1">
            {personal.age} Years
          </p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            GENDER
          </p>
          <p className="font-semibold text-slate-800 mt-1">{personal.gender}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            BLOOD GROUP
          </p>
          <span className="inline-block mt-1 px-1.5 py-0.5 bg-rose-100 text-rose-700 font-bold text-[10px] rounded">
            {personal.bloodGroup}
          </span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            PATIENT ID
          </p>
          <p className="font-semibold text-slate-800 mt-1">
            {personal.patientId}
          </p>
        </div>
        <div className="col-span-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            ADDRESS
          </p>
          <p className="font-semibold text-slate-800 mt-1">
            {personal.address}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoCard;



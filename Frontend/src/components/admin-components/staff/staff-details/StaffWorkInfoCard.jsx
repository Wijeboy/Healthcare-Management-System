import React from "react";
import { Briefcase } from "lucide-react";

const StaffWorkInfoCard = ({ work }) => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Work Information
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Department, role, and scheduling information
          </p>
        </div>
        <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
          <Briefcase size={16} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-4 text-xs">
        <div>
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
            DEPARTMENT
          </p>
          <p className="font-semibold text-slate-800 mt-1">{work.department}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
            ROLE
          </p>
          <p className="font-semibold text-slate-800 mt-1">{work.role}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
            STAFF TYPE
          </p>
          <p className="font-semibold text-slate-800 mt-1">
            {work.staffType || "User"}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
            SHIFT
          </p>
          <p className="font-semibold text-slate-800 mt-1">{work.shift}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
            ACCESS LEVEL
          </p>
          <p className="font-semibold text-slate-800 mt-1">
            {work.accessLevel}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
            JOINING DATE
          </p>
          <p className="font-semibold text-slate-800 mt-1">
            {work.joiningDate || "Not set"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StaffWorkInfoCard;

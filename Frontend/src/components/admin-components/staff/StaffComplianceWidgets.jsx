import React from "react";

const StaffComplianceWidgets = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Record Integrity Card */}
      <div className="col-span-2 bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm flex items-center justify-between gap-4 relative overflow-hidden">
        <div className="max-w-xl z-10">
          <p className="text-xs font-bold text-slate-800 leading-tight">
            Data integrity verified for access control logs.
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Role-based access should be protected.
          </p>
        </div>
        <button className="px-3 py-1.5 border border-[#CBD5E1] bg-white text-slate-700 font-bold text-xs rounded-lg hover:bg-slate-50 transition shrink-0 z-10 cursor-pointer">
          View Role Logs
        </button>
      </div>

      {/* Data Privacy Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm relative overflow-hidden">
        <p className="text-xs font-bold text-slate-800 leading-tight">
          Data Privacy
        </p>
        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
          You are viewing staff information. All access protected through
          role-based permissions. recorded in activity logs.
        </p>
      </div>
    </div>
  );
};

export default StaffComplianceWidgets;




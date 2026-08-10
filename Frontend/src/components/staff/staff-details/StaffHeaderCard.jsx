import React from "react";

const StaffHeaderCard = ({ staff }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#DBEAFE] text-lg font-bold text-[#1D4ED8]">
            {staff.initials}
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Staff Profile
            </p>
            <h2 className="mt-1 text-xl font-bold text-slate-900">
              {staff.name}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {staff.role} · {staff.department}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Staff ID
            </p>
            <p className="mt-1 font-bold text-slate-900">{staff.id}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Status
            </p>
            <p className="mt-1 font-bold text-slate-900">{staff.status}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Last Login
            </p>
            <p className="mt-1 font-bold text-slate-900">{staff.lastLogin}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Access
            </p>
            <p className="mt-1 font-bold text-slate-900">{staff.accessLevel}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffHeaderCard;

import React from "react";

const ReviewSection = ({ formData }) => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-7 h-7 rounded-lg bg-[#2563EB] text-white flex items-center justify-center font-bold text-xs">
          4
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 leading-none">
            Review Summary
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Quick overview of the profile before saving.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Staff ID
          </p>
          <p className="mt-1 font-bold text-slate-900">{formData.staffId}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Department
          </p>
          <p className="mt-1 font-bold text-slate-900">
            {formData.department || "Not selected"}
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Role
          </p>
          <p className="mt-1 font-bold text-slate-900">
            {formData.role || "Not entered"}
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Shift
          </p>
          <p className="mt-1 font-bold text-slate-900">
            {formData.shift || "Not selected"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;



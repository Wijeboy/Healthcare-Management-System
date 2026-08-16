import React from "react";

const FormSectionHeader = ({ formData }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm flex items-center justify-between gap-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Staff Profile Draft
        </p>
        <h2 className="mt-1 text-sm font-semibold text-slate-900">
          {formData.staffId} {formData.fullName ? `· ${formData.fullName}` : ""}
        </h2>
      </div>
      <div className="text-right">
        <p className="text-[11px] font-medium text-slate-500">
          Ready for access setup
        </p>
        <p className="text-xs font-semibold text-emerald-600">
          Structured for staff onboarding
        </p>
      </div>
    </div>
  );
};

export default FormSectionHeader;

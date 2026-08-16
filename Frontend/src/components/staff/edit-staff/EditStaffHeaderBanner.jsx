import React from "react";

const EditStaffHeaderBanner = ({ staff }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
        Editing Staff Profile
      </p>
      <h2 className="mt-1 text-sm font-semibold text-slate-900">
        {staff.staffId} {staff.fullName ? `· ${staff.fullName}` : ""}
      </h2>
    </div>
  );
};

export default EditStaffHeaderBanner;

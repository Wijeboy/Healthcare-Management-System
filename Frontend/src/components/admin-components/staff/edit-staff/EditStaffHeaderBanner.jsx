import React from "react";
import { ShieldCheck } from "lucide-react";

const EditStaffHeaderBanner = ({ staff }) => {
  const name = staff?.fullName || staff?.name || "Staff Member";
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const staffId = staff?.staffId || staff?.id || "—";
  const role = staff?.role || "Staff";
  const department = staff?.department || "";
  const employeeStatus = staff?.employeeStatus || staff?.status || "Active";
  const shift = staff?.shift || "";
  const joiningDate = staff?.joiningDate
    ? new Date(staff.joiningDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";

  return (
    <div className="space-y-3 mb-6">
      {/* Top Details Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-xl bg-[#D1FAE5] text-[#065F46] font-bold text-base flex items-center justify-center shrink-0">
            {initials}
          </div>
          {/* Name & meta */}
          <div>
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
              EDITING STAFF PROFILE
            </span>
            <h2 className="text-lg font-bold text-slate-900 leading-tight">
              {name}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Staff ID: {staffId}
              {role ? ` · ${role}` : ""}
              {department ? ` · ${department}` : ""}
              {employeeStatus ? ` · ${employeeStatus} account` : ""}
            </p>
          </div>
        </div>

        {/* Right side stats */}
        <div className="flex items-center gap-6 text-xs text-slate-500 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
          {shift && (
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                SHIFT
              </p>
              <p className="font-semibold text-slate-800 mt-0.5">{shift}</p>
            </div>
          )}
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              JOINING DATE
            </p>
            <p className="font-semibold text-slate-800 mt-0.5">{joiningDate}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              ACCESS LEVEL
            </p>
            <p className="font-semibold text-slate-800 mt-0.5">
              {staff?.accessLevel || "Standard"}
            </p>
          </div>
        </div>
      </div>

      {/* Record Protection Notice */}
      <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-lg p-3 flex items-center gap-2 text-xs text-[#065F46]">
        <ShieldCheck size={16} className="shrink-0 text-[#16A34A]" />
        <span>
          <strong className="font-semibold">Staff record protection:</strong>{" "}
          Changes should be saved through authorized role-based access and
          recorded in the audit log during implementation.
        </span>
      </div>
    </div>
  );
};

export default EditStaffHeaderBanner;



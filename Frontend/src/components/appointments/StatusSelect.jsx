import React from "react";
import { ChevronDown } from "lucide-react";
import { APPOINTMENT_STATUSES, STATUS_TINT } from "../../constants/statusStyles";

export default function StatusSelect({ status, onChange }) {
  return (
    <div className="relative inline-block">
      <select
        value={status}
        onChange={(e) => onChange(e.target.value)}
        className={`cursor-pointer appearance-none rounded-full border bg-white dark:bg-slate-800 py-1.5 pl-4 pr-8 text-sm font-medium focus:outline-none ${STATUS_TINT[status]}`}
      >
        {APPOINTMENT_STATUSES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 opacity-70" />
    </div>
  );
}

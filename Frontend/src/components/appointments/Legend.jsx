import React from "react";
import { APPOINTMENT_STATUSES, STATUS_BLOCK } from "../../constants/statusStyles";

export default function Legend() {
  return (
    <div className="flex items-center gap-6 border-b border-slate-100 dark:border-slate-700 px-4 py-2.5">
      {APPOINTMENT_STATUSES.map((status) => (
        <div key={status} className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
          <span className={`h-2 w-2 rounded-full ${STATUS_BLOCK[status]}`} />
          {status}
        </div>
      ))}
    </div>
  );
}

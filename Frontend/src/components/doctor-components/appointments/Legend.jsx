import React from "react";
import { STATUS_BLOCK } from "../../../constants/statusStyles";

export default function Legend() {
  return (
    <div className="flex items-center gap-4 border-b border-slate-100 px-4 py-2.5 text-xs text-slate-500">
      {Object.entries(STATUS_BLOCK).map(([status, color]) => (
        <div key={status} className="flex items-center gap-1.5">
          <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
          {status}
        </div>
      ))}
    </div>
  );
}

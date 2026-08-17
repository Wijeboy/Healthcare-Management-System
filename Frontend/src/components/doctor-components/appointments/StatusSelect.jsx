import React from "react";
import { APPOINTMENT_STATUSES, STATUS_TINT } from "../../../constants/statusStyles";

export default function StatusSelect({ status, onChange }) {
  return (
    <select
      value={status}
      onChange={(e) => onChange(e.target.value)}
      className={`cursor-pointer rounded-full border-none px-3 py-1 text-xs font-medium focus:outline-none ring-1 ${STATUS_TINT[status]}`}
    >
      {APPOINTMENT_STATUSES.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}

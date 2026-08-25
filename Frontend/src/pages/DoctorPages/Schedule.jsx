import React from "react";
import { useAvailability } from "../../hooks/useAvailability";
import { AVAILABILITY_DAYS, AVAILABILITY_HOURS, AVAILABILITY_STATUSES, AVAILABILITY_TINT } from "../../data/doctor/mockAvailability";
import { formatHour } from "../../services/doctorApi";

function nextStatus(current) {
  const idx = AVAILABILITY_STATUSES.indexOf(current);
  return AVAILABILITY_STATUSES[(idx + 1) % AVAILABILITY_STATUSES.length];
}

export default function DoctorSchedulePage() {
  const { loading, statusFor, setSlotStatus } = useAvailability();

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold text-on-surface">Schedule &amp; Availability</h2>
      <p className="mt-1 text-sm text-on-surface-variant">Click any time slot to cycle it between Available, Booked, and Blocked.</p>

      <div className="mt-5 mb-4 flex items-center gap-5 rounded-xl border border-outline-variant bg-white px-4 py-3">
        {AVAILABILITY_STATUSES.map((s) => (
          <div key={s} className="flex items-center gap-1.5 text-sm text-on-surface-variant">
            <span className={`h-2.5 w-2.5 rounded-full ring-1 ${AVAILABILITY_TINT[s]}`} /> {s}
          </div>
        ))}
      </div>

      {loading ? (
        <p className="text-sm text-on-surface-variant">Loading schedule\u2026</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-outline-variant bg-white">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="w-24 border-b border-r border-outline-variant bg-white" />
                {AVAILABILITY_DAYS.map((day) => (
                  <th key={day} className="border-b border-r border-outline-variant bg-white py-3 text-center text-sm font-medium text-on-surface-variant last:border-r-0">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {AVAILABILITY_HOURS.map((hour) => (
                <tr key={hour}>
                  <td className="w-24 border-r border-b border-outline-variant px-3 py-3 text-sm font-medium text-on-surface-variant">{formatHour(hour)}</td>
                  {AVAILABILITY_DAYS.map((day) => {
                    const status = statusFor(day, hour);
                    return (
                      <td key={day} className="border-r border-b border-outline-variant p-2 text-center last:border-r-0">
                        <button onClick={() => setSlotStatus(day, hour, nextStatus(status))} className={`w-full rounded-lg py-2 text-xs font-medium ring-1 transition hover:opacity-80 ${AVAILABILITY_TINT[status]}`}>
                          {status}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

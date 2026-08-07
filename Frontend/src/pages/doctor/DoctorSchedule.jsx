import React from "react";
import DoctorSidebar from "../../components/layout/DoctorSidebar";
import Topbar from "../../components/layout/Topbar";
import Footer from "../../components/layout/Footer";
import { useAvailability } from "../../hooks/useAvailability";
import { AVAILABILITY_DAYS, AVAILABILITY_HOURS, AVAILABILITY_STATUSES, AVAILABILITY_TINT } from "../../data/mockAvailability";
import { formatHour } from "../../data/mockAppointments";

function nextStatus(current) {
  const idx = AVAILABILITY_STATUSES.indexOf(current);
  return AVAILABILITY_STATUSES[(idx + 1) % AVAILABILITY_STATUSES.length];
}

export default function DoctorSchedule() {
  const { loading, statusFor, setSlotStatus } = useAvailability();

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      <DoctorSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar title="Schedule &amp; Availability" />

        <div className="flex-1 overflow-y-auto p-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">Schedule &amp; Availability</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Click any time slot to cycle it between Available, Booked, and Blocked.
          </p>

          <div className="mt-5 mb-4 flex items-center gap-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3">
            {AVAILABILITY_STATUSES.map((s) => (
              <div key={s} className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
                <span className={`h-2.5 w-2.5 rounded-full ring-1 ${AVAILABILITY_TINT[s]}`} />
                {s}
              </div>
            ))}
          </div>

          {loading ? (
            <p className="text-sm text-slate-400 dark:text-slate-500">Loading schedule…</p>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="w-24 border-b border-r border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800" />
                    {AVAILABILITY_DAYS.map((day) => (
                      <th key={day} className="border-b border-r border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 py-3 text-center text-sm font-medium text-slate-500 dark:text-slate-300 last:border-r-0">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {AVAILABILITY_HOURS.map((hour) => (
                    <tr key={hour}>
                      <td className="w-24 border-r border-b border-slate-100 dark:border-slate-700 px-3 py-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                        {formatHour(hour)}
                      </td>
                      {AVAILABILITY_DAYS.map((day) => {
                        const status = statusFor(day, hour);
                        return (
                          <td key={day} className="border-r border-b border-slate-100 dark:border-slate-700 p-2 text-center last:border-r-0">
                            <button
                              onClick={() => setSlotStatus(day, hour, nextStatus(status))}
                              className={`w-full rounded-lg py-2 text-xs font-medium ring-1 transition hover:opacity-80 ${AVAILABILITY_TINT[status]}`}
                            >
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

        <Footer />
      </div>
    </div>
  );
}

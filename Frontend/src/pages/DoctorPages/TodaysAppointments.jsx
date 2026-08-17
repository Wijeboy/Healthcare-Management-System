import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Users } from "lucide-react";
import Avatar from "../../components/common/Avatar";
import StatusSelect from "../../components/doctor-components/appointments/StatusSelect";
import { useAppointments } from "../../hooks/useAppointments";
import { CURRENT_DOCTOR_NAME } from "../../services/doctorApi";
import { formatLongDate } from "../../utils/date";

const TODAY = { year: 2026, month: 9, day: 25 };

export default function TodaysAppointmentsPage() {
  const navigate = useNavigate();
  const { allAppointments, setStatus } = useAppointments();

  const todaysAppointments = useMemo(
    () => allAppointments
      .filter((a) => a.doctor === CURRENT_DOCTOR_NAME)
      .filter((a) => a.year === TODAY.year && a.month === TODAY.month && a.day === TODAY.day)
      .sort((a, b) => a.hour - b.hour),
    [allAppointments]
  );

  const dateLabel = formatLongDate(TODAY.year, TODAY.month, TODAY.day);

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold text-on-surface">Today's Appointments</h2>
      <p className="mt-1 text-sm text-on-surface-variant">{dateLabel} \u00b7 {CURRENT_DOCTOR_NAME}</p>

      <div className="mt-5 rounded-2xl border border-outline-variant bg-white">
        {todaysAppointments.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
            <Users size={28} className="text-slate-300" />
            <p className="text-sm text-on-surface-variant">No appointments scheduled for today.</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant">
                <th className="px-6 py-4 text-xs font-medium tracking-wide text-on-surface-variant">TIME</th>
                <th className="px-4 py-4 text-xs font-medium tracking-wide text-on-surface-variant">PATIENT</th>
                <th className="px-4 py-4 text-xs font-medium tracking-wide text-on-surface-variant">DEPARTMENT</th>
                <th className="px-4 py-4 text-xs font-medium tracking-wide text-on-surface-variant">REASON / NOTES</th>
                <th className="px-4 py-4 text-xs font-medium tracking-wide text-on-surface-variant">STATUS</th>
                <th className="px-6 py-4 text-right text-xs font-medium tracking-wide text-on-surface-variant">VIEW</th>
              </tr>
            </thead>
            <tbody>
              {todaysAppointments.map((a, i) => (
                <tr key={a.id} className={i !== todaysAppointments.length - 1 ? "border-b border-slate-50" : ""}>
                  <td className="px-6 py-4 text-sm font-semibold text-on-surface">{a.time}</td>
                  <td className="px-4 py-4">
                    <button onClick={() => navigate(`/doctor/patients/${a.patientId}`)} className="flex items-center gap-2.5 text-left hover:underline">
                      <Avatar name={a.patient} tint="bg-indigo-100 text-indigo-600" />
                      <span className="font-medium text-on-surface">{a.patient}</span>
                    </button>
                  </td>
                  <td className="px-4 py-4 text-sm text-on-surface-variant">{a.department}</td>
                  <td className="max-w-xs truncate px-4 py-4 text-sm text-on-surface-variant">{a.notes}</td>
                  <td className="px-4 py-4"><StatusSelect status={a.status} onChange={(status) => setStatus(a.id, status)} /></td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => navigate(`/doctor/appointments/${a.id}`)} className="rounded-lg p-1.5 text-on-surface-variant hover:bg-slate-50"><Eye size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

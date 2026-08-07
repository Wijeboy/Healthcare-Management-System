import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Users } from "lucide-react";
import DoctorSidebar from "../../components/layout/DoctorSidebar";
import Topbar from "../../components/layout/Topbar";
import Footer from "../../components/layout/Footer";
import Avatar from "../../components/common/Avatar";
import StatusSelect from "../../components/appointments/StatusSelect";
import { useAppointments } from "../../hooks/useAppointments";
import { CURRENT_DOCTOR_NAME } from "../../data/mockDoctorProfile";
import { formatLongDate } from "../../utils/date";

const TODAY = { year: 2026, month: 9, day: 25 };

export default function TodaysAppointments() {
  const navigate = useNavigate();
  const { allAppointments, setStatus } = useAppointments();

  const todaysAppointments = useMemo(
    () =>
      allAppointments
        .filter((a) => a.doctor === CURRENT_DOCTOR_NAME)
        .filter((a) => a.year === TODAY.year && a.month === TODAY.month && a.day === TODAY.day)
        .sort((a, b) => a.hour - b.hour),
    [allAppointments]
  );

  const dateLabel = formatLongDate(TODAY.year, TODAY.month, TODAY.day);

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      <DoctorSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar title="Today's Appointments" />

        <div className="flex-1 overflow-y-auto p-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">Today's Appointments</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{dateLabel} · {CURRENT_DOCTOR_NAME}</p>

          <div className="mt-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            {todaysAppointments.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
                <Users size={28} className="text-slate-300 dark:text-slate-600" />
                <p className="text-sm text-slate-400 dark:text-slate-500">No appointments scheduled for today.</p>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-700">
                    <th className="px-6 py-4 text-xs font-medium tracking-wide text-slate-400 dark:text-slate-500">TIME</th>
                    <th className="px-4 py-4 text-xs font-medium tracking-wide text-slate-400 dark:text-slate-500">PATIENT</th>
                    <th className="px-4 py-4 text-xs font-medium tracking-wide text-slate-400 dark:text-slate-500">DEPARTMENT</th>
                    <th className="px-4 py-4 text-xs font-medium tracking-wide text-slate-400 dark:text-slate-500">REASON / NOTES</th>
                    <th className="px-4 py-4 text-xs font-medium tracking-wide text-slate-400 dark:text-slate-500">STATUS</th>
                    <th className="px-6 py-4 text-right text-xs font-medium tracking-wide text-slate-400 dark:text-slate-500">VIEW</th>
                  </tr>
                </thead>
                <tbody>
                  {todaysAppointments.map((a, i) => (
                    <tr key={a.id} className={i !== todaysAppointments.length - 1 ? "border-b border-slate-50 dark:border-slate-700" : ""}>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-700 dark:text-slate-200">{a.time}</td>
                      <td className="px-4 py-4">
                        <button onClick={() => navigate(`/doctor/patients/${a.patientId}`)} className="flex items-center gap-2.5 text-left hover:underline">
                          <Avatar name={a.patient} tint="bg-indigo-100 text-indigo-600" />
                          <span className="font-medium text-slate-800 dark:text-slate-100">{a.patient}</span>
                        </button>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-300">{a.department}</td>
                      <td className="px-4 py-4 max-w-xs truncate text-sm text-slate-500 dark:text-slate-400">{a.notes}</td>
                      <td className="px-4 py-4">
                        <StatusSelect status={a.status} onChange={(status) => setStatus(a.id, status)} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => navigate(`/doctor/appointments/${a.id}`)}
                          className="rounded-lg p-1.5 text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700"
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays, Users, FileWarning, Plus, ChevronRight, Sparkles,
} from "lucide-react";
import DoctorSidebar from "../../components/layout/DoctorSidebar";
import Topbar from "../../components/layout/Topbar";
import Footer from "../../components/layout/Footer";
import Avatar from "../../components/common/Avatar";
import { useAppointments } from "../../hooks/useAppointments";
import { useRecords } from "../../hooks/useRecords";
import { CURRENT_DOCTOR_NAME } from "../../data/mockDoctorProfile";
import { formatLongDate } from "../../utils/date";
import { PATIENTS } from "../../data/mockAppointments";

const TODAY = { year: 2026, month: 9, day: 25 };

const STATUS_DOT = {
  Completed: "bg-emerald-500",
  Scheduled: "bg-slate-400 dark:bg-slate-500",
  Pending: "bg-amber-500",
  Canceled: "bg-rose-500",
};

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const { allAppointments } = useAppointments();
  const { records } = useRecords();

  const myAppointments = useMemo(
    () => allAppointments.filter((a) => a.doctor === CURRENT_DOCTOR_NAME),
    [allAppointments]
  );
  const todaysAppointments = useMemo(
    () =>
      myAppointments
        .filter((a) => a.year === TODAY.year && a.month === TODAY.month && a.day === TODAY.day)
        .sort((a, b) => a.hour - b.hour),
    [myAppointments]
  );
  const pendingReports = useMemo(() => records.filter((r) => r.result === "Abnormal").length, [records]);
  const recentReports = useMemo(() => records.slice(0, 3), [records]);

  const dateLabel = formatLongDate(TODAY.year, TODAY.month, TODAY.day);

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      <DoctorSidebar doctorName={CURRENT_DOCTOR_NAME} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar title="Doctor" />

        <div className="flex-1 overflow-y-auto p-8">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400">Dashboard</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Welcome back, {CURRENT_DOCTOR_NAME}. Here's your overview for today.
              </p>
            </div>
            <button
              onClick={() => navigate("/appointments/new")}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <Plus size={16} /> New Appointment
            </button>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600"><CalendarDays size={18} /></div>
              <div>
                <p className="text-xs text-slate-400 dark:text-slate-500">Today's Appointments</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">{todaysAppointments.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600"><Users size={18} /></div>
              <div>
                <p className="text-xs text-slate-400 dark:text-slate-500">Total Patients Treated</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">{PATIENTS.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600"><FileWarning size={18} /></div>
              <div>
                <p className="text-xs text-slate-400 dark:text-slate-500">Pending Reports</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">{pendingReports}</p>
              </div>
            </div>
          </div>

          {/* Today's schedule */}
          <div className="mt-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 px-6 py-4">
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Today's Schedule</h3>
              <span className="text-xs text-slate-400 dark:text-slate-500">{dateLabel}</span>
            </div>

            {todaysAppointments.length === 0 ? (
              <p className="px-6 py-10 text-center text-sm text-slate-400 dark:text-slate-500">No appointments scheduled for today.</p>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-700">
                    <th className="px-6 py-3 text-xs font-medium tracking-wide text-slate-400 dark:text-slate-500">TIME SLOT</th>
                    <th className="px-4 py-3 text-xs font-medium tracking-wide text-slate-400 dark:text-slate-500">PATIENT NAME</th>
                    <th className="px-4 py-3 text-xs font-medium tracking-wide text-slate-400 dark:text-slate-500">REASON FOR VISIT</th>
                    <th className="px-4 py-3 text-xs font-medium tracking-wide text-slate-400 dark:text-slate-500">STATUS</th>
                    <th className="px-6 py-3 text-right text-xs font-medium tracking-wide text-slate-400 dark:text-slate-500">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {todaysAppointments.map((a, i) => (
                    <tr key={a.id} className={i !== todaysAppointments.length - 1 ? "border-b border-slate-50 dark:border-slate-700" : ""}>
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-blue-600">{a.time}</p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2.5">
                          <Avatar name={a.patient} size="h-8 w-8" tint="bg-indigo-100 text-indigo-600" />
                          <span className="text-sm font-medium text-slate-800 dark:text-slate-100">{a.patient}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-block rounded-full bg-slate-100 dark:bg-slate-700 px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-300">
                          {a.notes}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                          <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[a.status]}`} /> {a.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => navigate(`/doctor/appointments/${a.id}`)}
                            className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
                          >
                            Consult Now
                          </button>
                          <button
                            onClick={() => navigate(`/doctor/patients/${a.patientId}`)}
                            className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                          >
                            View History
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <div className="border-t border-slate-100 dark:border-slate-700 py-3 text-center">
              <button onClick={() => navigate("/doctor/appointments/today")} className="text-xs font-medium text-blue-600 hover:underline">
                View All Appointments
              </button>
            </div>
          </div>

          {/* Bottom row */}
          <div className="mt-6 grid grid-cols-2 gap-6">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Recent Patient Reports</h3>
              </div>
              <div className="space-y-2">
                {recentReports.length === 0 && <p className="text-xs text-slate-400 dark:text-slate-500">No recent reports.</p>}
                {recentReports.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => navigate(`/doctor/patients/${r.patientId}`)}
                    className="flex w-full items-center justify-between rounded-xl border border-slate-100 dark:border-slate-700 px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-700"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{r.reportName} — {r.patient}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">Uploaded · {r.date}</p>
                    </div>
                    <ChevronRight size={16} className="text-slate-300 dark:text-slate-600" />
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
              <h3 className="mb-4 text-sm font-semibold text-slate-800 dark:text-slate-100">Quick Insights</h3>
              <div className="flex flex-col items-center justify-center gap-2 rounded-xl bg-slate-50 dark:bg-slate-900 py-10 text-center">
                <Sparkles size={22} className="text-slate-300 dark:text-slate-600" />
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">AI Analysis in Progress</p>
                <p className="max-w-xs text-xs text-slate-400 dark:text-slate-500">
                  We're currently analyzing patient data trends for your department. A summary will be available shortly.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

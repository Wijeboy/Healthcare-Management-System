import React from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, Users, FileWarning, Plus, ChevronRight, Sparkles } from "lucide-react";
import Avatar from "../../components/common/Avatar";
import { formatLongDate } from "../../utils/date";

const STATUS_DOT = {
  Completed: "bg-emerald-500",
  Scheduled: "bg-slate-400",
  Pending: "bg-amber-500",
  Canceled: "bg-rose-500",
};

export default function DoctorDashboardPage({ doctorName, totalPatients, pendingReports, todaysAppointments, recentReports, today }) {
  const navigate = useNavigate();
  const dateLabel = formatLongDate(today.year, today.month, today.day);

  return (
    <div className="p-8">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-primary">Dashboard</h2>
          <p className="mt-1 text-sm text-on-surface-variant">Welcome back, {doctorName}. Here's your overview for today.</p>
        </div>
        <button onClick={() => navigate("/doctor/appointments/new")} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary hover:bg-primary-container">
          <Plus size={16} /> New Appointment
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center gap-3 rounded-2xl border border-outline-variant bg-white p-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><CalendarDays size={18} /></div>
          <div>
            <p className="text-xs text-on-surface-variant">Today's Appointments</p>
            <p className="text-2xl font-bold text-on-surface">{todaysAppointments.length}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-outline-variant bg-white p-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"><Users size={18} /></div>
          <div>
            <p className="text-xs text-on-surface-variant">Total Patients</p>
            <p className="text-2xl font-bold text-on-surface">{totalPatients}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-outline-variant bg-white p-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600"><FileWarning size={18} /></div>
          <div>
            <p className="text-xs text-on-surface-variant">Pending Reports</p>
            <p className="text-2xl font-bold text-on-surface">{pendingReports}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-outline-variant bg-white">
        <div className="flex items-center justify-between border-b border-outline-variant px-6 py-4">
          <h3 className="text-sm font-semibold text-on-surface">Today's Schedule</h3>
          <span className="text-xs text-on-surface-variant">{dateLabel}</span>
        </div>

        {todaysAppointments.length === 0 ? (
          <p className="px-6 py-10 text-center text-sm text-on-surface-variant">No appointments scheduled for today.</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant">
                <th className="px-6 py-3 text-xs font-medium tracking-wide text-on-surface-variant">TIME SLOT</th>
                <th className="px-4 py-3 text-xs font-medium tracking-wide text-on-surface-variant">PATIENT NAME</th>
                <th className="px-4 py-3 text-xs font-medium tracking-wide text-on-surface-variant">REASON FOR VISIT</th>
                <th className="px-4 py-3 text-xs font-medium tracking-wide text-on-surface-variant">STATUS</th>
                <th className="px-6 py-3 text-right text-xs font-medium tracking-wide text-on-surface-variant">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {todaysAppointments.map((a, i) => (
                <tr key={a.id} className={i !== todaysAppointments.length - 1 ? "border-b border-slate-50" : ""}>
                  <td className="px-6 py-4"><p className="text-sm font-semibold text-primary">{a.time}</p></td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={a.patient} tint="bg-indigo-100 text-indigo-600" />
                      <span className="text-sm font-medium text-on-surface">{a.patient}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">{a.notes}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-on-surface-variant">
                      <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[a.status]}`} /> {a.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => navigate(`/doctor/appointments/${a.id}`)} className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-on-primary hover:bg-primary-container">
                        Consult Now
                      </button>
                      <button onClick={() => navigate(`/doctor/patients/${a.patientId}`)} className="rounded-lg border border-outline-variant bg-white px-3 py-1.5 text-xs font-medium text-on-surface-variant hover:bg-slate-50">
                        View History
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="border-t border-outline-variant py-3 text-center">
          <button onClick={() => navigate("/doctor/appointments/today")} className="text-xs font-medium text-primary hover:underline">
            View All Appointments
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-6">
        <div className="rounded-2xl border border-outline-variant bg-white p-6">
          <h3 className="mb-4 text-sm font-semibold text-on-surface">Recent Patient Reports</h3>
          <div className="space-y-2">
            {recentReports.length === 0 && <p className="text-xs text-on-surface-variant">No recent reports.</p>}
            {recentReports.map((r) => (
              <button key={r.id} onClick={() => navigate(`/doctor/patients/${r.patientId}`)} className="flex w-full items-center justify-between rounded-xl border border-slate-100 px-4 py-3 text-left hover:bg-slate-50">
                <div>
                  <p className="text-sm font-medium text-on-surface">{r.reportName} — {r.patient}</p>
                  <p className="text-xs text-on-surface-variant">Uploaded · {r.date}</p>
                </div>
                <ChevronRight size={16} className="text-slate-300" />
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-outline-variant bg-white p-6">
          <h3 className="mb-4 text-sm font-semibold text-on-surface">Quick Insights</h3>
          <div className="flex flex-col items-center justify-center gap-2 rounded-xl bg-slate-50 py-10 text-center">
            <Sparkles size={22} className="text-slate-300" />
            <p className="text-sm font-medium text-on-surface-variant">AI Analysis in Progress</p>
            <p className="max-w-xs text-xs text-on-surface-variant">We're currently analyzing patient data trends for your department. A summary will be available shortly.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ListFilter, Plus, CheckCheck, FileWarning, Pill, CalendarPlus, User,
  CheckCircle2, Clock, Bell,
} from "lucide-react";
import DoctorSidebar from "../../components/layout/DoctorSidebar";
import Topbar from "../../components/layout/Topbar";
import Footer from "../../components/layout/Footer";
import { useNotifications } from "../../hooks/useNotifications";
import { NOTIFICATION_GROUPS, BADGE_TINT } from "../../data/mockNotifications";

const ICON_MAP = {
  "file-warning": FileWarning,
  pill: Pill,
  "calendar-plus": CalendarPlus,
  user: User,
  "check-circle-2": CheckCircle2,
  clock: Clock,
};

export default function ClinicalNotifications() {
  const navigate = useNavigate();
  const { groupedFiltered, loading, groupFilter, setGroupFilter, unreadCount, markRead, markAllRead } = useNotifications();

  function handleCardClick(n) {
    if (!n.read) markRead(n.id);
  }

  function handleActionClick(e, n, action) {
    e.stopPropagation();
    if (!n.read) markRead(n.id);
    if (n.patientId) navigate(`/doctor/patients/${n.patientId}`);
  }

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      <DoctorSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar title="Doctor" />

        <div className="flex-1 overflow-y-auto p-8">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400">Doctor Clinical Notifications</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">A unified feed of priority clinical actions for your attention.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <select
                  value={groupFilter}
                  onChange={(e) => setGroupFilter(e.target.value)}
                  className="appearance-none rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2 pl-3 pr-8 text-sm font-medium text-slate-600 dark:text-slate-300 focus:outline-none"
                >
                  <option value="All">All</option>
                  {NOTIFICATION_GROUPS.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
                <ListFilter size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
              {unreadCount > 0 && (
                <button onClick={markAllRead} className="flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">
                  <CheckCheck size={15} /> Mark all read
                </button>
              )}
              <button onClick={() => navigate("/prescriptions/new")} className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                <Plus size={15} /> Create Prescription
              </button>
            </div>
          </div>

          {loading && <p className="text-sm text-slate-400 dark:text-slate-500">Loading notifications…</p>}

          {!loading && Object.keys(groupedFiltered).length === 0 && (
            <p className="text-sm text-slate-400 dark:text-slate-500">No notifications in this category.</p>
          )}

          {!loading && NOTIFICATION_GROUPS.filter((g) => groupedFiltered[g]?.length).map((group) => (
            <div key={group} className="mb-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">{group}</p>
              <div className="space-y-3">
                {groupedFiltered[group].map((n) => {
                  const Icon = ICON_MAP[n.icon] || Bell;
                  return (
                    <div
                      key={n.id}
                      onClick={() => handleCardClick(n)}
                      className={`cursor-pointer rounded-2xl border p-4 transition ${
                        n.read
                          ? "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                          : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 ring-1 ring-blue-100 dark:ring-blue-900"
                      }`}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${BADGE_TINT[n.badgeTint]}`}>
                            <Icon size={14} />
                          </span>
                          <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${BADGE_TINT[n.badgeTint]}`}>
                            {n.badge}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400 dark:text-slate-500">{n.time}</span>
                      </div>

                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{n.title}</p>

                      {n.detail && (
                        <div className="mt-2 flex flex-wrap gap-x-8 gap-y-1 rounded-lg bg-slate-50 dark:bg-slate-900 px-3 py-2">
                          {n.detail.map((d) => (
                            <div key={d.label}>
                              <p className="text-[10px] uppercase text-slate-400 dark:text-slate-500">{d.label}</p>
                              <p className="text-xs font-medium text-slate-700 dark:text-slate-200">{d.value}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {n.description && (
                        <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">{n.description}</p>
                      )}

                      {n.actions.length > 0 && (
                        <div className="mt-3 flex items-center gap-4">
                          {n.actions.map((a) =>
                            a.link ? (
                              <button
                                key={a.label}
                                onClick={(e) => handleActionClick(e, n, a)}
                                className={`text-xs font-semibold hover:underline ${a.primary ? "text-blue-600" : "text-slate-500 dark:text-slate-400"}`}
                              >
                                {a.label}
                              </button>
                            ) : (
                              <button
                                key={a.label}
                                onClick={(e) => handleActionClick(e, n, a)}
                                className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                                  a.primary
                                    ? "bg-blue-600 text-white hover:bg-blue-700"
                                    : "border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                                }`}
                              >
                                {a.label}
                              </button>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <Footer />
      </div>
    </div>
  );
}

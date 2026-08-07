import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutGrid, CalendarClock, CalendarRange, FileText, Pill, Bell, UserCog, LogOut, Stethoscope,
} from "lucide-react";
import { fetchNotifications } from "../../api/doctorApi";

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutGrid, href: "/doctor" },
  { key: "today", label: "Today's Appointments", icon: CalendarClock, href: "/doctor/appointments/today" },
  { key: "schedule", label: "Schedule & Availability", icon: CalendarRange, href: "/doctor/schedule" },
  { key: "records", label: "Records", icon: FileText, href: "/records" },
  { key: "prescriptions", label: "Prescriptions", icon: Pill, href: "/prescriptions" },
  { key: "notifications", label: "Clinical Notifications", icon: Bell, href: "/doctor/notifications" },
];

export default function DoctorSidebar({ doctorName = "Dr. Nimal Perera" }) {
  const { pathname } = useLocation();
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    fetchNotifications().then((data) => setUnread(data.filter((n) => !n.read).length));
  }, [pathname]);

  function isActive(href) {
    return pathname === href || (href !== "/doctor" && pathname.startsWith(href));
  }

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
          <Stethoscope size={16} />
        </div>
        <span className="text-base font-bold text-blue-700 dark:text-blue-400">Medimate Healthcare</span>
      </div>

      <Link to="/doctor/profile" className="mx-4 mb-4 flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-3 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600 dark:bg-blue-900 dark:text-blue-200">
          NP
        </div>
        <div className="min-w-0">
          <p className="text-[11px] text-slate-400 dark:text-slate-500">Doctor Portal</p>
          <p className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">{doctorName}</p>
        </div>
      </Link>

      <nav className="flex-1 space-y-1 px-3">
        {NAV_ITEMS.map(({ key, label, icon: Icon, href }) => (
          <Link
            key={key}
            to={href}
            className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              isActive(href)
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
            }`}
          >
            <span className="flex items-center gap-3">
              <Icon size={16} />
              {label}
            </span>
            {key === "notifications" && unread > 0 && (
              <span className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-semibold ${
                isActive(href) ? "bg-white text-blue-600" : "bg-rose-500 text-white"
              }`}>
                {unread}
              </span>
            )}
          </Link>
        ))}
      </nav>

      <div className="space-y-1 px-3 pb-5">
        <Link
          to="/doctor/profile"
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
            isActive("/doctor/profile")
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
          }`}
        >
          <UserCog size={16} /> My Profile
        </Link>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950">
          <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  );
}

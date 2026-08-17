import React from "react";
import {
  BellRing,
  CalendarDays,
  Globe,
  LockKeyhole,
  MonitorCog,
  ServerCog,
  Smartphone,
} from "lucide-react";
import ToggleSwitch from "./ToggleSwitch";

const settings = [
  {
    icon: Globe,
    title: "Hospital timezone",
    description: "Set the default timezone used for appointments, reports, and logs.",
    value: "Asia/Colombo",
  },
  {
    icon: CalendarDays,
    title: "Date and time format",
    description: "Standardize how dates are displayed across the admin portal.",
    value: "DD/MM/YYYY | 24-hour",
  },
  {
    icon: BellRing,
    title: "Alert channels",
    description: "Choose how system alerts and reminders are delivered to staff.",
    value: "Email + In-app notifications",
  },
  {
    icon: Smartphone,
    title: "Mobile access",
    description: "Allow staff to view operational updates from mobile devices.",
    value: "Enabled",
  },
  {
    icon: LockKeyhole,
    title: "Session timeout",
    description: "Automatically sign out inactive users for better security.",
    value: "30 minutes",
  },
  {
    icon: MonitorCog,
    title: "Maintenance mode",
    description: "Temporarily pause non-essential portal features during updates.",
    value: "Disabled",
  },
  {
    icon: ServerCog,
    title: "Data backup",
    description: "Run secure backups for patient, staff, and financial records.",
    value: "Daily at 1:00 AM",
  },
];

const GeneralSettingsPanel = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">General System Settings</h2>
          <p className="text-xs text-slate-500 mt-1">
            Configure defaults for scheduling, notifications, access, and backups.
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              System status
            </p>
            <p className="text-sm font-semibold text-slate-900">Operational</p>
          </div>
          <ToggleSwitch checked={true} onChange={() => {}} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {settings.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#1E3A8A] shadow-sm">
                  <Icon size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-xs leading-6 text-slate-500">
                    {item.description}
                  </p>
                  <div className="mt-3 inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                    {item.value}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Backup location
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-900">
            Encrypted cloud storage
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Patient, staff, and billing data are backed up automatically.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Default locale
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-900">
            Sri Lanka medical portal format
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Used across appointments, reports, and audit logs.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Access policy
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-900">
            Role-based permissions
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Users only see the modules assigned to their role.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettingsPanel;

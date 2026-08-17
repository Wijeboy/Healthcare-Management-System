import React from "react";
import { Clock3, FileCheck2, ShieldAlert, UserCog } from "lucide-react";

const logs = [
  {
    time: "08:42 AM",
    title: "Role permission updated",
    description: "Admin privileges adjusted for inventory access.",
    icon: ShieldAlert,
  },
  {
    time: "09:10 AM",
    title: "User login verified",
    description: "Successful sign-in from Colombo HQ workstation.",
    icon: UserCog,
  },
  {
    time: "10:05 AM",
    title: "Security policy saved",
    description: "Session timeout and password policy were refreshed.",
    icon: FileCheck2,
  },
  {
    time: "11:18 AM",
    title: "Audit export generated",
    description: "Monthly compliance export prepared for review.",
    icon: Clock3,
  },
];

const AuditLogsPanel = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Audit Logs</h2>
          <p className="text-xs text-slate-500 mt-1">
            Recent security and configuration activity.
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          Today
        </span>
      </div>

      <div className="mt-6 space-y-4">
        {logs.map((log) => {
          const Icon = log.icon;
          return (
            <div
              key={log.title}
              className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#1E3A8A] shadow-sm">
                <Icon size={18} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-bold text-slate-900">{log.title}</p>
                  <span className="text-xs font-semibold text-slate-400">
                    {log.time}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-6 text-slate-500">
                  {log.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AuditLogsPanel;

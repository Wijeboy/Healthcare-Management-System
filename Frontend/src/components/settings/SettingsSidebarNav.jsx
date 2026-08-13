import React from "react";
import { Settings, ShieldCheck, History } from "lucide-react";

const navItems = [
  { id: "general", label: "General", icon: Settings },
  { id: "roles", label: "Roles & Permissions", icon: ShieldCheck },
  { id: "audit", label: "Audit Logs", icon: History },
];

const SettingsSidebarNav = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-full md:w-64 space-y-1 shrink-0">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
              isActive
                ? "bg-[#0052CC] text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
            }`}
          >
            <Icon
              size={18}
              className={isActive ? "text-white" : "text-slate-500"}
            />
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default SettingsSidebarNav;

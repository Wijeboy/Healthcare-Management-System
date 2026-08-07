import React from "react";
import { Search, Bell, Settings, Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function Topbar({ title = "Appointments" }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-8 py-4">
      <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">{title}</h1>
      <div className="flex items-center gap-3">
        <div className="flex w-72 items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-400 dark:text-slate-500">
          <Search size={16} />
          <span>Search patient or ID…</span>
        </div>
        <button className="relative rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-slate-400 p-2 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">
          <Bell size={16} />
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-rose-500" />
        </button>
        <button className="rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-slate-400 p-2 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">
          <Settings size={16} />
        </button>
        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          aria-pressed={isDark}
          className="rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-slate-300 p-2 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600 dark:bg-blue-900 dark:text-blue-200">
          IL
        </div>
      </div>
    </div>
  );
}

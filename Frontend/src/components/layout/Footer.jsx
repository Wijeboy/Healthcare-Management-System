import React from "react";

export default function Footer() {
  return (
    <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-8 py-3 text-xs text-slate-400 dark:text-slate-500">
      <span>© 2026 CareConnect Health Systems. All rights reserved.</span>
      <div className="flex items-center gap-4">
        <a href="#" className="hover:text-slate-600 dark:hover:text-slate-300">Privacy</a>
        <a href="#" className="hover:text-slate-600 dark:hover:text-slate-300">Terms</a>
        <a href="#" className="hover:text-slate-600 dark:hover:text-slate-300">Audit Log</a>
      </div>
    </div>
  );
}

import React from 'react'

const DoctorsStatCard = ({ label, value, icon: Icon, colorTheme }) => {
  const themeClasses = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    rose: "bg-rose-50 text-rose-500",
  };
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 flex items-center gap-4">
      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${themeClasses[colorTheme]}`}
      >
        <Icon size={22} />
      </div>
      <div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          {label}
        </p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
};

export default DoctorsStatCard


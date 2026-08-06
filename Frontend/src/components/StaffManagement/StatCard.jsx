import React from 'react'

const StatCard = ({ icon: Icon, iconBgColor, iconTextColor, label, value }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4 shadow-sm">
      <div className={`p-3 rounded-lg ${iconBgColor} ${iconTextColor}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-500">{label}</p>
        <p className="text-2xl font-bold text-slate-900 mt-0.5">{value}</p>
      </div>
    </div>
  );
};

export default StatCard
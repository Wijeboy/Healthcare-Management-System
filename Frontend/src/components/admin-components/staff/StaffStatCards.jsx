import React from "react";

const StaffStatCards = ({ summary = {} }) => {
  const statData = [
    { label: "Total Staff", value: summary.totalStaff ?? "0", bgColor: "bg-white" },
    { label: "Active Staff", value: summary.activeStaff ?? "0", bgColor: "bg-white" },
    { label: "Nurses", value: summary.nurses ?? "0", bgColor: "bg-white" },
    { label: "Admin Staff", value: summary.adminStaff ?? "0", bgColor: "bg-white" },
    { label: "Other Staff", value: summary.otherStaff ?? "0", bgColor: "bg-white" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
      {statData.map((stat, idx) => (
        <div
          key={idx}
          className={`border border-[#E2E8F0] rounded-xl p-5 shadow-sm ${stat.bgColor}`}
        >
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {stat.label}
          </p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">
            {stat.value}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default StaffStatCards;



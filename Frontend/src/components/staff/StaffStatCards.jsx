import React from "react";

const statData = [
  { label: "Total Staff", value: "158", bgColor: "bg-white" },
  { label: "Active Staff", value: "146", bgColor: "bg-white" },
  { label: "Doctors", value: "72", bgColor: "bg-white" },
  { label: "Nurses", value: "48", bgColor: "bg-white" },
  { label: "Other Staff", value: "38", bgColor: "bg-white" },
];

const StaffStatCards = () => {
  return (
    <div className="grid grid-cols-5 gap-4 mb-6">
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

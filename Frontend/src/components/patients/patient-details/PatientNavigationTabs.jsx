import React from "react";

const tabs = [
  { id: "Overview", label: "Overview" },
  { id: "Records", label: "Records" },
  { id: "Appointments", label: "Appointments" },
  { id: "Activity", label: "Activity" },
];

const PatientNavigationTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-[#E2E8F0]">
      <nav className="flex gap-8">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-xs font-bold border-b-2 transition-colors ${
                isActive
                  ? "border-[#0256CA] text-[#0256CA]"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default PatientNavigationTabs;

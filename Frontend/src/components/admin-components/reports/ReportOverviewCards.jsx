import React from "react";
import { reportData } from "../../../data/reportData";

const ReportOverviewCards = ({ summaryData }) => {
  const cards = [
    {
      label: "TOTAL PATIENTS",
      value: summaryData?.totalPatients != null ? summaryData.totalPatients : reportData.summary.overviewCards[0].value,
      detail: "Registered patient accounts",
      tone: "border-blue-100",
    },
    {
      label: "TOTAL APPOINTMENTS",
      value: summaryData?.totalAppointments != null ? summaryData.totalAppointments : reportData.summary.overviewCards[1].value,
      detail: "All scheduled consultations",
      tone: "border-emerald-100",
    },
    {
      label: "COMPLETED VISITS",
      value: summaryData?.completedAppts != null ? summaryData.completedAppts : reportData.summary.overviewCards[2].value,
      detail: "Successfully fulfilled appointments",
      tone: "border-amber-100",
    },
    {
      label: "TOTAL REVENUE",
      value: summaryData?.totalRevenue ?? reportData.summary.overviewCards[3].value,
      detail: "Total billing & consultations",
      tone: "border-purple-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`rounded-xl border bg-white p-5 shadow-sm ${card.tone}`}
        >
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            {card.label}
          </p>
          <h3 className="mt-2 text-2xl font-bold text-slate-900">{card.value}</h3>
          <p className="mt-1 text-xs text-slate-500">{card.detail}</p>
        </div>
      ))}
    </div>
  );
};

export default ReportOverviewCards;

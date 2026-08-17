import React from "react";
import { reportData } from "../../../data/reportData";

const ReportOverviewCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {reportData.summary.overviewCards.map((card) => (
        <div
          key={card.label}
          className={`rounded-xl border bg-white p-5 shadow-sm ${card.tone}`}
        >
          <p className="text-[11px] font-bold uppercase tracking-wider opacity-80">
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

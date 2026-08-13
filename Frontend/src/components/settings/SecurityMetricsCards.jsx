import React from "react";
import { UserPlus, Shield, ShieldCheck } from "lucide-react";

const metrics = [
  {
    title: "Active Roles",
    value: "12 Total",
    icon: UserPlus,
  },
  {
    title: "Security Score",
    value: "98.4%",
    icon: Shield,
  },
  {
    title: "Recent Audits",
    value: "458 Logs",
    icon: ShieldCheck,
  },
];

const SecurityMetricsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {metrics.map((metric, idx) => {
        const Icon = metric.icon;
        return (
          <div
            key={idx}
            className="bg-white border border-[#E2E8F0] rounded-xl p-5 flex items-center gap-4 shadow-sm"
          >
            <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] text-[#0052CC] flex items-center justify-center shrink-0">
              <Icon size={20} />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-500">
                {metric.title}
              </p>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                {metric.value}
              </h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SecurityMetricsCards;

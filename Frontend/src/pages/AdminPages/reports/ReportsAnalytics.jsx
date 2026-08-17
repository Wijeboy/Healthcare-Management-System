import React from "react";
import { Download, Filter, PieChart, TrendingUp } from "lucide-react";
import ReportOverviewCards from "../../../components/admin-components/reports/ReportOverviewCards";
import ReportAnalyticsCharts from "../../../components/admin-components/reports/ReportAnalyticsCharts";
import ReportBreakdownTables from "../../../components/admin-components/reports/ReportBreakdownTables";
import { reportData } from "../../../data/reportData";

const ReportsAnalytics = () => {
  return (
    <div className="flex h-screen bg-[radial-gradient(circle_at_top_left,_#eff6ff_0%,_#f8fafc_45%,_#ffffff_100%)] text-[#1E293B] font-sans antialiased overflow-hidden">
      <div className="flex-1 flex flex-col overflow-y-auto">
        <main className="p-8 space-y-8 max-w-7xl">
          <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-slate-400">
                Reports & Analytics
              </p>
              <h1 className="mt-2 text-xl md:text-3xl font-bold tracking-tight text-slate-900 leading-tight">
                {reportData.hero.title}
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-500 leading-6">
                {reportData.hero.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                <Filter size={16} />
                Filters
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl bg-[#1E3A8A] px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-950 transition-colors shadow-sm">
                <Download size={16} />
                Export Report
              </button>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {reportData.summary.quickStats.map((stat) => (
              <div
                key={stat.label}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {stat.label}
                  </p>
                  <PieChart size={16} className={stat.accent} />
                </div>
                <h2 className={`mt-3 text-2xl font-bold ${stat.accent}`}>
                  {stat.value}
                </h2>
              </div>
            ))}
          </section>

          <section className="space-y-4">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Key Report Sections
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Core operational metrics grouped for quick scanning.
                </p>
              </div>
            </div>
            <ReportOverviewCards />
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Trends and Performance
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Monthly movement, weekly volume, and payment distribution.
              </p>
            </div>
            <ReportAnalyticsCharts />
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Activity Breakdown
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Appointment totals, doctor performance, and patient registration
                trends.
              </p>
            </div>
            <ReportBreakdownTables />
          </section>

          <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
            <div className="xl:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Revenue & Payments
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Total revenue, paid balances, pending payments, and failed
                    transactions.
                  </p>
                </div>
                <TrendingUp className="text-emerald-600" size={18} />
              </div>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                {reportData.summary.revenueBreakdown.map((item) => (
                  <div
                    key={item.label}
                    className={`rounded-xl p-4 border ${item.tone} bg-opacity-70`}
                  >
                    <p className="text-[11px] font-bold uppercase tracking-wider">
                      {item.label}
                    </p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sticky top-6">
              <h3 className="text-lg font-bold text-slate-900">Report Scope</h3>
              <div className="mt-4 space-y-3">
                {reportData.scopeItems.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-xl bg-slate-50 px-4 py-3"
                  >
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1E3A8A] text-[11px] font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="text-sm text-slate-700 leading-6">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ReportsAnalytics;

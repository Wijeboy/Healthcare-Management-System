import React, { useEffect, useState } from "react";
import { Download, Filter, PieChart, TrendingUp, Calendar, X, FileText, Table } from "lucide-react";
import ReportOverviewCards from "../../../components/admin-components/reports/ReportOverviewCards";
import ReportAnalyticsCharts from "../../../components/admin-components/reports/ReportAnalyticsCharts";
import ReportBreakdownTables from "../../../components/admin-components/reports/ReportBreakdownTables";
import { reportData } from "../../../data/reportData";
import { reportApi } from "../../../services/api";
import toast from "react-hot-toast";

const ReportsAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportType, setExportType] = useState("appointments");
  const [exportFormat, setExportFormat] = useState("pdf");

  const loadReports = async () => {
    setLoading(true);
    try {
      const res = await reportApi.getOverview({ startDate, endDate });
      setApiData(res);
    } catch (err) {
      console.error("Failed to load analytics overview:", err);
      toast.error("Could not load real-time analytics data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, [startDate, endDate]);

  const handleApplyFilter = (e) => {
    e.preventDefault();
    setShowFilterModal(false);
    loadReports();
  };

  const handleClearFilter = () => {
    setStartDate("");
    setEndDate("");
    setShowFilterModal(false);
  };

  const handleExport = () => {
    const url = reportApi.getExportUrl(exportType, exportFormat, startDate, endDate);
    window.open(url, "_blank");
    toast.success(`Exporting ${exportType} report as ${exportFormat.toUpperCase()}...`);
    setShowExportModal(false);
  };

  // Quick stats derived from API or fallback
  const quickStats = [
    {
      label: "TOTAL PATIENTS",
      value: apiData?.summary?.totalPatients ?? reportData.summary.quickStats[0].value,
      accent: "text-blue-600",
    },
    {
      label: "TOTAL DOCTORS",
      value: apiData?.summary?.totalDoctors ?? reportData.summary.quickStats[1].value,
      accent: "text-emerald-600",
    },
    {
      label: "TOTAL APPOINTMENTS",
      value: apiData?.summary?.totalAppointments ?? reportData.summary.quickStats[2].value,
      accent: "text-amber-600",
    },
    {
      label: "TOTAL REVENUE",
      value: apiData?.summary?.totalRevenue ?? reportData.summary.quickStats[3].value,
      accent: "text-rose-600",
    },
  ];

  // Revenue breakdown derived from API or fallback
  const revenueBreakdown = [
    {
      label: "PAID REVENUE",
      value: apiData?.summary?.paidRevenue ?? "$45,200",
      tone: "border-emerald-200 bg-emerald-50 text-emerald-900",
    },
    {
      label: "PENDING BALANCE",
      value: apiData?.summary?.pendingRevenue ?? "$6,800",
      tone: "border-amber-200 bg-amber-50 text-amber-900",
    },
    {
      label: "FAILED TRANSACTIONS",
      value: apiData?.summary?.failedRevenue ?? "$1,200",
      tone: "border-rose-200 bg-rose-50 text-rose-900",
    },
  ];

  return (
    <div className="flex h-screen bg-[radial-gradient(circle_at_top_left,_#eff6ff_0%,_#f8fafc_45%,_#ffffff_100%)] text-[#1E293B] font-sans antialiased overflow-hidden">
      <div className="flex-1 flex flex-col overflow-y-auto">
        <main className="p-8 space-y-8 max-w-7xl">
          
          {/* Header section */}
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
              {(startDate || endDate) && (
                <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg w-fit border border-blue-100">
                  <Calendar size={14} />
                  <span>
                    Range: {startDate || "Start"} — {endDate || "Today"}
                  </span>
                  <button onClick={handleClearFilter} className="hover:text-blue-800 ml-1">
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowFilterModal(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
              >
                <Filter size={16} />
                {startDate || endDate ? "Filter Active" : "Filters"}
              </button>
              <button
                onClick={() => setShowExportModal(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#1E3A8A] px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-950 transition-colors shadow-sm"
              >
                <Download size={16} />
                Export Report
              </button>
            </div>
          </section>

          {/* Quick Stats Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {quickStats.map((stat) => (
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
                  {loading ? "..." : stat.value}
                </h2>
              </div>
            ))}
          </section>

          {/* Core Sections Overview */}
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
            <ReportOverviewCards summaryData={apiData?.summary} />
          </section>

          {/* Analytics Charts */}
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

          {/* Breakdown Tables */}
          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Activity Breakdown
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Appointment totals, doctor performance, and patient registration trends.
              </p>
            </div>
            <ReportBreakdownTables liveDoctorStats={apiData?.doctorStats} />
          </section>

          {/* Revenue & Payments Scope Section */}
          <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
            <div className="xl:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Revenue & Payments
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Total revenue, paid balances, pending payments, and failed transactions.
                  </p>
                </div>
                <TrendingUp className="text-emerald-600" size={18} />
              </div>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                {revenueBreakdown.map((item) => (
                  <div
                    key={item.label}
                    className={`rounded-xl p-4 border ${item.tone}`}
                  >
                    <p className="text-[11px] font-bold uppercase tracking-wider">
                      {item.label}
                    </p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">
                      {loading ? "..." : item.value}
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

      {/* FILTER MODAL (Custom Date Range) */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-[#1E3A8A]" />
                <h3 className="text-lg font-bold text-slate-900">
                  Custom Date Range Filter
                </h3>
              </div>
              <button
                onClick={() => setShowFilterModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleApplyFilter} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  START DATE
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  END DATE
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClearFilter}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Clear Filters
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1E3A8A] text-white rounded-xl text-xs font-semibold hover:bg-blue-900 transition shadow-sm"
                >
                  Apply Filter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EXPORT MODAL (PDF / Excel Export) */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Download size={18} className="text-[#1E3A8A]" />
                <h3 className="text-lg font-bold text-slate-900">
                  Export System Reports
                </h3>
              </div>
              <button
                onClick={() => setShowExportModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  REPORT TYPE
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                  {[
                    { id: "appointments", label: "Appointments" },
                    { id: "patients", label: "Patients" },
                    { id: "doctors", label: "Doctors" },
                    { id: "revenue", label: "Revenue & Payments" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setExportType(item.id)}
                      className={`p-2.5 rounded-xl border text-left transition ${
                        exportType === item.id
                          ? "bg-blue-50 border-blue-500 text-blue-800"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  FILE FORMAT
                </label>
                <div className="grid grid-cols-2 gap-3 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setExportFormat("pdf")}
                    className={`flex items-center gap-2 p-3 rounded-xl border transition ${
                      exportFormat === "pdf"
                        ? "bg-rose-50 border-rose-500 text-rose-800"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <FileText size={18} className="text-rose-600" />
                    <span>PDF Document</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setExportFormat("excel")}
                    className={`flex items-center gap-2 p-3 rounded-xl border transition ${
                      exportFormat === "excel"
                        ? "bg-emerald-50 border-emerald-500 text-emerald-800"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Table size={18} className="text-emerald-600" />
                    <span>Excel Spreadsheet</span>
                  </button>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowExportModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleExport}
                  className="px-4 py-2 bg-[#1E3A8A] text-white rounded-xl text-xs font-semibold hover:bg-blue-900 transition shadow-sm flex items-center gap-1.5"
                >
                  <Download size={14} />
                  Download Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsAnalytics;

import React, { useState } from "react";
import { Search, Upload, FileText, Download } from "lucide-react";
import DoctorSidebar from "../components/layout/DoctorSidebar";
import Topbar from "../components/layout/Topbar";
import Footer from "../components/layout/Footer";
import Avatar from "../components/common/Avatar";
import UploadReportModal from "../components/records/UploadReportModal";
import { useRecords } from "../hooks/useRecords";
import { RECORD_CATEGORIES, RECORD_RESULTS } from "../data/mockRecords";

const RESULT_TINT = {
  Normal: "bg-emerald-50 text-emerald-600 ring-emerald-200",
  Abnormal: "bg-rose-50 text-rose-600 ring-rose-200",
};

export default function RecordsPage() {
  const [showUpload, setShowUpload] = useState(false);
  const {
    records,
    loading,
    search,
    setSearch,
    category,
    setCategory,
    result,
    setResult,
    addRecord,
  } = useRecords();

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      <DoctorSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar title="Medical Records" />

        <div className="flex-1 overflow-y-auto p-8">
          <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-slate-50">Records Table</h2>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            {/* Legend */}
            <div className="flex items-center gap-5 border-b border-slate-100 dark:border-slate-700 px-5 py-3">
              <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
                <span className="h-2 w-2 rounded-full bg-emerald-600" /> Normal
              </div>
              <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
                <span className="h-2 w-2 rounded-full bg-rose-600" /> Abnormal
              </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-700 px-5 py-3">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-500 dark:text-slate-400">
                  <Search size={14} />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search report or patient"
                    className="w-40 bg-transparent placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 focus:outline-none"
                >
                  <option>All Categories</option>
                  {RECORD_CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                <select
                  value={result}
                  onChange={(e) => setResult(e.target.value)}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 focus:outline-none"
                >
                  <option>All Results</option>
                  {RECORD_RESULTS.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => setShowUpload(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <Upload size={15} /> Upload Report
              </button>
            </div>

            {/* Table */}
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-700">
                  <th className="px-5 py-3 text-xs font-medium tracking-wide text-slate-400 dark:text-slate-500">PATIENT</th>
                  <th className="px-3 py-3 text-xs font-medium tracking-wide text-slate-400 dark:text-slate-500">REPORT</th>
                  <th className="px-3 py-3 text-xs font-medium tracking-wide text-slate-400 dark:text-slate-500">CATEGORY</th>
                  <th className="px-3 py-3 text-xs font-medium tracking-wide text-slate-400 dark:text-slate-500">DATE</th>
                  <th className="px-3 py-3 text-xs font-medium tracking-wide text-slate-400 dark:text-slate-500">DOCTOR</th>
                  <th className="px-3 py-3 text-xs font-medium tracking-wide text-slate-400 dark:text-slate-500">RESULT</th>
                  <th className="px-5 py-3 text-right text-xs font-medium tracking-wide text-slate-400 dark:text-slate-500">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {!loading && records.map((r, i) => (
                  <tr key={r.id} className={i !== records.length - 1 ? "border-b border-slate-50" : ""}>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={r.patient} tint="bg-blue-100 text-blue-600" />
                        <span className="text-sm font-medium text-slate-800 dark:text-slate-100">{r.patient}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-sm text-slate-600 dark:text-slate-300">{r.reportName}</td>
                    <td className="px-3 py-3 text-sm text-blue-500">{r.category}</td>
                    <td className="px-3 py-3 text-sm text-slate-500 dark:text-slate-400">{r.date}</td>
                    <td className="px-3 py-3 text-sm text-slate-500 dark:text-slate-400">{r.doctor}</td>
                    <td className="px-3 py-3">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${RESULT_TINT[r.result]}`}>
                        <span className="h-1.5 w-1.5 rounded-full bg-current" /> {r.result}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="inline-flex gap-1">
                        <button className="rounded-lg p-1.5 text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700" title="View">
                          <FileText size={15} />
                        </button>
                        <button className="rounded-lg p-1.5 text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700" title="Download">
                          <Download size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!loading && records.length === 0 && (
              <p className="px-5 py-8 text-center text-sm text-slate-400 dark:text-slate-500">No records match your filters.</p>
            )}
          </div>
        </div>

        <Footer />
      </div>

      {showUpload && (
        <UploadReportModal
          onClose={() => setShowUpload(false)}
          onSave={async (payload) => {
            await addRecord(payload);
            setShowUpload(false);
          }}
        />
      )}
    </div>
  );
}

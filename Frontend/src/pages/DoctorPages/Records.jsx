import React, { useState } from "react";
import { Search, Upload } from "lucide-react";
import Avatar from "../../components/common/Avatar";
import UploadReportModal from "../../components/doctor-components/records/UploadReportModal";
import { useRecords } from "../../hooks/useRecords";
import { RECORD_CATEGORIES } from "../../data/doctor/mockRecords";

const RESULT_TINT = {
  Normal: "bg-emerald-50 text-emerald-600 ring-emerald-200",
  Abnormal: "bg-rose-50 text-rose-600 ring-rose-200",
};

export default function RecordsPage() {
  const { records, loading, search, setSearch, category, setCategory, result, setResult, addRecord } = useRecords();
  const [showUpload, setShowUpload] = useState(false);

  async function handleUpload(payload) {
    await addRecord(payload);
    setShowUpload(false);
  }

  return (
    <div className="p-8">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-on-surface">Medical Records</h2>
          <p className="mt-1 text-sm text-on-surface-variant">Lab reports, scans, and prescriptions across your patients.</p>
        </div>
        <button onClick={() => setShowUpload(true)} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary hover:bg-primary-container">
          <Upload size={16} /> Upload Report
        </button>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 rounded-lg border border-outline-variant bg-white px-3 py-2 text-sm text-on-surface-variant">
          <Search size={14} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search patient or report" className="w-52 bg-transparent focus:outline-none" />
        </div>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-lg border border-outline-variant bg-white px-3 py-2 text-sm text-on-surface-variant">
          <option value="All">All Categories</option>
          {RECORD_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={result} onChange={(e) => setResult(e.target.value)} className="rounded-lg border border-outline-variant bg-white px-3 py-2 text-sm text-on-surface-variant">
          <option value="All">All Results</option>
          <option>Normal</option>
          <option>Abnormal</option>
        </select>
      </div>

      <div className="rounded-2xl border border-outline-variant bg-white">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-outline-variant">
              <th className="px-6 py-3 text-xs font-medium tracking-wide text-on-surface-variant">PATIENT</th>
              <th className="px-4 py-3 text-xs font-medium tracking-wide text-on-surface-variant">REPORT</th>
              <th className="px-4 py-3 text-xs font-medium tracking-wide text-on-surface-variant">CATEGORY</th>
              <th className="px-4 py-3 text-xs font-medium tracking-wide text-on-surface-variant">DATE</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wide text-on-surface-variant">RESULT</th>
            </tr>
          </thead>
          <tbody>
            {!loading && records.map((r, i) => (
              <tr key={r.id} className={i !== records.length - 1 ? "border-b border-slate-50" : ""}>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2.5"><Avatar name={r.patient} tint="bg-indigo-100 text-indigo-600" /><span className="text-sm font-medium text-on-surface">{r.patient}</span></div>
                </td>
                <td className="px-4 py-3 text-sm text-on-surface">{r.reportName}</td>
                <td className="px-4 py-3 text-sm text-on-surface-variant">{r.category}</td>
                <td className="px-4 py-3 text-sm text-on-surface-variant">{r.date}</td>
                <td className="px-6 py-3"><span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${RESULT_TINT[r.result]}`}>{r.result}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && records.length === 0 && <p className="px-6 py-8 text-center text-sm text-on-surface-variant">No records match your search.</p>}
      </div>

      {showUpload && <UploadReportModal onClose={() => setShowUpload(false)} onSubmit={handleUpload} />}
    </div>
  );
}

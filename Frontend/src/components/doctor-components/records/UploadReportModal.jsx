import React, { useState } from "react";
import { X, Upload } from "lucide-react";
import { PATIENTS } from "../../../data/doctor/mockAppointments";
import { RECORD_CATEGORIES } from "../../../data/doctor/mockRecords";

export default function UploadReportModal({ onClose, onSubmit }) {
  const [patientId, setPatientId] = useState(PATIENTS[0].id);
  const [reportName, setReportName] = useState("");
  const [category, setCategory] = useState(RECORD_CATEGORIES[0]);
  const [result, setResult] = useState("Normal");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!reportName.trim()) return;
    const patient = PATIENTS.find((p) => p.id === patientId);
    setSaving(true);
    await onSubmit({
      patientId,
      patient: patient.name,
      reportName: reportName.trim(),
      category,
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" }),
      doctor: "You",
      result,
    });
    setSaving(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h3 className="text-base font-semibold text-slate-800">Upload Report</h3>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500">Patient</label>
            <select value={patientId} onChange={(e) => setPatientId(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
              {PATIENTS.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500">Report Name</label>
            <input value={reportName} onChange={(e) => setReportName(e.target.value)} placeholder="e.g. Complete Blood Count" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
                {RECORD_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500">Result</label>
              <select value={result} onChange={(e) => setResult(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
                <option>Normal</option>
                <option>Abnormal</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">Cancel</button>
            <button type="submit" disabled={saving} className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50">
              <Upload size={15} /> {saving ? "Uploading\u2026" : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { X, Upload } from "lucide-react";
import { PATIENTS, DOCTORS } from "../../data/mockAppointments";
import { RECORD_CATEGORIES, RECORD_RESULTS } from "../../data/mockRecords";

export default function UploadReportModal({ onClose, onSave }) {
  const [patientId, setPatientId] = useState(PATIENTS[0].id);
  const [reportName, setReportName] = useState("");
  const [category, setCategory] = useState(RECORD_CATEGORIES[0]);
  const [result, setResult] = useState(RECORD_RESULTS[0]);
  const [doctorName, setDoctorName] = useState(DOCTORS[0].name);
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!reportName) return;
    const patient = PATIENTS.find((p) => p.id === patientId);
    setSaving(true);
    await onSave({
      patientId,
      patient: patient.name,
      reportName,
      category,
      result,
      doctor: doctorName,
      file,
    });
    setSaving(false);
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">Upload Report</h3>
          <button onClick={onClose} className="text-slate-400 dark:text-slate-500 hover:text-slate-600">
            <X size={16} />
          </button>
        </div>

        <label className="mb-1 block text-xs text-slate-400 dark:text-slate-500">Patient</label>
        <select
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          className="mb-3 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-slate-100 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none"
        >
          {PATIENTS.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <label className="mb-1 block text-xs text-slate-400 dark:text-slate-500">Report Name</label>
        <input
          value={reportName}
          onChange={(e) => setReportName(e.target.value)}
          placeholder="e.g. Liver Function Test"
          className="mb-3 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-slate-100 px-3 py-2 text-sm placeholder:text-slate-400 focus:border-blue-400 focus:outline-none"
        />

        <div className="mb-3 grid grid-cols-2 gap-2">
          <div>
            <label className="mb-1 block text-xs text-slate-400 dark:text-slate-500">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-slate-100 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none"
            >
              {RECORD_CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-slate-400 dark:text-slate-500">Result</label>
            <select
              value={result}
              onChange={(e) => setResult(e.target.value)}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-slate-100 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none"
            >
              {RECORD_RESULTS.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>

        <label className="mb-1 block text-xs text-slate-400 dark:text-slate-500">Doctor</label>
        <select
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
          className="mb-3 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-slate-100 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none"
        >
          {DOCTORS.map((d) => (
            <option key={d.name}>{d.name}</option>
          ))}
        </select>

        <label className="mb-1 block text-xs text-slate-400 dark:text-slate-500">File</label>
        <label className="mb-4 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-slate-100 py-8 text-center hover:bg-slate-50 dark:hover:bg-slate-700">
          <Upload size={18} className="mb-1 text-slate-400 dark:text-slate-500" />
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {file ? file.name : "Click to choose a file (PDF, JPG, PNG)"}
          </span>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </label>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!reportName || saving}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {saving ? "Saving…" : "Save Report"}
          </button>
        </div>
      </div>
    </div>
  );
}

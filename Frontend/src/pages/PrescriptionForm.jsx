import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Plus, Trash2, Printer, Save, AlertTriangle, ShieldCheck, ChevronDown, ChevronLeft } from "lucide-react";
import DoctorSidebar from "../components/layout/DoctorSidebar";
import Topbar from "../components/layout/Topbar";
import Footer from "../components/layout/Footer";
import { PATIENTS, DOCTORS } from "../data/mockAppointments";
import { FREQUENCIES } from "../data/mockPrescriptions";
import { createPrescription, updatePrescription, fetchPrescriptionById } from "../api/prescriptionsApi";

let medRowId = 0;
function newMedRow(name = "", dosage = "", frequency = FREQUENCIES[0]) {
  medRowId += 1;
  return { rowId: medRowId, name, dosage, frequency };
}

export default function PrescriptionFormPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // present only on /prescriptions/:id/edit
  const isEditMode = Boolean(id);

  const [patientId, setPatientId] = useState("");
  const [doctorName, setDoctorName] = useState(DOCTORS[0].name);
  const [medications, setMedications] = useState([newMedRow()]);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("Pending Approval");
  const [prescriptionCode, setPrescriptionCode] = useState(
    `RX-2026-${String(Math.floor(1000 + Math.random() * 9000))}`
  );
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEditMode) return;
    let mounted = true;
    fetchPrescriptionById(id).then((rx) => {
      if (!mounted || !rx) return;
      setPatientId(rx.patientId);
      setDoctorName(rx.doctor);
      setMedications(rx.medications.map((m) => newMedRow(m.name, m.dosage, m.frequency)));
      setNotes(rx.notes || "");
      setStatus(rx.status);
      setPrescriptionCode(rx.code);
      setLoading(false);
    });
    return () => { mounted = false; };
  }, [id, isEditMode]);

  function updateMed(rowId, field, value) {
    setMedications((prev) => prev.map((m) => (m.rowId === rowId ? { ...m, [field]: value } : m)));
  }
  function addMedRow() {
    setMedications((prev) => [...prev, newMedRow()]);
  }
  function removeMedRow(rowId) {
    setMedications((prev) => (prev.length > 1 ? prev.filter((m) => m.rowId !== rowId) : prev));
  }

  const isValid = patientId && medications.every((m) => m.name.trim() && m.dosage.trim());

  async function handleSave() {
    if (!isValid) return;
    const patient = PATIENTS.find((p) => p.id === patientId);
    const cleanMeds = medications.map(({ name, dosage, frequency }) => ({ name, dosage, frequency }));

    setSaving(true);
    if (isEditMode) {
      await updatePrescription(id, {
        patientId,
        patient: patient.name,
        doctor: doctorName,
        medications: cleanMeds,
        notes,
        status,
      });
      setSaving(false);
      navigate(`/prescriptions/${id}`);
    } else {
      const created = await createPrescription({
        patientId,
        patient: patient.name,
        doctor: doctorName,
        status: "Pending Approval",
        medications: cleanMeds,
        notes,
      });
      setSaving(false);
      navigate(`/prescriptions/${created.id}`);
    }
  }

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      <DoctorSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar title="Prescriptions" />

        <div className="flex-1 overflow-y-auto p-8">
          <button
            onClick={() => navigate("/prescriptions")}
            className="mb-3 flex items-center gap-1 text-xs font-medium text-slate-400 dark:text-slate-500 hover:text-slate-600"
          >
            <ChevronLeft size={14} /> Back to Prescriptions
          </button>
          <p className="mb-2 text-xs text-slate-400 dark:text-slate-500">
            Prescriptions · {isEditMode ? `Edit #${prescriptionCode}` : "New Prescription"}
          </p>

          {loading ? (
            <p className="text-sm text-slate-400 dark:text-slate-500">Loading prescription…</p>
          ) : (
          <div className="max-w-3xl">
            <div className="mb-5 flex items-center justify-between rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-4">
              <div>
                <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100">
                  {isEditMode ? "Edit Prescription" : "Issue New Prescription"}
                </h2>
                <p className="text-xs text-slate-400 dark:text-slate-500">Please ensure all medical details are verified before saving.</p>
              </div>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600 ring-1 ring-amber-200">
                {isEditMode ? "EDIT MODE" : "DRAFT MODE"}
              </span>
            </div>

            {/* Identification */}
            <div className="mb-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">Prescription ID</label>
                  <input readOnly value={prescriptionCode} className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-2.5 text-sm text-slate-500 dark:text-slate-400" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">Patient Identification</label>
                  <div className="relative">
                    <select
                      value={patientId}
                      onChange={(e) => setPatientId(e.target.value)}
                      className="w-full appearance-none rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-slate-100 px-3 py-2.5 text-sm focus:border-blue-400 focus:outline-none"
                    >
                      <option value="">Select Patient…</option>
                      {PATIENTS.map((p) => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">Issuing Doctor</label>
                  <div className="relative">
                    <select
                      value={doctorName}
                      onChange={(e) => setDoctorName(e.target.value)}
                      className="w-full appearance-none rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-slate-100 px-3 py-2.5 text-sm focus:border-blue-400 focus:outline-none"
                    >
                      {DOCTORS.map((d) => (
                        <option key={d.name} value={d.name}>{d.name}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Medications */}
            <div className="mb-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Medication Details</h3>
                <button onClick={addMedRow} className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline">
                  <Plus size={15} /> Add Medicine
                </button>
              </div>

              <div className="space-y-3">
                {medications.map((med) => (
                  <div key={med.rowId} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-3">
                    <div>
                      <label className="mb-1 block text-[11px] text-slate-400 dark:text-slate-500">Medicine Name</label>
                      <input
                        value={med.name}
                        onChange={(e) => updateMed(med.rowId, "name", e.target.value)}
                        placeholder="e.g. Amoxicillin"
                        className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-slate-100 px-3 py-2 text-sm placeholder:text-slate-400 focus:border-blue-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[11px] text-slate-400 dark:text-slate-500">Dosage</label>
                      <input
                        value={med.dosage}
                        onChange={(e) => updateMed(med.rowId, "dosage", e.target.value)}
                        placeholder="e.g. 500mg"
                        className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-slate-100 px-3 py-2 text-sm placeholder:text-slate-400 focus:border-blue-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[11px] text-slate-400 dark:text-slate-500">Frequency</label>
                      <select
                        value={med.frequency}
                        onChange={(e) => updateMed(med.rowId, "frequency", e.target.value)}
                        className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-slate-100 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none"
                      >
                        {FREQUENCIES.map((f) => (
                          <option key={f}>{f}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-end pb-0.5">
                      <button
                        onClick={() => removeMedRow(med.rowId)}
                        disabled={medications.length === 1}
                        className="rounded-lg p-2 text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950 disabled:opacity-30"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="mb-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
                Clinical Instructions &amp; Notes
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter special administration instructions, potential side effects, or clinical observations…"
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-slate-100 px-3 py-2.5 text-sm placeholder:text-slate-400 focus:border-blue-400 focus:outline-none"
              />
              <p className="mt-1.5 text-[11px] text-slate-400 dark:text-slate-500">
                Notes will be printed on the patient's copy and stored in history.
              </p>
            </div>

            {/* Actions */}
            <div className="mb-5 flex justify-end gap-2">
              <button
                onClick={() => navigate(isEditMode ? `/prescriptions/${id}` : "/prescriptions")}
                className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                Cancel
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-2.5 text-sm font-medium text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-700">
                <Printer size={15} /> Print Preview
              </button>
              <button
                onClick={handleSave}
                disabled={!isValid || saving}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Save size={15} /> {saving ? "Saving…" : isEditMode ? "Save Changes" : "Save Prescription"}
              </button>
            </div>

            {/* Alerts */}
            <div className="grid grid-cols-2 gap-4 pb-6">
              <div className="flex items-start gap-3 rounded-2xl border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/40 p-4">
                <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-600" />
                <div>
                  <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">Drug Interaction Alert</p>
                  <p className="mt-1 text-xs text-amber-700 dark:text-amber-400">
                    Please note: cross-referencing current medication list for this patient against new
                    prescriptions to prevent adverse reactions.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/40 p-4">
                <ShieldCheck size={18} className="mt-0.5 shrink-0 text-blue-600" />
                <div>
                  <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">Compliance Status</p>
                  <p className="mt-1 text-xs text-blue-700 dark:text-blue-400">Validated for Medicare Part D formulary requirements.</p>
                </div>
              </div>
            </div>
          </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
}

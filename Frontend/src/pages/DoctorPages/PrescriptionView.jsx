import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, FlaskConical, Printer, Pencil } from "lucide-react";
import Avatar from "../../components/common/Avatar";
import { fetchPrescriptionById, updatePrescriptionStatus, PATIENTS } from "../../services/doctorApi";
import { PRESCRIPTION_STATUSES, PRESCRIPTION_STATUS_TINT } from "../../data/doctor/mockPrescriptions";

export default function PrescriptionViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rx, setRx] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchPrescriptionById(id).then((data) => { if (mounted) { setRx(data); setLoading(false); } });
    return () => { mounted = false; };
  }, [id]);

  async function handleStatusChange(status) {
    setRx((prev) => ({ ...prev, status }));
    await updatePrescriptionStatus(id, status);
  }

  const patient = rx ? PATIENTS.find((p) => p.id === rx.patientId) : null;

  return (
    <div className="p-8">
      <button onClick={() => navigate("/doctor/prescriptions")} className="mb-4 flex items-center gap-1 text-xs font-medium text-on-surface-variant hover:text-on-surface">
        <ChevronLeft size={14} /> Back to Prescriptions
      </button>

      {loading && <p className="text-sm text-on-surface-variant">Loading\u2026</p>}
      {!loading && !rx && <p className="text-sm text-on-surface-variant">Prescription not found.</p>}

      {!loading && rx && (
        <div className="max-w-3xl">
          <div className="mb-5 flex items-center justify-between rounded-2xl border border-outline-variant bg-white px-6 py-4">
            <div>
              <h2 className="text-base font-semibold text-on-surface">#{rx.code}</h2>
              <p className="text-xs text-on-surface-variant">Issued {rx.dateIssued} by {rx.doctor}</p>
            </div>
            <div className="flex items-center gap-2">
              <select value={rx.status} onChange={(e) => handleStatusChange(e.target.value)} className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium focus:outline-none ${PRESCRIPTION_STATUS_TINT[rx.status]}`}>
                {PRESCRIPTION_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <button onClick={() => navigate(`/doctor/prescriptions/${id}/edit`)} className="flex items-center gap-1.5 rounded-lg border border-outline-variant bg-white px-3 py-2 text-xs font-medium text-on-surface-variant hover:bg-slate-50"><Pencil size={14} /> Edit</button>
              <button className="flex items-center gap-1.5 rounded-lg border border-outline-variant bg-white px-3 py-2 text-xs font-medium text-on-surface-variant hover:bg-slate-50"><Printer size={14} /> Print</button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {patient && (
              <div className="col-span-1 rounded-2xl border border-outline-variant bg-white p-5">
                <div className="mb-4 flex items-center gap-3">
                  <Avatar name={patient.name} size="h-11 w-11" tint="bg-blue-100 text-blue-600" />
                  <div><p className="text-sm font-semibold text-on-surface">{patient.name}</p><p className="text-xs text-on-surface-variant">{patient.age} Years</p></div>
                </div>
                <div className="mb-3 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-50 p-3"><p className="text-[10px] uppercase text-on-surface-variant">Blood Group</p><p className="text-sm font-semibold text-on-surface">{patient.bloodGroup}</p></div>
                  <div className="rounded-xl bg-rose-50 p-3"><p className="text-[10px] uppercase text-rose-400">Allergies</p><p className="text-sm font-semibold text-rose-600">{patient.allergies}</p></div>
                </div>
                <div className="rounded-xl border border-slate-100 p-3"><p className="mb-1 text-[10px] uppercase text-on-surface-variant">Emergency Contact</p><p className="text-xs text-on-surface-variant">{patient.emergencyContact}</p></div>
              </div>
            )}

            <div className="col-span-2 rounded-2xl border border-outline-variant bg-white p-5">
              <h3 className="mb-4 text-sm font-semibold text-on-surface">Medications</h3>
              <div className="space-y-3">
                {rx.medications.map((m, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-500"><FlaskConical size={16} /></div>
                    <div><p className="text-sm font-medium text-on-surface">{m.name} \u2014 {m.dosage}</p><p className="text-xs text-on-surface-variant">{m.frequency}</p></div>
                  </div>
                ))}
              </div>
              <div className="mt-5">
                <p className="mb-1.5 text-[10px] uppercase tracking-wide text-on-surface-variant">Clinical Notes</p>
                <p className="rounded-lg bg-slate-50 p-3 text-sm text-on-surface-variant">{rx.notes}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

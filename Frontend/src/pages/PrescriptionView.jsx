import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, FlaskConical, Printer, Pencil } from "lucide-react";
import DoctorSidebar from "../components/layout/DoctorSidebar";
import Topbar from "../components/layout/Topbar";
import Footer from "../components/layout/Footer";
import Avatar from "../components/common/Avatar";
import { fetchPrescriptionById, updatePrescriptionStatus } from "../api/prescriptionsApi";
import { PATIENTS } from "../data/mockAppointments";
import { PRESCRIPTION_STATUSES, PRESCRIPTION_STATUS_TINT } from "../data/mockPrescriptions";

export default function PrescriptionViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rx, setRx] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchPrescriptionById(id).then((data) => {
      if (mounted) {
        setRx(data);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, [id]);

  async function handleStatusChange(status) {
    setRx((prev) => ({ ...prev, status }));
    await updatePrescriptionStatus(id, status);
  }

  const patient = rx ? PATIENTS.find((p) => p.id === rx.patientId) : null;

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      <DoctorSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar title="Prescriptions" />

        <div className="flex-1 overflow-y-auto p-8">
          <button
            onClick={() => navigate("/prescriptions")}
            className="mb-4 flex items-center gap-1 text-xs font-medium text-slate-400 dark:text-slate-500 hover:text-slate-600"
          >
            <ChevronLeft size={14} /> Back to Prescriptions
          </button>

          {loading && <p className="text-sm text-slate-400 dark:text-slate-500">Loading…</p>}
          {!loading && !rx && <p className="text-sm text-slate-400 dark:text-slate-500">Prescription not found.</p>}

          {!loading && rx && (
            <div className="max-w-3xl">
              <div className="mb-5 flex items-center justify-between rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-4">
                <div>
                  <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100">#{rx.code}</h2>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Issued {rx.dateIssued} by {rx.doctor}</p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={rx.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium focus:outline-none ${PRESCRIPTION_STATUS_TINT[rx.status]}`}
                  >
                    {PRESCRIPTION_STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => navigate(`/prescriptions/${id}/edit`)}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  >
                    <Pencil size={14} /> Edit
                  </button>
                  <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">
                    <Printer size={14} /> Print
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {patient && (
                  <div className="col-span-1 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
                    <div className="mb-4 flex items-center gap-3">
                      <Avatar name={patient.name} size="h-11 w-11" tint="bg-blue-100 text-blue-600" />
                      <div>
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{patient.name}</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500">{patient.age} Years</p>
                      </div>
                    </div>
                    <div className="mb-3 grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-slate-50 dark:bg-slate-900 p-3">
                        <p className="text-[10px] uppercase text-slate-400 dark:text-slate-500">Blood Group</p>
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{patient.bloodGroup}</p>
                      </div>
                      <div className="rounded-xl bg-rose-50 dark:bg-rose-950/40 p-3">
                        <p className="text-[10px] uppercase text-rose-400">Allergies</p>
                        <p className="text-sm font-semibold text-rose-600">{patient.allergies}</p>
                      </div>
                    </div>
                    <div className="rounded-xl border border-slate-100 dark:border-slate-700 p-3">
                      <p className="mb-1 text-[10px] uppercase text-slate-400 dark:text-slate-500">Emergency Contact</p>
                      <p className="text-xs text-slate-600 dark:text-slate-300">{patient.emergencyContact}</p>
                    </div>
                  </div>
                )}

                <div className="col-span-2 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
                  <h3 className="mb-4 text-sm font-semibold text-slate-800 dark:text-slate-100">Medications</h3>
                  <div className="space-y-3">
                    {rx.medications.map((m, i) => (
                      <div key={i} className="flex items-center gap-3 rounded-xl border border-slate-100 dark:border-slate-700 p-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-500">
                          <FlaskConical size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{m.name} — {m.dosage}</p>
                          <p className="text-xs text-slate-400 dark:text-slate-500">{m.frequency}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5">
                    <p className="mb-1.5 text-[10px] uppercase tracking-wide text-slate-400 dark:text-slate-500">Clinical Notes</p>
                    <p className="rounded-lg bg-slate-50 dark:bg-slate-900 p-3 text-sm text-slate-600 dark:text-slate-300">{rx.notes}</p>
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

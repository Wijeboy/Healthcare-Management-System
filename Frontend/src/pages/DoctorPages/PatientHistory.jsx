import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ShieldAlert, CalendarCheck, FlaskConical, Pill } from "lucide-react";
import Avatar from "../../components/common/Avatar";
import { fetchPatientHistory } from "../../services/doctorApi";
import { STATUS_TINT } from "../../constants/statusStyles";
import { PRESCRIPTION_STATUS_TINT } from "../../data/doctor/mockPrescriptions";

const RESULT_TINT = {
  Normal: "bg-emerald-50 text-emerald-600 ring-emerald-200",
  Abnormal: "bg-rose-50 text-rose-600 ring-rose-200",
};

export default function PatientHistoryPage() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchPatientHistory(patientId).then((result) => { if (mounted) { setData(result); setLoading(false); } });
    return () => { mounted = false; };
  }, [patientId]);

  return (
    <div className="p-8">
      <button onClick={() => navigate(-1)} className="mb-4 flex items-center gap-1 text-xs font-medium text-on-surface-variant hover:text-on-surface">
        <ChevronLeft size={14} /> Back
      </button>

      {loading && <p className="text-sm text-on-surface-variant">Loading\u2026</p>}
      {!loading && !data?.patient && <p className="text-sm text-on-surface-variant">Patient not found.</p>}

      {!loading && data?.patient && (
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1 rounded-2xl border border-outline-variant bg-white p-5">
            <div className="mb-4 flex items-center gap-3">
              <Avatar name={data.patient.name} size="h-12 w-12" tint="bg-blue-100 text-blue-600" />
              <div>
                <p className="text-base font-semibold text-on-surface">{data.patient.name}</p>
                <p className="text-sm text-on-surface-variant">{data.patient.age} Years</p>
              </div>
            </div>
            <div className="mb-3 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-[10px] uppercase text-on-surface-variant">Blood Group</p>
                <p className="text-sm font-semibold text-on-surface">{data.patient.bloodGroup}</p>
              </div>
              <div className="rounded-xl bg-rose-50 p-3">
                <p className="flex items-center gap-1 text-[10px] uppercase text-rose-400"><ShieldAlert size={11} /> Allergies</p>
                <p className="text-sm font-semibold text-rose-600">{data.patient.allergies}</p>
              </div>
            </div>
            <div className="mb-3 rounded-xl border border-slate-100 p-3">
              <p className="mb-1 text-[10px] uppercase text-on-surface-variant">Emergency Contact</p>
              <p className="text-xs text-on-surface-variant">{data.patient.emergencyContact}</p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-blue-50 p-2"><p className="text-lg font-bold text-blue-600">{data.appointments.length}</p><p className="text-[10px] text-blue-400">Visits</p></div>
              <div className="rounded-lg bg-violet-50 p-2"><p className="text-lg font-bold text-violet-600">{data.medicalRecords.length}</p><p className="text-[10px] text-violet-400">Records</p></div>
              <div className="rounded-lg bg-emerald-50 p-2"><p className="text-lg font-bold text-emerald-600">{data.prescriptions.length}</p><p className="text-[10px] text-emerald-400">Rx</p></div>
            </div>
          </div>

          <div className="col-span-2 space-y-6">
            <div className="rounded-2xl border border-outline-variant bg-white p-5">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-on-surface"><CalendarCheck size={15} /> Appointment History</h3>
              <div className="space-y-2">
                {data.appointments.length === 0 && <p className="text-xs text-on-surface-variant">No appointment history.</p>}
                {data.appointments.map((a) => (
                  <div key={a.id} className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2.5">
                    <div>
                      <p className="text-sm font-medium text-on-surface">{a.doctor} \u00b7 {a.department}</p>
                      <p className="text-xs text-on-surface-variant">October {a.day}, {a.year} \u00b7 {a.time}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${STATUS_TINT[a.status]}`}>{a.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-outline-variant bg-white p-5">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-on-surface"><FlaskConical size={15} /> Medical Records</h3>
              <div className="space-y-2">
                {data.medicalRecords.length === 0 && <p className="text-xs text-on-surface-variant">No records on file.</p>}
                {data.medicalRecords.map((r) => (
                  <div key={r.id} className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2.5">
                    <div>
                      <p className="text-sm font-medium text-on-surface">{r.reportName}</p>
                      <p className="text-xs text-on-surface-variant">{r.date} \u00b7 {r.doctor} \u00b7 {r.category}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${RESULT_TINT[r.result]}`}>{r.result}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-outline-variant bg-white p-5">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-on-surface"><Pill size={15} /> Prescriptions</h3>
              <div className="space-y-2">
                {data.prescriptions.length === 0 && <p className="text-xs text-on-surface-variant">No prescriptions on file.</p>}
                {data.prescriptions.map((rx) => (
                  <button key={rx.id} onClick={() => navigate(`/doctor/prescriptions/${rx.id}`)} className="flex w-full items-center justify-between rounded-xl border border-slate-100 px-3 py-2.5 text-left hover:bg-slate-50">
                    <div>
                      <p className="text-sm font-medium text-primary">#{rx.code}</p>
                      <p className="text-xs text-on-surface-variant">{rx.medications.map((m) => m.name).join(", ")} \u00b7 {rx.dateIssued}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${PRESCRIPTION_STATUS_TINT[rx.status]}`}>{rx.status}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ShieldAlert, CalendarCheck, FlaskConical, Pill } from "lucide-react";
import DoctorSidebar from "../../components/layout/DoctorSidebar";
import Topbar from "../../components/layout/Topbar";
import Footer from "../../components/layout/Footer";
import Avatar from "../../components/common/Avatar";
import { PATIENTS, mockAppointments } from "../../data/mockAppointments";
import { fetchRecords } from "../../api/recordsApi";
import { fetchPrescriptions } from "../../api/prescriptionsApi";
import { STATUS_TINT } from "../../constants/statusStyles";
import { PRESCRIPTION_STATUS_TINT } from "../../data/mockPrescriptions";

const RESULT_TINT = {
  Normal: "bg-emerald-50 text-emerald-600 ring-emerald-200",
  Abnormal: "bg-rose-50 text-rose-600 ring-rose-200",
};

export default function PatientHistory() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const patient = PATIENTS.find((p) => p.id === patientId);
  const appointments = mockAppointments
    .filter((a) => a.patientId === patientId)
    .sort((a, b) => (a.year - b.year) || (a.month - b.month) || (a.day - b.day));

  useEffect(() => {
    let mounted = true;
    Promise.all([fetchRecords(), fetchPrescriptions()]).then(([r, rx]) => {
      if (mounted) {
        setRecords(r.filter((x) => x.patientId === patientId));
        setPrescriptions(rx.filter((x) => x.patientId === patientId));
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, [patientId]);

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      <DoctorSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar title="Patient History" />

        <div className="flex-1 overflow-y-auto p-8">
          <button onClick={() => navigate(-1)} className="mb-4 flex items-center gap-1 text-xs font-medium text-slate-400 dark:text-slate-500 hover:text-slate-600">
            <ChevronLeft size={14} /> Back
          </button>

          {!patient ? (
            <p className="text-sm text-slate-400 dark:text-slate-500">Patient not found.</p>
          ) : (
            <div className="grid grid-cols-3 gap-6">
              {/* Patient snapshot */}
              <div className="col-span-1 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
                <div className="mb-4 flex items-center gap-3">
                  <Avatar name={patient.name} size="h-12 w-12" tint="bg-blue-100 text-blue-600" />
                  <div>
                    <p className="text-base font-semibold text-slate-800 dark:text-slate-100">{patient.name}</p>
                    <p className="text-sm text-slate-400 dark:text-slate-500">{patient.age} Years</p>
                  </div>
                </div>
                <div className="mb-3 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-900 p-3">
                    <p className="text-[10px] uppercase text-slate-400 dark:text-slate-500">Blood Group</p>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{patient.bloodGroup}</p>
                  </div>
                  <div className="rounded-xl bg-rose-50 dark:bg-rose-950/40 p-3">
                    <p className="flex items-center gap-1 text-[10px] uppercase text-rose-400"><ShieldAlert size={11} /> Allergies</p>
                    <p className="text-sm font-semibold text-rose-600">{patient.allergies}</p>
                  </div>
                </div>
                <div className="mb-3 rounded-xl border border-slate-100 dark:border-slate-700 p-3">
                  <p className="mb-1 text-[10px] uppercase text-slate-400 dark:text-slate-500">Emergency Contact</p>
                  <p className="text-xs text-slate-600 dark:text-slate-300">{patient.emergencyContact}</p>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-blue-50 dark:bg-blue-950 p-2">
                    <p className="text-lg font-bold text-blue-600">{appointments.length}</p>
                    <p className="text-[10px] text-blue-400">Visits</p>
                  </div>
                  <div className="rounded-lg bg-violet-50 dark:bg-violet-950 p-2">
                    <p className="text-lg font-bold text-violet-600">{records.length}</p>
                    <p className="text-[10px] text-violet-400">Records</p>
                  </div>
                  <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950 p-2">
                    <p className="text-lg font-bold text-emerald-600">{prescriptions.length}</p>
                    <p className="text-[10px] text-emerald-400">Rx</p>
                  </div>
                </div>
              </div>

              {/* History timeline */}
              <div className="col-span-2 space-y-6">
                {/* Appointment history */}
                <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
                  <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
                    <CalendarCheck size={15} /> Appointment History
                  </h3>
                  <div className="space-y-2">
                    {appointments.length === 0 && <p className="text-xs text-slate-400 dark:text-slate-500">No appointment history.</p>}
                    {appointments.map((a) => (
                      <div key={a.id} className="flex items-center justify-between rounded-xl border border-slate-100 dark:border-slate-700 px-3 py-2.5">
                        <div>
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{a.doctor} · {a.department}</p>
                          <p className="text-xs text-slate-400 dark:text-slate-500">October {a.day}, {a.year} · {a.time}</p>
                        </div>
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${STATUS_TINT[a.status]}`}>{a.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Medical records */}
                <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
                  <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
                    <FlaskConical size={15} /> Medical Records
                  </h3>
                  <div className="space-y-2">
                    {!loading && records.length === 0 && <p className="text-xs text-slate-400 dark:text-slate-500">No records on file.</p>}
                    {records.map((r) => (
                      <div key={r.id} className="flex items-center justify-between rounded-xl border border-slate-100 dark:border-slate-700 px-3 py-2.5">
                        <div>
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{r.reportName}</p>
                          <p className="text-xs text-slate-400 dark:text-slate-500">{r.date} · {r.doctor} · {r.category}</p>
                        </div>
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${RESULT_TINT[r.result]}`}>{r.result}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prescriptions */}
                <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
                  <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
                    <Pill size={15} /> Prescriptions
                  </h3>
                  <div className="space-y-2">
                    {!loading && prescriptions.length === 0 && <p className="text-xs text-slate-400 dark:text-slate-500">No prescriptions on file.</p>}
                    {prescriptions.map((rx) => (
                      <button
                        key={rx.id}
                        onClick={() => navigate(`/prescriptions/${rx.id}`)}
                        className="flex w-full items-center justify-between rounded-xl border border-slate-100 dark:border-slate-700 px-3 py-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-700"
                      >
                        <div>
                          <p className="text-sm font-medium text-blue-600">#{rx.code}</p>
                          <p className="text-xs text-slate-400 dark:text-slate-500">
                            {rx.medications.map((m) => m.name).join(", ")} · {rx.dateIssued}
                          </p>
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

        <Footer />
      </div>
    </div>
  );
}

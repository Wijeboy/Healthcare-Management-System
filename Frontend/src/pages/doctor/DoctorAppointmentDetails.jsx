import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ShieldAlert, Check, Clock, X, History } from "lucide-react";
import DoctorSidebar from "../../components/layout/DoctorSidebar";
import Topbar from "../../components/layout/Topbar";
import Footer from "../../components/layout/Footer";
import Avatar from "../../components/common/Avatar";
import { fetchAppointmentById, updateAppointmentStatus } from "../../api/appointmentsApi";
import { STATUS_TINT } from "../../constants/statusStyles";

export default function DoctorAppointmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchAppointmentById(id).then((data) => {
      if (mounted) {
        setAppointment(data);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, [id]);

  async function handleStatusChange(status) {
    setAppointment((prev) => ({ ...prev, status }));
    await updateAppointmentStatus(id, status);
  }

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      <DoctorSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar title="Appointment Details" />

        <div className="flex-1 overflow-y-auto p-8">
          <button
            onClick={() => navigate("/doctor/appointments/today")}
            className="mb-4 flex items-center gap-1 text-xs font-medium text-slate-400 dark:text-slate-500 hover:text-slate-600"
          >
            <ChevronLeft size={14} /> Back to Today's Appointments
          </button>

          {loading && <p className="text-sm text-slate-400 dark:text-slate-500">Loading…</p>}
          {!loading && !appointment && <p className="text-sm text-slate-400 dark:text-slate-500">Appointment not found.</p>}

          {!loading && appointment && (
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-1 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
                <div className="mb-4 flex items-center gap-3">
                  <Avatar name={appointment.patient} size="h-11 w-11" tint="bg-blue-100 text-blue-600" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{appointment.patient}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{appointment.patientProfile?.age} Years</p>
                  </div>
                </div>
                <div className="mb-3 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-900 p-3">
                    <p className="text-[10px] uppercase text-slate-400 dark:text-slate-500">Blood Group</p>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{appointment.patientProfile?.bloodGroup}</p>
                  </div>
                  <div className="rounded-xl bg-rose-50 dark:bg-rose-950/40 p-3">
                    <p className="flex items-center gap-1 text-[10px] uppercase text-rose-400"><ShieldAlert size={11} /> Allergies</p>
                    <p className="text-sm font-semibold text-rose-600">{appointment.patientProfile?.allergies}</p>
                  </div>
                </div>
                <div className="mb-3 rounded-xl border border-slate-100 dark:border-slate-700 p-3">
                  <p className="mb-1 text-[10px] uppercase text-slate-400 dark:text-slate-500">Emergency Contact</p>
                  <p className="text-xs text-slate-600 dark:text-slate-300">{appointment.patientProfile?.emergencyContact}</p>
                </div>
                <button
                  onClick={() => navigate(`/doctor/patients/${appointment.patientId}`)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm font-semibold text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  <History size={15} /> View Full Patient History
                </button>
              </div>

              <div className="col-span-2 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Appointment Details</h3>
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${STATUS_TINT[appointment.status]}`}>
                    <span className="h-1.5 w-1.5 rounded-full bg-current" /> {appointment.status}
                  </span>
                </div>
                <div className="mb-5 grid grid-cols-2 gap-4">
                  <div><p className="text-xs uppercase text-slate-400 dark:text-slate-500">Department</p><p className="text-sm font-medium text-slate-700 dark:text-slate-200">{appointment.department}</p></div>
                  <div><p className="text-xs uppercase text-slate-400 dark:text-slate-500">Time</p><p className="text-sm font-medium text-slate-700 dark:text-slate-200">{appointment.time}</p></div>
                  <div><p className="text-xs uppercase text-slate-400 dark:text-slate-500">Date</p><p className="text-sm font-medium text-slate-700 dark:text-slate-200">October {appointment.day}, 2026</p></div>
                </div>
                <div className="mb-5">
                  <p className="mb-1 text-xs uppercase text-slate-400 dark:text-slate-500">Reason / Notes</p>
                  <p className="rounded-xl bg-slate-50 dark:bg-slate-900 p-3 text-sm text-slate-600 dark:text-slate-300">{appointment.notes}</p>
                </div>
                <div className="flex flex-wrap gap-2 border-t border-slate-100 dark:border-slate-700 pt-4">
                  <button onClick={() => handleStatusChange("Completed")} className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
                    <Check size={14} /> Mark Consultation Complete
                  </button>
                  <button onClick={() => handleStatusChange("Pending")} className="flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700">
                    <Clock size={14} /> Mark Pending
                  </button>
                  <button onClick={() => handleStatusChange("Canceled")} className="flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700">
                    <X size={14} /> Cancel Appointment
                  </button>
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

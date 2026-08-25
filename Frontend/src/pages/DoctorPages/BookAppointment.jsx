import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Search, User, Clock, Check, ArrowRight } from "lucide-react";
import { PATIENTS, DOCTORS, formatHour, createAppointment } from "../../services/doctorApi";
import { getMonthMeta, shiftMonth, formatLongDate } from "../../utils/date";

const TIME_SLOTS = [
  { time: "09:00 AM", available: true }, { time: "09:30 AM", available: false },
  { time: "10:00 AM", available: true }, { time: "10:30 AM", available: false },
  { time: "11:00 AM", available: true }, { time: "01:30 PM", available: true },
  { time: "02:00 PM", available: false }, { time: "02:30 PM", available: false },
];

function toMondayFirst(jsWeekday) { return (jsWeekday + 6) % 7; }

export default function BookAppointmentPage() {
  const navigate = useNavigate();
  const [patientId, setPatientId] = useState(PATIENTS[0].id);
  const [doctorQuery, setDoctorQuery] = useState("");
  const [department, setDepartment] = useState("Cardiology");
  const [{ year, month }, setYearMonth] = useState({ year: 2026, month: 9 });
  const [selectedDay, setSelectedDay] = useState(5);
  const [selectedTime, setSelectedTime] = useState("10:00 AM");
  const [saving, setSaving] = useState(false);

  const meta = getMonthMeta(year, month);
  const startCol = toMondayFirst(meta.startWeekday);

  function goPrevMonth() { setYearMonth((prev) => shiftMonth(prev.year, prev.month, -1)); setSelectedDay(1); }
  function goNextMonth() { setYearMonth((prev) => shiftMonth(prev.year, prev.month, 1)); setSelectedDay(1); }

  const cells = [...Array.from({ length: startCol }, () => null), ...Array.from({ length: meta.daysInMonth }, (_, i) => i + 1)];
  const dayLabel = formatLongDate(year, month, selectedDay);

  async function handleConfirm() {
    const doctor = DOCTORS.find((d) => d.department === department) || DOCTORS[0];
    const patient = PATIENTS.find((p) => p.id === patientId);
    setSaving(true);
    await createAppointment({ patientId, patient: patient.name, doctor: doctor.name, department, year, month, day: selectedDay, weekday: null, hour: null, time: selectedTime, status: "Scheduled", notes: "New appointment." });
    setSaving(false);
    navigate("/doctor/appointments/today");
  }

  return (
    <div className="p-8">
      <button onClick={() => navigate("/doctor")} className="mb-3 flex items-center gap-1 text-xs font-medium text-on-surface-variant hover:text-on-surface"><ChevronLeft size={14} /> Back to Dashboard</button>
      <h2 className="text-xl font-bold text-primary">Schedule Appointment</h2>
      <p className="mt-1 text-sm text-on-surface-variant">Complete the steps below to book a consultation.</p>

      <div className="mt-6 max-w-3xl space-y-6">
        <div className="rounded-2xl border border-outline-variant bg-white p-6">
          <div className="mb-4 flex items-center gap-2.5"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">1</span><h3 className="text-sm font-semibold text-on-surface">Select Provider</h3></div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-on-surface-variant">Patient Name</label>
              <div className="relative">
                <select value={patientId} onChange={(e) => setPatientId(e.target.value)} className="w-full appearance-none rounded-lg border border-outline-variant bg-white px-3 py-2.5 text-sm text-on-surface focus:border-primary focus:outline-none">
                  {PATIENTS.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
                <User size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-on-surface-variant">Doctor (Optional)</label>
              <div className="relative">
                <input value={doctorQuery} onChange={(e) => setDoctorQuery(e.target.value)} placeholder="Search by doctor name" className="w-full rounded-lg border border-outline-variant bg-white px-3 py-2.5 pr-9 text-sm text-on-surface placeholder:text-slate-400 focus:border-primary focus:outline-none" />
                <Search size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-1.5 block text-xs font-medium text-on-surface-variant">Department (Optional)</label>
            <select value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full max-w-xs rounded-lg border border-outline-variant bg-white px-3 py-2.5 text-sm text-on-surface focus:border-primary focus:outline-none">
              {[...new Set(DOCTORS.map((d) => d.department))].map((dep) => <option key={dep}>{dep}</option>)}
            </select>
          </div>
        </div>

        <div className="rounded-2xl border border-outline-variant bg-white p-6">
          <div className="mb-4 flex items-center gap-2.5"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">2</span><h3 className="text-sm font-semibold text-on-surface">Choose Date</h3></div>
          <div className="flex gap-5">
            <div className="flex-1">
              <div className="mb-3 flex items-center justify-between">
                <button onClick={goPrevMonth} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"><ChevronLeft size={16} /></button>
                <p className="text-sm font-semibold text-on-surface">{meta.label}</p>
                <button onClick={goNextMonth} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"><ChevronRight size={16} /></button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-medium text-slate-400">
                <div>MO</div><div>TU</div><div>WE</div><div>TH</div><div>FR</div><div>SA</div><div>SU</div>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {cells.map((day, i) => {
                  if (!day) return <div key={i} />;
                  const isSelected = day === selectedDay;
                  return (
                    <button key={day} onClick={() => setSelectedDay(day)} className={`rounded-lg py-1.5 text-sm font-medium transition ${isSelected ? "bg-primary text-white" : "text-on-surface-variant hover:bg-slate-100"}`}>{day}</button>
                  );
                })}
              </div>
            </div>
            <div className="w-44 shrink-0 rounded-xl bg-blue-50 p-4 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-blue-400">Selected Date</p>
              <p className="text-3xl font-bold text-primary">{selectedDay}</p>
              <p className="text-xs text-blue-500">{dayLabel}</p>
              <p className="mt-3 text-[11px] text-blue-400">{TIME_SLOTS.filter((s) => s.available).length} time slots currently available for this day.</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-outline-variant bg-white p-6">
          <div className="mb-4 flex items-center gap-2.5"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">3</span><h3 className="text-sm font-semibold text-on-surface">Select Time Slot</h3></div>
          <div className="grid grid-cols-4 gap-2">
            {TIME_SLOTS.map((slot) => {
              const isSelected = slot.time === selectedTime;
              if (!slot.available) return <button key={slot.time} disabled className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-100 bg-slate-50 py-2.5 text-xs font-medium text-slate-300"><Clock size={13} /> {slot.time}</button>;
              return (
                <button key={slot.time} onClick={() => setSelectedTime(slot.time)} className={`flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-xs font-medium transition ${isSelected ? "bg-primary text-white" : "border border-outline-variant bg-white text-on-surface-variant hover:bg-slate-50"}`}>
                  {isSelected ? <Check size={13} /> : <Clock size={13} />} {slot.time}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end gap-3 pb-6">
          <button onClick={() => navigate("/doctor")} className="rounded-lg px-5 py-2.5 text-sm font-medium text-on-surface-variant hover:text-on-surface">Cancel</button>
          <button onClick={handleConfirm} disabled={saving} className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-container disabled:opacity-50">
            {saving ? "Booking\u2026" : "Confirm Booking"} <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

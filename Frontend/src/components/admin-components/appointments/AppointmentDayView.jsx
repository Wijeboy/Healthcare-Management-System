import { useState } from 'react'

const initialAppointments = [
  {
    id: 1,
    initials: 'IL',
    patient: 'Imasha Lankeshi',
    doctor: 'Dr. Nimal Perera',
    department: 'Cardiology',
    dateTime: 'Oct 25, 2026 · 08:00 AM',
    status: 'Scheduled',
  },
  {
    id: 2,
    initials: 'SR',
    patient: 'Sanduni Rathnayake',
    doctor: 'Dr. Kasun Fernando',
    department: 'Orthopedics',
    dateTime: 'Oct 25, 2026 · 09:00 AM',
    status: 'Completed',
  },
  {
    id: 3,
    initials: 'KP',
    patient: 'Kavindu Perera',
    doctor: 'Dr. Sunimal Silva',
    department: 'Dermatology',
    dateTime: 'Oct 25, 2026 · 08:00 AM',
    status: 'Pending',
  },
  {
    id: 4,
    initials: 'IL',
    patient: 'Imasha Lankeshi',
    doctor: 'Dr. Nimal Perera',
    department: 'Cardiology',
    dateTime: 'Oct 25, 2026 · 10:00 AM',
    status: 'Scheduled',
  },
  {
    id: 5,
    initials: 'SR',
    patient: 'Sanduni Rathnayake',
    doctor: 'Dr. Kasun Fernando',
    department: 'Orthopedics',
    dateTime: 'Oct 25, 2026 · 01:00 PM',
    status: 'Scheduled',
  },
  {
    id: 6,
    initials: 'DW',
    patient: 'Dinuka Wickramasinghe',
    doctor: 'Dr. Anoma Jayasuriya',
    department: 'Neurology',
    dateTime: 'Oct 25, 2026 · 09:00 AM',
    status: 'Canceled',
  },
  {
    id: 7,
    initials: 'KP',
    patient: 'Kavindu Perera',
    doctor: 'Dr. Sunimal Silva',
    department: 'Dermatology',
    dateTime: 'Oct 25, 2026 · 11:00 AM',
    status: 'Pending',
  },
]

const statuses = ['Scheduled', 'Completed', 'Pending', 'Canceled']

function getStatusClasses(status) {
  if (status === 'Scheduled') {
    return 'border-blue-300 bg-blue-50 text-blue-700'
  }

  if (status === 'Completed') {
    return 'border-emerald-300 bg-emerald-50 text-emerald-700'
  }

  if (status === 'Pending') {
    return 'border-amber-300 bg-amber-50 text-amber-600'
  }

  if (status === 'Canceled') {
    return 'border-red-300 bg-red-50 text-red-600'
  }

  return 'border-slate-300 bg-white text-slate-600'
}

export default function AppointmentDayView() {
  const [appointments, setAppointments] = useState(initialAppointments)

  function handleStatusChange(id, newStatus) {
    setAppointments((currentAppointments) =>
      currentAppointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: newStatus }
          : appointment
      )
    )
  }

  return (
    <div className="bg-white">

      {/* Table Header */}
      <div className="grid grid-cols-[1.35fr_1fr_1.15fr_1.35fr_1fr_90px] border-b border-outline-variant bg-surface-container-low px-6 py-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Patient
        </div>

        <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Doctor
        </div>

        <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Department
        </div>

        <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Date &amp; Time
        </div>

        <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Status
        </div>

        <div className="text-center text-xs font-semibold uppercase tracking-wide text-slate-400">
          View
        </div>
      </div>

      {/* Appointment Rows */}
      {appointments.map((appointment) => (
        <div
          key={appointment.id}
          className="grid min-h-[78px] grid-cols-[1.35fr_1fr_1.15fr_1.35fr_1fr_90px] items-center border-b border-slate-200 px-6"
        >

          {/* Patient */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-600">
              {appointment.initials}
            </div>

            <p className="font-semibold text-slate-800">
              {appointment.patient}
            </p>
          </div>

          {/* Doctor */}
          <div className="text-sm text-slate-600">
            {appointment.doctor}
          </div>

          {/* Department */}
          <div className="text-sm text-slate-600">
            {appointment.department}
          </div>

          {/* Date & Time */}
          <div className="text-sm text-slate-600">
            {appointment.dateTime}
          </div>

          {/* Status */}
          <div>
            <select
              value={appointment.status}
              onChange={(event) =>
                handleStatusChange(appointment.id, event.target.value)
              }
              className={`min-w-[120px] rounded-full border px-4 py-2 text-xs font-semibold outline-none ${getStatusClasses(
                appointment.status
              )}`}
            >
              {statuses.map((status) => (
                <option
                  key={status}
                  value={status}
                >
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* View */}
          <div className="text-center">
            <button
              type="button"
              className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-primary"
              aria-label={`View ${appointment.patient}`}
            >
              <span className="material-symbols-outlined text-[19px]">
                visibility
              </span>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
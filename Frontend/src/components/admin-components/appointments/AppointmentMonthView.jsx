import { useState } from 'react'

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const appointmentsByDay = {
  23: [
    {
      id: 1,
      patient: 'Kavindu Perera',
      doctor: 'Dr. Sunimal Silva',
      time: '08:00 AM',
      status: 'Completed',
    },
    {
      id: 2,
      patient: 'Imasha Lankeshi',
      doctor: 'Dr. Nimal Perera',
      time: '10:00 AM',
      status: 'Scheduled',
    },
  ],

  25: [
    {
      id: 3,
      initials: 'KP',
      patient: 'Kavindu Perera',
      doctor: 'Dr. Sunimal Silva',
      time: '08:00 AM',
      status: 'Pending',
    },
    {
      id: 4,
      initials: 'IL',
      patient: 'Imasha Lankeshi',
      doctor: 'Dr. Nimal Perera',
      time: '10:00 AM',
      status: 'Scheduled',
    },
    {
      id: 5,
      initials: 'SR',
      patient: 'Sanduni Rathnayake',
      doctor: 'Dr. Kasun Fernando',
      time: '01:00 PM',
      status: 'Scheduled',
    },
  ],

  26: [
    {
      id: 6,
      patient: 'Dinuka Wickramasinghe',
      doctor: 'Dr. Anoma Jayasuriya',
      time: '09:00 AM',
      status: 'Canceled',
    },
  ],

  27: [
    {
      id: 7,
      patient: 'Kavindu Perera',
      doctor: 'Dr. Sunimal Silva',
      time: '11:00 AM',
      status: 'Pending',
    },
  ],
}

function getStatusDot(status) {
  if (status === 'Completed') return 'bg-emerald-700'
  if (status === 'Scheduled') return 'bg-blue-800'
  if (status === 'Pending') return 'bg-amber-500'
  if (status === 'Canceled') return 'bg-red-700'

  return 'bg-slate-400'
}

function getStatusBadge(status) {
  if (status === 'Pending') {
    return 'border-amber-300 bg-amber-50 text-amber-600'
  }

  if (status === 'Scheduled') {
    return 'border-blue-300 bg-blue-50 text-blue-700'
  }

  if (status === 'Completed') {
    return 'border-emerald-300 bg-emerald-50 text-emerald-700'
  }

  if (status === 'Canceled') {
    return 'border-red-300 bg-red-50 text-red-700'
  }

  return 'border-slate-300 bg-slate-50 text-slate-600'
}

export default function AppointmentMonthView() {
  const [selectedDay, setSelectedDay] = useState(25)

  // October 1, 2026 is Thursday.
  // Sunday = 0, therefore we need 4 empty cells before day 1.
  const emptyDays = Array.from({ length: 4 })

  const days = Array.from({ length: 31 }, (_, index) => index + 1)

  const selectedAppointments = appointmentsByDay[selectedDay] || []

  return (
    <div className="grid grid-cols-1 gap-4 bg-surface p-5 lg:grid-cols-[1.7fr_1fr]">

      {/* =========================
          Monthly Calendar
      ========================== */}
      <div className="rounded-2xl border border-outline-variant bg-white p-5">

        <h3 className="mb-5 text-sm font-semibold text-on-surface">
          October 2026
        </h3>

        {/* Weekday names */}
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((day) => (
            <div
              key={day}
              className="pb-2 text-center text-xs font-medium text-on-surface-variant"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar */}
        <div className="grid grid-cols-7 gap-1">

          {/* Empty cells before October 1 */}
          {emptyDays.map((_, index) => (
            <div
              key={`empty-${index}`}
              className="min-h-[80px]"
            />
          ))}

          {/* Month days */}
          {days.map((day) => {
            const isSelected = selectedDay === day
            const appointments = appointmentsByDay[day] || []

            return (
              <button
                key={day}
                type="button"
                onClick={() => setSelectedDay(day)}
                className={`min-h-[80px] rounded-lg border p-2 text-left transition ${
                  isSelected
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50'
                }`}
              >
                <span className="text-xs font-medium text-on-surface-variant">
                  {day}
                </span>

                {/* Appointment dots */}
                {appointments.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {appointments.map((appointment) => (
                      <span
                        key={appointment.id}
                        className={`h-1.5 w-1.5 rounded-full ${getStatusDot(
                          appointment.status
                        )}`}
                      />
                    ))}
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* =========================
          Selected Day Appointments
      ========================== */}
      <div className="min-h-[520px] rounded-2xl border border-outline-variant bg-white p-5">

        <h3 className="mb-4 text-sm font-semibold text-on-surface">
          Appointments — Oct {selectedDay}
        </h3>

        {selectedAppointments.length === 0 ? (
          <div className="flex min-h-[250px] items-center justify-center text-center">
            <div>
              <span className="material-symbols-outlined text-4xl text-slate-300">
                event_busy
              </span>

              <p className="mt-2 text-sm text-on-surface-variant">
                No appointments scheduled for this date.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {selectedAppointments.map((appointment) => {
              const initials =
                appointment.initials ||
                appointment.patient
                  .split(' ')
                  .map((name) => name[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()

              return (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-3"
                >
                  {/* Patient */}
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
                      {initials}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-on-surface">
                        {appointment.patient}
                      </p>

                      <p className="mt-1 truncate text-[11px] text-on-surface-variant">
                        {appointment.doctor} · {appointment.time}
                      </p>
                    </div>
                  </div>

                  {/* Status */}
                  <span
                    className={`shrink-0 rounded-full border px-3 py-1 text-[10px] font-semibold ${getStatusBadge(
                      appointment.status
                    )}`}
                  >
                    ● {appointment.status}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>

    </div>
  )
}
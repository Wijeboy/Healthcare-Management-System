// src/pages/AppointmentBooking.jsx
import React, { useMemo, useState } from 'react';
import Sidebar from '../../components/common/Sidebar';
import Header from '../../components/common/Header';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  User,
  Clock,
  CheckCircle2
} from 'lucide-react';

const mockPatient = {
  id: 'P001',
  name: 'Imasha Perera',
  email: 'imasha@example.com',
  phone: '+94 77 123 4567',
};

const departments = [
  'Cardiology',
  'General Medicine',
  'Neurology',
  'Dermatology',
  'Pediatrics',
  'Orthopedics'
];

const doctors = [
  { id: 'D1', name: 'Dr. Sarah Jayawardhana', department: 'Cardiology' },
  { id: 'D2', name: 'Dr. Akash Pathirana', department: 'Cardiology' },
  { id: 'D3', name: 'Dr. Harsha Silva', department: 'General Medicine' },
  { id: 'D4', name: 'Dr. Imasha Sewwandi', department: 'Dermatology' },
  { id: 'D5', name: 'Dr. Minidu Punsara', department: 'Neurology' },
];

const patients = [
  'Imasha Sewwandi',
  'Kavindu Perera',
  'Nethmi Fernando'
];

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM',
  '10:30 AM', '11:00 AM', '2:00 PM',
  '2:30 PM', '3:00 PM', '3:30 PM'
];

const bookedSlots = ['10:00 AM', '3:00 PM'];

const WEEKDAYS = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];

const StepHeader = ({ number, title, complete }) => (
  <div className="flex items-center space-x-3 mb-6">
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
        complete ? 'bg-primary text-white' : 'bg-primary text-white'
      }`}
    >
      {complete ? <CheckCircle2 size={18} /> : number}
    </div>
    <h2 className="text-lg font-bold text-gray-800">{title}</h2>
  </div>
);

const AppointmentBooking = () => {
  const [department, setDepartment] = useState('Cardiology');
  const [doctorQuery, setDoctorQuery] = useState('Dr. Sarah');
  const [showDoctorList, setShowDoctorList] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [patientName, setPatientName] = useState('Imasha Sewwandi');

  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today);

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      const matchesDept = !department || doc.department === department;
      const matchesQuery = doc.name.toLowerCase().includes(doctorQuery.toLowerCase());
      return matchesDept && matchesQuery;
    });
  }, [department, doctorQuery]);

  const monthLabel = new Date(viewYear, viewMonth).toLocaleString('default', {
    month: 'long',
    year: 'numeric'
  });

  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1);
    // Convert Sunday(0)-Saturday(6) into Monday-first index
    const startOffset = (firstDay.getDay() + 6) % 7;
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate();

    const cells = [];
    for (let i = startOffset; i > 0; i--) {
      cells.push({ day: prevMonthDays - i + 1, inMonth: false });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ day: d, inMonth: true });
    }
    while (cells.length % 7 !== 0) {
      cells.push({ day: cells.length, inMonth: false });
    }
    return cells;
  }, [viewMonth, viewYear]);

  const isPastDate = (day) => {
    const d = new Date(viewYear, viewMonth, day);
    d.setHours(0, 0, 0, 0);
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return d < t;
  };

  const isSelected = (day) =>
    selectedDate &&
    selectedDate.getDate() === day &&
    selectedDate.getMonth() === viewMonth &&
    selectedDate.getFullYear() === viewYear;

  const goToPrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const goToNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleSelectDoctor = (doc) => {
    setSelectedDoctor(doc);
    setDoctorQuery(doc.name);
    setDepartment(doc.department);
    setShowDoctorList(false);
  };

  const availableSlotCount = timeSlots.length - bookedSlots.length;

  const handleConfirm = () => {
    if (!selectedDoctor || !selectedSlot) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar patientData={mockPatient} />
      <Header />

      <main className="ml-64 pt-20 p-6">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-primary mb-1">Schedule Appointment</h1>
            <p className="text-gray-500 text-sm">Complete the steps below to book a consultation.</p>
          </div>

          {submitted ? (
            <div className="bg-white rounded-xl shadow-md p-10 text-center">
              <CheckCircle2 size={56} className="mx-auto text-success mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Appointment Requested</h3>
              <p className="text-gray-500 mb-6">
                {selectedDoctor?.name} · {selectedDate.toLocaleDateString('default', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                })} · {selectedSlot}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium"
              >
                Book Another Appointment
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Step 1 - Select Provider */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <StepHeader number={1} title="Select Provider" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Department */}
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">
                      Department <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <select
                        value={department}
                        onChange={(e) => {
                          setDepartment(e.target.value);
                          setSelectedDoctor(null);
                        }}
                        className="w-full appearance-none pl-4 pr-10 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary focus:border-transparent text-gray-700"
                      >
                        <option value="">All Departments</option>
                        {departments.map((dept) => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                      <Stethoscope
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                        size={16}
                      />
                    </div>
                  </div>

                  {/* Doctor */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-500 mb-2">
                      Doctor <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary-light flex items-center justify-center overflow-hidden">
                        <User size={14} className="text-primary" />
                      </div>
                      <input
                        type="text"
                        value={doctorQuery}
                        onChange={(e) => {
                          setDoctorQuery(e.target.value);
                          setSelectedDoctor(null);
                          setShowDoctorList(true);
                        }}
                        onFocus={() => setShowDoctorList(true)}
                        onBlur={() => setTimeout(() => setShowDoctorList(false), 150)}
                        placeholder="Search doctor..."
                        className="w-full pl-11 pr-10 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary focus:border-transparent text-gray-700"
                      />
                      <Search
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={16}
                      />
                    </div>

                    {showDoctorList && (
                      <div className="absolute z-20 mt-1 w-full bg-white border border-gray-100 rounded-lg shadow-lg overflow-hidden">
                        {filteredDoctors.length > 0 ? (
                          filteredDoctors.map((doc) => (
                            <button
                              type="button"
                              key={doc.id}
                              onMouseDown={() => handleSelectDoctor(doc)}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary-light hover:text-primary transition-colors"
                            >
                              {doc.name}
                              <span className="block text-xs text-gray-400">{doc.department}</span>
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-3 text-sm text-gray-400">No doctors found</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Patient Name */}
                <div className="mt-6 max-w-md">
                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    Patient Name
                  </label>
                  <select
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full appearance-none px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary focus:border-transparent text-gray-700"
                  >
                    {patients.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Step 2 - Choose Date */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <StepHeader number={2} title="Choose Date" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Calendar */}
                  <div className="md:col-span-2 border border-gray-100 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={goToPrevMonth}
                        className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <span className="font-semibold text-gray-800">{monthLabel}</span>
                      <button
                        onClick={goToNextMonth}
                        className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>

                    <div className="grid grid-cols-7 gap-y-2 text-center text-xs font-semibold text-gray-400 mb-2">
                      {WEEKDAYS.map((wd) => (
                        <div key={wd}>{wd}</div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-y-2 text-center text-sm">
                      {calendarDays.map((cell, idx) => {
                        const disabled = !cell.inMonth || isPastDate(cell.day);
                        const selected = cell.inMonth && isSelected(cell.day);
                        return (
                          <button
                            key={idx}
                            disabled={disabled}
                            onClick={() => {
                              setSelectedDate(new Date(viewYear, viewMonth, cell.day));
                              setSelectedSlot(null);
                            }}
                            className={`mx-auto w-8 h-8 rounded-full text-sm transition-colors ${
                              selected
                                ? 'bg-primary text-white font-semibold'
                                : disabled
                                ? 'text-gray-300 cursor-not-allowed'
                                : 'text-gray-700 hover:bg-primary-light hover:text-primary'
                            }`}
                          >
                            {cell.day}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Selected Date Summary */}
                  <div className="bg-primary-light rounded-xl p-5 flex flex-col justify-center">
                    <p className="text-xs font-semibold tracking-wide text-primary mb-2">SELECTED DATE</p>
                    <p className="text-4xl font-bold text-gray-800 mb-1">
                      {String(selectedDate.getDate()).padStart(2, '0')}
                    </p>
                    <p className="text-sm font-medium text-gray-700 mb-4">
                      {selectedDate.toLocaleDateString('default', { weekday: 'long', month: 'long' })}
                    </p>
                    <p className="text-sm text-gray-600">
                      {availableSlotCount} time slots currently available for this day.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 - Select Time Slot */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <StepHeader number={3} title="Select Time Slot" />

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {timeSlots.map((slot) => {
                    const isBooked = bookedSlots.includes(slot);
                    const isChosen = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={isBooked}
                        onClick={() => setSelectedSlot(slot)}
                        className={`flex items-center justify-center space-x-1.5 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                          isBooked
                            ? 'border-gray-100 text-gray-300 bg-gray-50 cursor-not-allowed line-through'
                            : isChosen
                            ? 'border-primary bg-primary text-white'
                            : 'border-gray-200 text-gray-700 hover:border-primary hover:text-primary'
                        }`}
                      >
                        <Clock size={14} />
                        <span>{slot}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Confirm */}
              <div className="flex justify-end">
                <button
                  onClick={handleConfirm}
                  disabled={!selectedDoctor || !selectedSlot}
                  className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Confirm Appointment
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};


export default AppointmentBooking;
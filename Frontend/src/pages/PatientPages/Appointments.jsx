// src/pages/PatientPages/Appointments.jsx
import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Search, 
  Filter, 
  Check, 
  Ban, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight,
  MapPin,
  Eye,
  X,
  CheckCircle2
} from 'lucide-react';

const mockDoctorsList = [
  { id: 'd1', name: 'Dr. Sarah Jayawardhana', department: 'Cardiology', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=120' },
  { id: 'd2', name: 'Dr. Akash Pathirana', department: 'Neurology', avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=120' },
  { id: 'd3', name: 'Dr. Harsha Silva', department: 'General Medicine', avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=120' },
  { id: 'd4', name: 'Dr. Imasha Sewwandi', department: 'Dermatology', avatar: 'https://images.unsplash.com/photo-1594824813571-24a698277907?auto=format&fit=crop&q=80&w=120' },
  { id: 'd5', name: 'Dr. Minidu Punsara', department: 'Pediatrics', avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=120' }
];

const mockTimeSlots = [
  { time: '09:00 AM', status: 'available' },
  { time: '09:30 AM', status: 'available' },
  { time: '10:00 AM', status: 'selected' },
  { time: '10:30 AM', status: 'available' },
  { time: '11:00 AM', status: 'available' },
  { time: '01:30 PM', status: 'available' },
  { time: '02:00 PM', status: 'disabled' },
  { time: '02:30 PM', status: 'available' },
];

const initialAppointments = [
  {
    id: '1',
    date: 'October 05, 2023',
    time: '10:00 AM',
    doctor: 'Dr. Sarah Jayawardhana',
    department: 'Cardiology',
    patient: 'Imasha Sewwandi',
    status: 'Confirmed'
  },
  {
    id: '2',
    date: 'October 12, 2023',
    time: '02:30 PM',
    doctor: 'Dr. Akash Pathirana',
    department: 'Neurology',
    patient: 'Imasha Sewwandi',
    status: 'Pending'
  }
];

export default function Appointments() {
  const [activeView, setActiveView] = useState('schedule'); // 'schedule' or 'list'
  
  // Schedule Form State
  const [department, setDepartment] = useState('Cardiology');
  const [doctorSearch, setDoctorSearch] = useState('Dr. Sarah');
  const [selectedDoctor, setSelectedDoctor] = useState(mockDoctorsList[0]);
  const [showDoctorDropdown, setShowDoctorDropdown] = useState(false);
  const [patientName, setPatientName] = useState('Imasha Sewwandi');
  
  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date(2023, 9, 1)); // October 2023
  const [selectedDay, setSelectedDay] = useState(5);
  
  // Time Slot State
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  
  // Booked Appointments State
  const [appointments, setAppointments] = useState(initialAppointments);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Month navigation
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayOfWeekNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const monthYearStr = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  
  // Get weekday for selectedDay in October 2023
  const selectedDateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay);
  const dayOfWeekStr = dayOfWeekNames[selectedDateObj.getDay()];

  const handleConfirmBooking = () => {
    const newAppointment = {
      id: Date.now().toString(),
      date: `${monthNames[currentDate.getMonth()]} ${selectedDay < 10 ? '0' + selectedDay : selectedDay}, ${currentDate.getFullYear()}`,
      time: selectedTime,
      doctor: selectedDoctor ? selectedDoctor.name : doctorSearch,
      department: department || 'General',
      patient: patientName,
      status: 'Confirmed'
    };
    
    setAppointments([newAppointment, ...appointments]);
    setBookingSuccess(true);
  };

  const filteredDoctors = mockDoctorsList.filter(d => 
    d.name.toLowerCase().includes(doctorSearch.toLowerCase()) ||
    d.department.toLowerCase().includes(doctorSearch.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* Top Header & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#003f87] tracking-tight">
            Appointments
          </h1>
        </div>
        <div className="flex items-center gap-2 bg-gray-200/70 p-1 rounded-xl">
          <button
            onClick={() => { setActiveView('schedule'); setBookingSuccess(false); }}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === 'schedule' 
                ? 'bg-white text-[#003f87] shadow-xs' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Schedule Appointment
          </button>
          <button
            onClick={() => setActiveView('list')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeView === 'list' 
                ? 'bg-white text-[#003f87] shadow-xs' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span>My Bookings</span>
            <span className="bg-[#1d70f5] text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
              {appointments.length}
            </span>
          </button>
        </div>
      </div>

      {bookingSuccess ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center max-w-xl mx-auto shadow-sm animate-fade-in">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={36} />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Appointment Booked Successfully!</h2>
          <p className="text-sm text-gray-600 mb-6">
            Your appointment with <span className="font-semibold text-gray-800">{selectedDoctor?.name || doctorSearch}</span> is confirmed for <span className="font-semibold text-gray-800">{monthNames[currentDate.getMonth()]} {selectedDay}, {currentDate.getFullYear()}</span> at <span className="font-semibold text-gray-800">{selectedTime}</span>.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setBookingSuccess(false)}
              className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-xs font-semibold hover:bg-gray-200 transition-all"
            >
              Schedule Another
            </button>
            <button
              onClick={() => setActiveView('list')}
              className="px-5 py-2.5 bg-[#1d70f5] text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition-all shadow-xs"
            >
              View My Bookings
            </button>
          </div>
        </div>
      ) : activeView === 'schedule' ? (
        <div>
          {/* Section Subheading */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#003f87]">Schedule Appointment</h2>
            <p className="text-xs text-gray-500 mt-1">Complete the steps below to book a consultation.</p>
          </div>

          {/* STEP 1: Select Provider */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-7 h-7 rounded-full bg-[#1d70f5] text-white flex items-center justify-center text-xs font-bold shrink-0">
                1
              </div>
              <h3 className="text-base font-bold text-gray-800">Select Provider</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              {/* Department (Optional) */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Department (Optional)
                </label>
                <div className="relative">
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full pl-3.5 pr-10 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1d70f5]/20 focus:border-[#1d70f5] appearance-none"
                  >
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="General Medicine">General Medicine</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Orthopedics">Orthopedics</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xl">
                    filter_alt
                  </span>
                </div>
              </div>

              {/* Doctor (Optional) */}
              <div className="relative">
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Doctor (Optional)
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                    <img
                      src={selectedDoctor?.avatar || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=120"}
                      alt="Doctor Avatar"
                      className="w-6 h-6 rounded-full object-cover border border-white"
                    />
                  </div>
                  <input
                    type="text"
                    value={doctorSearch}
                    onChange={(e) => {
                      setDoctorSearch(e.target.value);
                      setShowDoctorDropdown(true);
                    }}
                    onFocus={() => setShowDoctorDropdown(true)}
                    className="w-full pl-11 pr-10 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1d70f5]/20 focus:border-[#1d70f5]"
                    placeholder="Search doctor..."
                  />
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xl">
                    search
                  </span>
                </div>

                {/* Doctor Select Dropdown Menu */}
                {showDoctorDropdown && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden py-1 max-h-56 overflow-y-auto">
                    {filteredDoctors.map((doc) => (
                      <div
                        key={doc.id}
                        onClick={() => {
                          setSelectedDoctor(doc);
                          setDoctorSearch(doc.name);
                          setDepartment(doc.department);
                          setShowDoctorDropdown(false);
                        }}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50/60 cursor-pointer transition-colors"
                      >
                        <img src={doc.avatar} alt={doc.name} className="w-7 h-7 rounded-full object-cover shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-gray-800">{doc.name}</p>
                          <p className="text-[11px] text-gray-500">{doc.department}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Patient Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Patient Name
              </label>
              <div className="relative">
                <select
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1d70f5]/20 focus:border-[#1d70f5] appearance-none"
                >
                  <option value="Imasha Sewwandi">Imasha Sewwandi</option>
                  <option value="Kavindi Perera">Kavindi Perera</option>
                  <option value="Sunil Perera">Sunil Perera</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xl">
                  expand_more
                </span>
              </div>
            </div>
          </div>

          {/* STEP 2: Choose Date */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-7 h-7 rounded-full bg-[#1d70f5] text-white flex items-center justify-center text-xs font-bold shrink-0">
                2
              </div>
              <h3 className="text-base font-bold text-gray-800">Choose Date</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Calendar Grid */}
              <div className="lg:col-span-8 bg-gray-50/50 p-4 rounded-xl border border-gray-200/50">
                {/* Month Selector */}
                <div className="flex items-center justify-between mb-4 px-2">
                  <button 
                    onClick={prevMonth}
                    className="p-1 rounded-lg hover:bg-gray-200 text-gray-600 transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span className="text-xs font-bold text-gray-800 tracking-wide uppercase">
                    {monthYearStr}
                  </span>
                  <button 
                    onClick={nextMonth}
                    className="p-1 rounded-lg hover:bg-gray-200 text-gray-600 transition-colors"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                {/* Day Header */}
                <div className="grid grid-cols-7 text-center mb-2">
                  {['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'].map((day) => (
                    <div key={day} className="text-[11px] font-bold text-gray-400 py-1">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 text-center gap-1">
                  {/* Muted Previous Month Days */}
                  {[25, 26, 27, 28, 29, 30].map((d) => (
                    <div key={`prev-${d}`} className="py-2 text-xs text-gray-300 select-none">
                      {d}
                    </div>
                  ))}

                  {/* Current Month Days */}
                  {Array.from({ length: 15 }, (_, i) => i + 1).map((dayNum) => {
                    const isSelected = selectedDay === dayNum;
                    return (
                      <button
                        key={`day-${dayNum}`}
                        onClick={() => setSelectedDay(dayNum)}
                        className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center ${
                          isSelected
                            ? 'bg-[#1d70f5] text-white shadow-xs scale-105'
                            : 'text-gray-700 hover:bg-blue-50 hover:text-[#1d70f5]'
                        }`}
                      >
                        {dayNum}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Date Side Panel */}
              <div className="lg:col-span-4 bg-[#ebf3ff] border border-[#d0e2ff] rounded-xl p-6 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-bold tracking-widest text-[#1d70f5] uppercase mb-1">
                  Selected Date
                </span>
                <span className="text-5xl font-extrabold text-[#1d70f5] my-1 tracking-tight">
                  {selectedDay < 10 ? `0${selectedDay}` : selectedDay}
                </span>
                <span className="text-xs font-bold text-gray-800">
                  {dayOfWeekStr}, {monthNames[currentDate.getMonth()]}
                </span>
                <p className="text-[11px] text-gray-500 mt-4 leading-normal max-w-[160px]">
                  3 time slots currently available for this day.
                </p>
              </div>
            </div>
          </div>

          {/* STEP 3: Select Time Slot */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-7 h-7 rounded-full bg-[#1d70f5] text-white flex items-center justify-center text-xs font-bold shrink-0">
                3
              </div>
              <h3 className="text-base font-bold text-gray-800">Select Time Slot</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {mockTimeSlots.map((slot) => {
                const isSelected = selectedTime === slot.time;
                const isDisabled = slot.status === 'disabled';

                return (
                  <button
                    key={slot.time}
                    disabled={isDisabled}
                    onClick={() => setSelectedTime(slot.time)}
                    className={`py-3 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 border ${
                      isSelected
                        ? 'bg-[#1d70f5] border-[#1d70f5] text-white shadow-xs'
                        : isDisabled
                        ? 'bg-gray-100/80 border-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50/30'
                    }`}
                  >
                    {isSelected ? (
                      <Check size={14} className="text-white shrink-0" />
                    ) : isDisabled ? (
                      <Ban size={14} className="text-gray-400 shrink-0" />
                    ) : (
                      <Clock size={14} className="text-gray-400 shrink-0" />
                    )}
                    <span>{slot.time}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setSelectedTime('10:00 AM');
                setSelectedDay(5);
                setDepartment('Cardiology');
              }}
              className="px-5 py-2.5 text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmBooking}
              className="px-6 py-2.5 bg-[#1d70f5] hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <span>Confirm Booking</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      ) : (
        /* MY BOOKINGS VIEW */
        <div className="space-y-4 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Your Booked Appointments</h2>
            <button
              onClick={() => setActiveView('schedule')}
              className="px-4 py-2 bg-[#1d70f5] text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition-all flex items-center gap-1.5 shadow-xs"
            >
              <span>+ New Appointment</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appointments.map((apt) => (
              <div key={apt.id} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      apt.status === 'Confirmed' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                    }`}>
                      {apt.status}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">Ref: #APT-{apt.id}</span>
                  </div>

                  <h3 className="text-base font-bold text-gray-800 mb-1">{apt.doctor}</h3>
                  <p className="text-xs text-[#1d70f5] font-semibold mb-4">{apt.department}</p>

                  <div className="space-y-2 text-xs text-gray-600 bg-gray-50/80 p-3 rounded-xl border border-gray-200/50">
                    <div className="flex items-center gap-2">
                      <CalendarIcon size={14} className="text-gray-400" />
                      <span>{apt.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-gray-400" />
                      <span>{apt.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-gray-400" />
                      <span>Patient: {apt.patient}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setAppointments(appointments.filter(a => a.id !== apt.id));
                    }}
                    className="px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

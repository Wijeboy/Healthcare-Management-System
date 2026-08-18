// src/pages/BookAppointment.jsx
import React, { useState } from 'react';
import Sidebar from '../../components/common/Sidebar';
import Header from '../../components/common/Header';
import { Calendar, Clock, User, Stethoscope, MapPin, ChevronLeft, ChevronRight, Check } from 'lucide-react';

const mockPatient = {
  id: 'P001',
  name: 'Imasha Perera',
  email: 'imasha@example.com',
  phone: '+94 77 123 4567',
  dateOfBirth: '1995-06-15',
  gender: 'Female',
  address: 'Colombo, Sri Lanka',
};

const mockDoctors = [
  {
    id: '1',
    name: 'Dr. Nimal Fernando',
    specialization: 'Cardiology',
    experience: 15,
    rating: 4.8,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
    fees: 2500,
    location: 'Medimate Medical Center, Floor 2',
    nextAvailable: 'Today'
  },
  {
    id: '2',
    name: 'Dr. Priya Silva',
    specialization: 'General Medicine',
    experience: 12,
    rating: 4.7,
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday'],
    fees: 2000,
    location: 'Medimate Medical Center, Floor 1',
    nextAvailable: 'Tomorrow'
  },
  {
    id: '3',
    name: 'Dr. Rajesh Kumar',
    specialization: 'Neurology',
    experience: 18,
    rating: 4.9,
    availableDays: ['Wednesday', 'Thursday', 'Friday'],
    fees: 3000,
    location: 'Medimate Medical Center, Floor 3',
    nextAvailable: 'Jun 12'
  },
  {
    id: '4',
    name: 'Dr. Sarah Johnson',
    specialization: 'Dermatology',
    experience: 10,
    rating: 4.6,
    availableDays: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
    fees: 2200,
    location: 'Medimate Medical Center, Floor 2',
    nextAvailable: 'Jun 11'
  }
];

const timeSlots = [
  { time: '09:00 AM', available: true, type: 'morning' },
  { time: '09:30 AM', available: true, type: 'morning' },
  { time: '10:00 AM', available: false, type: 'morning' },
  { time: '10:30 AM', available: true, type: 'morning' },
  { time: '11:00 AM', available: true, type: 'morning' },
  { time: '11:30 AM', available: false, type: 'morning' },
  { time: '02:00 PM', available: true, type: 'afternoon' },
  { time: '02:30 PM', available: true, type: 'afternoon' },
  { time: '03:00 PM', available: true, type: 'afternoon' },
  { time: '03:30 PM', available: false, type: 'afternoon' },
  { time: '04:00 PM', available: true, type: 'afternoon' },
  { time: '04:30 PM', available: true, type: 'afternoon' },
  { time: '06:00 PM', available: true, type: 'evening' },
  { time: '06:30 PM', available: false, type: 'evening' },
  { time: '07:00 PM', available: true, type: 'evening' },
  { time: '07:30 PM', available: true, type: 'evening' }
];

const BookAppointment = () => {
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentDetails, setAppointmentDetails] = useState({
    reason: '',
    symptoms: '',
    urgency: 'normal',
    notes: ''
  });

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setStep(2);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleBooking = () => {
    // Handle appointment booking
    alert(`Appointment booked successfully!\nDoctor: ${selectedDoctor?.name}\nDate: ${selectedDate}\nTime: ${selectedTime}`);
    // Reset form or redirect
    setStep(1);
    setSelectedDoctor(null);
    setSelectedDate('');
    setSelectedTime('');
  };

  const generateCalendarDays = () => {
    const today = new Date();
    const days = [];
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        date: date.toISOString().split('T')[0],
        day: date.getDate(),
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        isToday: i === 0,
        isWeekend: date.getDay() === 0 || date.getDay() === 6
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar patientData={mockPatient} />
      <Header />
      
      <main className="ml-64 pt-20 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Book Appointment</h1>
                <p className="text-gray-600">Schedule a consultation with our medical professionals</p>
              </div>
              {step > 1 && (
                <button
                  onClick={() => setStep(Math.max(1, step - 1))}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
                >
                  <ChevronLeft size={20} />
                  <span>Back</span>
                </button>
              )}
            </div>
          </div>

          {/* Progress Steps */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex items-center justify-between">
              {[
                { step: 1, label: 'Select Doctor', icon: User },
                { step: 2, label: 'Choose Date & Time', icon: Calendar },
                { step: 3, label: 'Appointment Details', icon: Stethoscope },
                { step: 4, label: 'Confirmation', icon: Check }
              ].map((item, index) => (
                <div key={item.step} className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                    step >= item.step ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    <item.icon size={20} />
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${
                      step >= item.step ? 'text-primary' : 'text-gray-500'
                    }`}>
                      Step {item.step}
                    </p>
                    <p className={`text-sm ${
                      step >= item.step ? 'text-gray-800' : 'text-gray-500'
                    }`}>
                      {item.label}
                    </p>
                  </div>
                  {index < 3 && (
                    <div className={`w-16 h-1 mx-4 ${
                      step > item.step ? 'bg-primary' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-white rounded-xl shadow-md p-6">
            {/* Step 1: Select Doctor */}
            {step === 1 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Select a Doctor</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {mockDoctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleDoctorSelect(doctor)}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                          {doctor.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-800 mb-1">{doctor.name}</h3>
                          <p className="text-primary font-medium mb-2">{doctor.specialization}</p>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                            <span>⭐ {doctor.rating} rating</span>
                            <span>{doctor.experience} years exp.</span>
                            <span className="text-success font-medium">{doctor.nextAvailable}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                            <MapPin size={16} />
                            <span>{doctor.location}</span>
                          </div>
                          
                          <div className="text-lg font-bold text-gray-800">
                            Rs. {doctor.fees.toLocaleString()} per consultation
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex flex-wrap gap-2">
                          {doctor.availableDays.slice(0, 3).map((day) => (
                            <span key={day} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              {day}
                            </span>
                          ))}
                          {doctor.availableDays.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              +{doctor.availableDays.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Choose Date & Time */}
            {step === 2 && selectedDoctor && (
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    {selectedDoctor.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{selectedDoctor.name}</h2>
                    <p className="text-primary">{selectedDoctor.specialization}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Calendar */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Date</h3>
                    <div className="grid grid-cols-7 gap-2">
                      {calendarDays.map((day) => (
                        <button
                          key={day.date}
                          onClick={() => handleDateSelect(day.date)}
                          disabled={day.isWeekend}
                          className={`p-3 rounded-lg text-center transition-colors ${
                            selectedDate === day.date
                              ? 'bg-primary text-white'
                              : day.isWeekend
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : day.isToday
                              ? 'bg-primary-light text-primary border border-primary'
                              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <div className="text-xs text-gray-500 mb-1">{day.dayName}</div>
                          <div className="font-semibold">{day.day}</div>
                          <div className="text-xs">{day.month}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Time</h3>
                    {selectedDate && (
                      <div className="space-y-6">
                        {['morning', 'afternoon', 'evening'].map((period) => (
                          <div key={period}>
                            <h4 className="text-sm font-medium text-gray-600 mb-3 capitalize">
                              {period} {period === 'morning' ? '(9:00 AM - 12:00 PM)' : 
                                       period === 'afternoon' ? '(2:00 PM - 5:00 PM)' : 
                                       '(6:00 PM - 8:00 PM)'}
                            </h4>
                            <div className="grid grid-cols-3 gap-2">
                              {timeSlots
                                .filter(slot => slot.type === period)
                                .map((slot) => (
                                  <button
                                    key={slot.time}
                                    onClick={() => slot.available && handleTimeSelect(slot.time)}
                                    disabled={!slot.available}
                                    className={`p-2 rounded-lg text-sm transition-colors ${
                                      selectedTime === slot.time
                                        ? 'bg-primary text-white'
                                        : slot.available
                                        ? 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                                  >
                                    {slot.time}
                                  </button>
                                ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {selectedDate && selectedTime && (
                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={() => setStep(3)}
                      className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors flex items-center space-x-2"
                    >
                      <span>Continue</span>
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Appointment Details */}
            {step === 3 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Appointment Details</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Visit *</label>
                    <select
                      value={appointmentDetails.reason}
                      onChange={(e) => setAppointmentDetails({...appointmentDetails, reason: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    >
                      <option value="">Select reason</option>
                      <option value="routine-checkup">Routine Checkup</option>
                      <option value="follow-up">Follow-up Visit</option>
                      <option value="new-symptoms">New Symptoms</option>
                      <option value="medication-review">Medication Review</option>
                      <option value="second-opinion">Second Opinion</option>
                      <option value="emergency-consultation">Emergency Consultation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Urgency Level</label>
                    <select
                      value={appointmentDetails.urgency}
                      onChange={(e) => setAppointmentDetails({...appointmentDetails, urgency: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="normal">Normal</option>
                      <option value="urgent">Urgent</option>
                      <option value="emergency">Emergency</option>
                    </select>
                  </div>

                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Symptoms</label>
                    <textarea
                      value={appointmentDetails.symptoms}
                      onChange={(e) => setAppointmentDetails({...appointmentDetails, symptoms: e.target.value})}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Describe your current symptoms..."
                    />
                  </div>

                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                    <textarea
                      value={appointmentDetails.notes}
                      onChange={(e) => setAppointmentDetails({...appointmentDetails, notes: e.target.value})}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Any additional information you'd like the doctor to know..."
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => setStep(4)}
                    disabled={!appointmentDetails.reason}
                    className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors flex items-center space-x-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    <span>Review Booking</span>
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && selectedDoctor && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Confirm Your Appointment</h2>
                
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Appointment Summary</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Doctor Information</h4>
                      <div className="space-y-1 text-sm">
                        <p><span className="text-gray-600">Name:</span> {selectedDoctor.name}</p>
                        <p><span className="text-gray-600">Specialization:</span> {selectedDoctor.specialization}</p>
                        <p><span className="text-gray-600">Location:</span> {selectedDoctor.location}</p>
                        <p><span className="text-gray-600">Consultation Fee:</span> Rs. {selectedDoctor.fees.toLocaleString()}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Appointment Details</h4>
                      <div className="space-y-1 text-sm">
                        <p><span className="text-gray-600">Date:</span> {new Date(selectedDate).toLocaleDateString()}</p>
                        <p><span className="text-gray-600">Time:</span> {selectedTime}</p>
                        <p><span className="text-gray-600">Reason:</span> {appointmentDetails.reason.replace('-', ' ')}</p>
                        <p><span className="text-gray-600">Urgency:</span> <span className={`capitalize ${
                          appointmentDetails.urgency === 'emergency' ? 'text-danger' :
                          appointmentDetails.urgency === 'urgent' ? 'text-warning' : 'text-success'
                        }`}>{appointmentDetails.urgency}</span></p>
                      </div>
                    </div>
                  </div>

                  {appointmentDetails.symptoms && (
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-800 mb-2">Symptoms</h4>
                      <p className="text-sm text-gray-600">{appointmentDetails.symptoms}</p>
                    </div>
                  )}

                  {appointmentDetails.notes && (
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-800 mb-2">Additional Notes</h4>
                      <p className="text-sm text-gray-600">{appointmentDetails.notes}</p>
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setStep(3)}
                    className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Edit Details
                  </button>
                  <button
                    onClick={handleBooking}
                    className="bg-success text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                  >
                    <Check size={20} />
                    <span>Confirm Booking</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookAppointment;
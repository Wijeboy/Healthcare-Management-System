// src/pages/PatientPages/EmergencyCallPage.jsx
import React, { useState } from 'react';
import { 
  PhoneCall, 
  AlertTriangle, 
  MapPin, 
  Ambulance, 
  Hospital, 
  UserCheck, 
  Skull, 
  Brain, 
  ShieldAlert, 
  Clock, 
  Send, 
  CheckCircle2, 
  Video, 
  X,
  Phone
} from 'lucide-react';

const emergencyServices = [
  {
    id: 'ambulance',
    name: 'Ambulance Dispatch',
    number: '+94 11 123 4567',
    description: 'Medical emergency requiring immediate paramedic transport',
    icon: Ambulance,
    color: 'bg-red-50 text-red-600 border-red-200'
  },
  {
    id: 'er',
    name: 'Emergency Room Triage',
    number: '+94 11 123 4568',
    description: 'Direct connection to Medimate Hospital ER department',
    icon: Hospital,
    color: 'bg-blue-50 text-blue-600 border-blue-200'
  },
  {
    id: 'oncall',
    name: '24/7 On-Call Doctor',
    number: '+94 11 123 4500',
    description: 'Instant tele-consultation with on-call duty physician',
    icon: UserCheck,
    color: 'bg-emerald-50 text-emerald-600 border-emerald-200'
  },
  {
    id: 'poison',
    name: 'Poison Control Center',
    number: '+94 11 123 4569',
    description: 'Toxic exposure, chemical contact, or overdose support',
    icon: Skull,
    color: 'bg-purple-50 text-purple-600 border-purple-200'
  },
  {
    id: 'mental',
    name: 'Mental Health Crisis Line',
    number: '1926',
    description: 'Confidential 24/7 mental health crisis support',
    icon: Brain,
    color: 'bg-indigo-50 text-indigo-600 border-indigo-200'
  },
  {
    id: 'police',
    name: 'Police Emergency',
    number: '119',
    description: 'Law enforcement & security emergency assistance',
    icon: ShieldAlert,
    color: 'bg-amber-50 text-amber-600 border-amber-200'
  }
];

const onCallDoctors = [
  {
    id: 'doc1',
    name: 'Dr. Aris Thorne',
    specialty: 'Emergency Medicine',
    status: 'Available Now',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=120'
  },
  {
    id: 'doc2',
    name: 'Dr. Sarah Jayawardhana',
    specialty: 'Cardiology Specialist',
    status: 'On Duty',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=120'
  }
];

export default function EmergencyCallPage() {
  const [emergencyDetails, setEmergencyDetails] = useState({
    type: '',
    condition: '',
    location: 'Colombo 03, Sri Lanka',
    description: ''
  });
  const [dispatchSent, setDispatchSent] = useState(false);
  const [callingDoctor, setCallingDoctor] = useState(null);

  const handleUseGps = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setEmergencyDetails(prev => ({
            ...prev,
            location: `GPS: ${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)} (Colombo)`
          }));
        },
        () => {
          setEmergencyDetails(prev => ({ ...prev, location: 'Colombo 07, Sri Lanka (GPS Fixed)' }));
        }
      );
    } else {
      setEmergencyDetails(prev => ({ ...prev, location: 'Colombo 07, Sri Lanka (GPS Fixed)' }));
    }
  };

  const handleDispatch = (e) => {
    e.preventDefault();
    setDispatchSent(true);
    setTimeout(() => {
      setDispatchSent(false);
    }, 4500);
  };

  const triggerCall = (service) => {
    alert(`Dialing ${service.name} (${service.number})... Dispatch signal sent.`);
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-800 text-white rounded-2xl p-6 md:p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-red-100 border border-white/30">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
              <span>Emergency Services Active</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Emergency Services & Doctor Call
            </h1>
            <p className="text-xs md:text-sm text-red-100 leading-relaxed font-medium">
              Get immediate medical assistance, request emergency ambulance dispatch, or connect directly with our 24/7 on-call duty physicians.
            </p>
          </div>

          <button
            onClick={() => triggerCall({ name: 'Hotline', number: '1-800-CARE-CLN' })}
            className="bg-white hover:bg-red-50 text-red-700 font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer shrink-0"
          >
            <PhoneCall size={20} className="animate-bounce" />
            <span>Call Hotline Now</span>
          </button>
        </div>
      </div>

      {/* Dispatch Success Alert */}
      {dispatchSent && (
        <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-2xl text-xs font-bold flex items-center gap-3 animate-fade-in shadow-xs">
          <CheckCircle2 size={22} className="text-green-600 shrink-0" />
          <div>
            <p className="text-sm font-extrabold text-green-900">Emergency Dispatch Signal Received!</p>
            <p className="text-xs text-green-700 font-medium mt-0.5">
              Medical emergency team dispatched to your location ({emergencyDetails.location}). Stay calm and keep phone line clear.
            </p>
          </div>
        </div>
      )}

      {/* Quick Call Emergency Hotlines Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Phone className="text-red-600" size={20} />
          <span>Quick Call Emergency Services</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {emergencyServices.map((service) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.id} 
                className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs flex flex-col justify-between hover:border-red-300 transition-all space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl ${service.color} border flex items-center justify-center`}>
                      <Icon size={20} />
                    </div>
                    <span className="text-xs font-mono font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-md border border-red-100">
                      {service.number}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{service.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{service.description}</p>
                  </div>
                </div>

                <button
                  onClick={() => triggerCall(service)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <PhoneCall size={14} />
                  <span>Call Now ({service.number})</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Two-Column Section: Dispatch Form & On-Call Doctors */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Quick Emergency Dispatch Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100">
            <AlertTriangle size={20} className="text-red-600" />
            <h3 className="text-base font-bold text-gray-900">Send Emergency Dispatch Signal</h3>
          </div>

          <form onSubmit={handleDispatch} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Emergency Type *</label>
                <select
                  value={emergencyDetails.type}
                  onChange={(e) => setEmergencyDetails({ ...emergencyDetails, type: e.target.value })}
                  className="w-full p-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                  required
                >
                  <option value="">Select emergency type</option>
                  <option value="chest-pain">Chest Pain / Cardiac Alert</option>
                  <option value="difficulty-breathing">Difficulty Breathing</option>
                  <option value="severe-injury">Severe Physical Injury</option>
                  <option value="unconscious">Loss of Consciousness</option>
                  <option value="allergic-reaction">Severe Allergic Anaphylaxis</option>
                  <option value="other">Other Medical Crisis</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Patient Condition</label>
                <select
                  value={emergencyDetails.condition}
                  onChange={(e) => setEmergencyDetails({ ...emergencyDetails, condition: e.target.value })}
                  className="w-full p-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                >
                  <option value="">Select patient state</option>
                  <option value="conscious">Conscious and Alert</option>
                  <option value="confused">Conscious but Confused</option>
                  <option value="unconscious">Unconscious</option>
                  <option value="severe-pain">In Severe Pain</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Current Location *</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={emergencyDetails.location}
                  onChange={(e) => setEmergencyDetails({ ...emergencyDetails, location: e.target.value })}
                  className="flex-1 p-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                  placeholder="Enter current location address..."
                  required
                />
                <button
                  type="button"
                  onClick={handleUseGps}
                  className="bg-[#003f87] hover:bg-blue-900 text-white font-bold text-xs px-4 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                >
                  <MapPin size={14} />
                  <span>Use GPS</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Symptoms / Details</label>
              <textarea
                rows={4}
                value={emergencyDetails.description}
                onChange={(e) => setEmergencyDetails({ ...emergencyDetails, description: e.target.value })}
                placeholder="Describe current symptoms or condition..."
                className="w-full p-3 bg-gray-50/80 border border-gray-200 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-6 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Send size={16} />
              <span>Send Emergency Dispatch Signal</span>
            </button>
          </form>
        </div>

        {/* Right Column: On-Call Duty Doctors & Guidelines (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* On-Call Physicians Card */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <UserCheck className="text-[#1d70f5]" size={18} />
              <span>On-Call Duty Doctors</span>
            </h3>

            <div className="space-y-3">
              {onCallDoctors.map((doc) => (
                <div key={doc.id} className="p-3.5 bg-gray-50 rounded-xl border border-gray-200/60 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={doc.avatar} alt={doc.name} className="w-10 h-10 rounded-full object-cover border border-white shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 text-xs">{doc.name}</h4>
                      <p className="text-[11px] text-gray-500">{doc.specialty}</p>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-green-700 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        {doc.status}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setCallingDoctor(doc)}
                    className="bg-[#1d70f5] hover:bg-blue-700 text-white p-2.5 rounded-xl font-bold text-xs flex items-center justify-center shadow-xs cursor-pointer shrink-0"
                    title="Start Emergency Consultation"
                  >
                    <Video size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Important Safety Guidelines */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-5 text-xs text-amber-900 space-y-2">
            <h4 className="font-bold flex items-center gap-2 text-amber-950">
              <AlertTriangle size={16} className="text-amber-600" />
              <span>Important Emergency Guidelines</span>
            </h4>
            <ul className="space-y-1.5 text-[11px] text-amber-800 leading-relaxed list-disc list-inside">
              <li>If life-threatening, dial 911 or local emergency numbers immediately.</li>
              <li>Stay calm and provide clear information about your physical address.</li>
              <li>Keep your phone line free after sending dispatch signal.</li>
              <li>Do not leave an unconscious patient unattended.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tele-Consultation Simulation Modal */}
      {callingDoctor && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-center space-y-4 animate-fade-in relative">
            <button
              onClick={() => setCallingDoctor(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
            >
              <X size={20} />
            </button>

            <div className="w-20 h-20 rounded-full overflow-hidden mx-auto border-4 border-blue-100 shadow-md relative">
              <img src={callingDoctor.avatar} alt={callingDoctor.name} className="w-full h-full object-cover" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900">{callingDoctor.name}</h3>
              <p className="text-xs text-[#1d70f5] font-semibold">{callingDoctor.specialty}</p>
              <p className="text-xs text-gray-400 mt-2 flex items-center justify-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                Connecting Emergency Video Session...
              </p>
            </div>

            <div className="flex justify-center gap-4 pt-2">
              <button
                onClick={() => {
                  alert(`Connected with ${callingDoctor.name}. Emergency video room active.`);
                  setCallingDoctor(null);
                }}
                className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer flex items-center gap-2"
              >
                <Video size={16} />
                <span>Join Video Session</span>
              </button>
              <button
                onClick={() => setCallingDoctor(null)}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
              >
                End Call
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

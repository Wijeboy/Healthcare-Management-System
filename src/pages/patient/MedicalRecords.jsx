// src/pages/MedicalRecords.jsx
import React, { useState } from 'react';
import Sidebar from '../../components/common/Sidebar';
import Header from '../../components/common/Header';
import {
  FileText,
  Download,
  Share2,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  Droplet,
  AlertTriangle,
} from 'lucide-react';

const mockPatient = {
  id: 'P001',
  name: 'Imasha Perera',
  email: 'imasha@example.com',
  phone: '+94 77 123 4567',
  dateOfBirth: '1995-06-15',
  gender: 'Female',
  address: 'Colombo, Sri Lanka',
  patientId: 'MR-8921',
  age: 34,
  bloodGroup: 'O+',
  allergies: ['Penicillin'],
  lastVisit: 'Oct 12, 2026',
  emergencyContact: {
    name: 'Thirasha Lamkamli',
    phone: '+94 76 854 3890',
  },
};

// Simple recovery/health-score trend used to render the sparkline in the patient card
const healthScoreTrend = [62, 68, 65, 74, 78, 82, 88];

const mockRecords = [
  {
    id: '1',
    date: 'June 5, 2026',
    type: 'Blood Test Results',
    department: 'Pathology',
    doctor: 'Dr. Nimal Fernando',
    diagnosis: 'Complete Blood Count - Normal',
    notes: 'All values within normal range. Continue current medication.',
    resultStatus: 'Normal',
    appointmentStatus: 'Confirmed',
    attachments: ['blood_test_report.pdf'],
  },
  {
    id: '2',
    date: 'May 28, 2026',
    type: 'X-Ray Report',
    department: 'Radiology',
    doctor: 'Dr. Priya Silva',
    diagnosis: 'Chest X-Ray - Clear',
    notes: 'No abnormalities detected. Follow-up in 6 months.',
    resultStatus: 'Normal',
    appointmentStatus: 'Confirmed',
    attachments: ['xray_chest.pdf', 'xray_image.jpg'],
  },
  {
    id: '3',
    date: 'May 15, 2026',
    type: 'Consultation Notes',
    department: 'General Medicine',
    doctor: 'Dr. Rajesh Kumar',
    diagnosis: 'General Checkup - Healthy',
    notes: 'Patient reports feeling well. Blood pressure normal. Recommended annual screening.',
    resultStatus: 'Normal',
    appointmentStatus: 'Pending',
  },
  {
    id: '4',
    date: 'April 20, 2026',
    type: 'ECG Report',
    department: 'Cardiology',
    doctor: 'Dr. Sarah Johnson',
    diagnosis: 'Electrocardiogram - Normal Sinus Rhythm',
    notes: 'Heart rhythm regular. No signs of cardiac abnormalities.',
    resultStatus: 'Normal',
    appointmentStatus: 'Confirmed',
    attachments: ['ecg_report.pdf'],
  },
  {
    id: '5',
    date: 'March 30, 2026',
    type: 'Lipid Panel',
    department: 'Pathology',
    doctor: 'Dr. Nimal Fernando',
    diagnosis: 'Cholesterol - Elevated LDL',
    notes: 'LDL slightly above target range. Dietary changes and re-test in 3 months recommended.',
    resultStatus: 'Abnormal',
    appointmentStatus: 'Confirmed',
    attachments: ['lipid_panel.pdf'],
  },
];

// Small inline sparkline so the patient card has a visual trend, no chart library needed
const HealthScoreSparkline = ({ data }) => {
  const width = 240;
  const height = 64;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1);

  const points = data.map((value, i) => {
    const x = i * stepX;
    const y = height - ((value - min) / range) * (height - 8) - 4;
    return [x, y];
  });

  const linePath = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ');
  const areaPath = `${linePath} L ${width} ${height} L 0 ${height} Z`;
  const [lastX, lastY] = points[points.length - 1];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-16" preserveAspectRatio="none">
      <defs>
        <linearGradient id="healthScoreFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4F7CFF" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#4F7CFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#healthScoreFill)" />
      <path d={linePath} fill="none" stroke="#4F7CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={lastX} cy={lastY} r="3.5" fill="#4F7CFF" stroke="white" strokeWidth="1.5" />
    </svg>
  );
};

const ResultStatusPill = ({ status }) => {
  const isNormal = status === 'Normal';
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
        isNormal ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
      }`}
    >
      {isNormal ? 'Normal Results' : 'Abnormal Results'}
    </span>
  );
};

const AppointmentStatusBadge = ({ status }) => {
  const isConfirmed = status === 'Confirmed';
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
        isConfirmed ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${isConfirmed ? 'bg-green-600' : 'bg-amber-600'}`} />
      {status.toUpperCase()}
    </span>
  );
};

const RecordDetailRow = ({ record }) => (
  <div className="px-4 py-4 border-t border-gray-100 bg-gray-50/60">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3 text-sm text-gray-600">
      <span>
        <strong className="text-gray-700">Doctor:</strong> {record.doctor}
      </span>
      <span>
        <strong className="text-gray-700">Department:</strong> {record.department}
      </span>
    </div>
    <p className="text-sm text-gray-600 mb-2">
      <strong className="text-gray-700">Diagnosis:</strong> {record.diagnosis}
    </p>
    {record.notes && (
      <p className="text-sm text-gray-600 mb-3">
        <strong className="text-gray-700">Notes:</strong> {record.notes}
      </p>
    )}
    {record.attachments && record.attachments.length > 0 && (
      <div className="flex flex-wrap gap-2">
        {record.attachments.map((attachment, index) => (
          <div key={index} className="flex items-center space-x-2 bg-white border border-gray-200 px-3 py-1.5 rounded-lg">
            <FileText size={14} className="text-gray-500" />
            <span className="text-xs text-gray-700">{attachment}</span>
            <button className="text-primary hover:text-primary-dark" aria-label={`Download ${attachment}`}>
              <Download size={13} />
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);

const LabReportsGroup = ({ title, records, tone }) => {
  const [open, setOpen] = useState(title === 'Normal Results');
  const toneStyles =
    tone === 'normal'
      ? { badge: 'bg-green-100 text-green-700', icon: 'text-green-600' }
      : { badge: 'bg-orange-100 text-orange-700', icon: 'text-orange-600' };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden mb-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 transition-colors"
      >
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${toneStyles.badge}`}>
          {title}
        </span>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">{records.length} report{records.length !== 1 ? 's' : ''}</span>
          {open ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
        </div>
      </button>
      {open && (
        <div>
          {records.map((record) => (
            <RecordDetailRow key={record.id} record={record} />
          ))}
        </div>
      )}
    </div>
  );
};

const MedicalRecords = () => {
  const [records] = useState(mockRecords);
  const [activeTab, setActiveTab] = useState('lab'); // 'lab' | 'history'
  const [openMenuId, setOpenMenuId] = useState(null);

  const normalRecords = records.filter((r) => r.resultStatus === 'Normal');
  const abnormalRecords = records.filter((r) => r.resultStatus === 'Abnormal');

  const handleDownloadPdf = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Medical Records',
          text: `Medical records for ${mockPatient.name}`,
        });
      } catch (err) {
        // user cancelled share - no action needed
      }
    } else {
      alert('Sharing is not supported on this device.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar patientData={mockPatient} />
      <Header />

      <main className="ml-64 pt-20 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Medical Records</h1>

          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 items-start">
            {/* Patient Summary Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-11 w-11 rounded-full bg-primary-light text-primary flex items-center justify-center font-semibold">
                  IS
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Imasha</h3>
                  <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-green-100 text-green-700">
                    Patient ID: #{mockPatient.patientId}
                  </span>
                </div>
              </div>

              <dl className="space-y-3 text-sm mb-5">
                <div className="flex items-center justify-between">
                  <dt className="text-gray-500">Age</dt>
                  <dd className="text-gray-800 font-medium">{mockPatient.age} Years</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-gray-500 flex items-center gap-1.5">
                    <Droplet size={14} className="text-red-400" /> Blood Group
                  </dt>
                  <dd className="text-gray-800 font-medium">{mockPatient.bloodGroup}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-gray-500 flex items-center gap-1.5">
                    <AlertTriangle size={14} className="text-red-400" /> Allergies
                  </dt>
                  <dd>
                    {mockPatient.allergies.map((a) => (
                      <span key={a} className="px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700">
                        {a}
                      </span>
                    ))}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-gray-500">Last Visit</dt>
                  <dd className="text-gray-800 font-medium">{mockPatient.lastVisit}</dd>
                </div>
              </dl>

              <div className="border-t border-gray-100 pt-4 mb-5">
                <p className="text-xs font-medium text-gray-500 mb-1">Recovery Progress · Health Score</p>
                <HealthScoreSparkline data={healthScoreTrend} />
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs font-medium text-gray-500 mb-1">Emergency Contact</p>
                <p className="text-sm font-semibold text-gray-800">{mockPatient.emergencyContact.name}</p>
                <p className="text-sm text-gray-500 mb-3">{mockPatient.emergencyContact.phone}</p>
                <button className="w-full border border-gray-300 bg-white text-gray-700 text-sm font-medium py-2 rounded-lg hover:bg-gray-100 transition-colors">
                  View Full Profile
                </button>
              </div>
            </div>

            {/* Records Panel */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-6 border-b border-gray-200 mb-5">
                <button
                  onClick={() => setActiveTab('lab')}
                  className={`pb-3 text-sm font-semibold border-b-2 -mb-px transition-colors ${
                    activeTab === 'lab'
                      ? 'text-primary border-primary'
                      : 'text-gray-400 border-transparent hover:text-gray-600'
                  }`}
                >
                  Lab Reports
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`pb-3 text-sm font-semibold border-b-2 -mb-px transition-colors ${
                    activeTab === 'history'
                      ? 'text-primary border-primary'
                      : 'text-gray-400 border-transparent hover:text-gray-600'
                  }`}
                >
                  History
                </button>
              </div>

              {activeTab === 'lab' ? (
                <div>
                  <LabReportsGroup title="Normal Results" records={normalRecords} tone="normal" />
                  <LabReportsGroup title="Abnormal Results" records={abnormalRecords} tone="abnormal" />
                  {records.length === 0 && (
                    <div className="text-center py-12">
                      <FileText size={48} className="mx-auto text-gray-300 mb-3" />
                      <p className="text-gray-400 text-sm">No lab reports available yet</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                        <th className="pb-3 pr-4">Date</th>
                        <th className="pb-3 pr-4">Doctor Name</th>
                        <th className="pb-3 pr-4">Department</th>
                        <th className="pb-3 pr-4">Status</th>
                        <th className="pb-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records.map((record) => (
                        <tr key={record.id} className="border-t border-gray-100 hover:bg-gray-50/60">
                          <td className="py-4 pr-4">
                            <p className="text-sm font-semibold text-gray-800">{record.date}</p>
                            <p className="text-xs text-gray-400">{record.type}</p>
                          </td>
                          <td className="py-4 pr-4 text-sm text-gray-700">{record.doctor}</td>
                          <td className="py-4 pr-4 text-sm text-gray-700">{record.department}</td>
                          <td className="py-4 pr-4">
                            <AppointmentStatusBadge status={record.appointmentStatus} />
                          </td>
                          <td className="py-4 text-right relative">
                            <button
                              onClick={() => setOpenMenuId(openMenuId === record.id ? null : record.id)}
                              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"
                              aria-label="Row actions"
                            >
                              <MoreVertical size={18} />
                            </button>
                            {openMenuId === record.id && (
                              <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10 text-left">
                                <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                  <FileText size={14} /> View details
                                </button>
                                <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                  <Download size={14} /> Download
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  <Share2 size={16} />
                  Share
                </button>
                <button
                  onClick={handleDownloadPdf}
                  className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
                >
                  <Download size={16} />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};


export default MedicalRecords;
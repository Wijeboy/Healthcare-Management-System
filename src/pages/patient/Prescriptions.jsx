// src/pages/Prescriptions.jsx
import React, { useState } from 'react';
import Sidebar from '../../components/common/Sidebar';
import Header from '../../components/common/Header';
import { Printer, Download, Send, ShieldCheck } from 'lucide-react';

const mockPatient = {
  id: 'P001',
  name: 'Imasha Perera',
  email: 'imasha@example.com',
  phone: '+94 77 123 4567',
  dateOfBirth: '1995-06-15',
  gender: 'Female',
  address: 'Colombo, Sri Lanka',
};

const hospital = {
  name: 'Medimate Central Hospital',
  address: '1200 Healthcare Plaza, Colombo',
  phone: '+94 90 876 590',
  email: 'contact@medsys.hospital',
};

const mockPrescriptions = [
  {
    id: '1',
    issuedOn: 'June 5, 2026',
    status: 'Active',
    physician: {
      name: 'Dr. Nimal Fernando, MD',
      specialty: 'Specialist - Internal Medicine',
      npi: '1928374650',
    },
    patient: {
      name: 'Imasha Perera',
      dob: 'June 15, 1995 (31y)',
    },
    medications: [
      {
        name: 'Amoxicillin 500mg',
        type: 'Oral Capsule',
        dosage: '1 Capsule',
        frequency: 'Three times a day (TID)',
        duration: '7 Days',
      },
      {
        name: 'Paracetamol 500mg',
        type: 'Oral Tablet',
        dosage: '1 Tablet',
        frequency: 'As needed',
        duration: '5 Days',
      },
    ],
    instructions:
      'Complete the full course of antibiotics even if symptoms improve. Take Amoxicillin with food to avoid stomach upset. Avoid alcohol during the duration of this prescription.',
    prescriptionId: 'RX-2026-9981-AB4',
    signedBy: 'Dr. Nimal Fernando',
    signedDate: '06/05/2026 09:40 EST',
  },
  {
    id: '2',
    issuedOn: 'May 28, 2026',
    status: 'Completed',
    physician: {
      name: 'Dr. Priya Silva, MD',
      specialty: 'Specialist - Endocrinology',
      npi: '1847362951',
    },
    patient: {
      name: 'Imasha Perera',
      dob: 'June 15, 1995 (31y)',
    },
    medications: [
      {
        name: 'Metformin 850mg',
        type: 'Oral Tablet',
        dosage: '1 Tablet',
        frequency: 'Twice daily (BID)',
        duration: '30 Days',
      },
    ],
    instructions: 'Take with meals. Monitor blood sugar levels regularly and report any dizziness or nausea.',
    prescriptionId: 'RX-2026-8845-C12',
    signedBy: 'Dr. Priya Silva',
    signedDate: '05/28/2026 14:05 EST',
  },
  {
    id: '3',
    issuedOn: 'May 10, 2026',
    status: 'Expired',
    physician: {
      name: 'Dr. Rajesh Kumar, MD',
      specialty: 'Specialist - Orthopedics',
      npi: '1756293840',
    },
    patient: {
      name: 'Imasha Perera',
      dob: 'June 15, 1995 (31y)',
    },
    medications: [
      {
        name: 'Ibuprofen 400mg',
        type: 'Oral Tablet',
        dosage: '1 Tablet',
        frequency: 'Every 6 hours as needed',
        duration: '3 Days',
      },
    ],
    instructions: 'For muscle pain relief. Take after meals to reduce stomach irritation.',
    prescriptionId: 'RX-2026-7710-D77',
    signedBy: 'Dr. Rajesh Kumar',
    signedDate: '05/10/2026 11:20 EST',
  },
];

const statusStyles = {
  Active: 'bg-green-100 text-green-700',
  Completed: 'bg-blue-100 text-blue-700',
  Expired: 'bg-red-100 text-red-700',
};

const PrescriptionCard = ({ prescription }) => {
  const handlePrint = () => window.print();
  const handleDownload = () => window.print();

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      {/* Card header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-800">Digital Prescription</h2>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusStyles[prescription.status]}`}>
              {prescription.status}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Issued on {prescription.issuedOn}</p>
        </div>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <Printer size={16} />
            Print
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            <Download size={16} />
            Download PDF
          </button>
        </div>
      </div>

      {/* Letterhead */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between pb-4 border-b border-gray-100 mb-5">
            <div>
              <h3 className="text-primary font-bold text-lg">{hospital.name}</h3>
              <p className="text-sm text-gray-500">{hospital.address}</p>
              <p className="text-sm text-gray-500">
                {hospital.phone} | {hospital.email}
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:text-right">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Physician Details</p>
              <p className="text-sm font-semibold text-gray-800">{prescription.physician.name}</p>
              <p className="text-xs text-gray-500">{prescription.physician.specialty}</p>
              <p className="text-xs text-gray-400">NPI: {prescription.physician.npi}</p>
            </div>
          </div>

          {/* Patient bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-blue-50 rounded-lg px-4 py-3 mb-5">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Patient Name</p>
              <p className="text-sm font-semibold text-gray-800">{prescription.patient.name}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Date of Birth</p>
              <p className="text-sm font-semibold text-gray-800">{prescription.patient.dob}</p>
            </div>
          </div>

          {/* Medications table */}
          <div className="overflow-x-auto mb-5">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs font-semibold text-gray-400 uppercase tracking-wide border-b border-gray-200">
                  <th className="pb-2 pr-4">Medicine Name</th>
                  <th className="pb-2 pr-4">Dosage</th>
                  <th className="pb-2 pr-4">Frequency</th>
                  <th className="pb-2">Duration</th>
                </tr>
              </thead>
              <tbody>
                {prescription.medications.map((med, idx) => (
                  <tr key={idx} className="border-b border-gray-50 last:border-0">
                    <td className="py-3 pr-4">
                      <p className="text-sm font-semibold text-primary">{med.name}</p>
                      <p className="text-xs text-gray-400">{med.type}</p>
                    </td>
                    <td className="py-3 pr-4 text-sm text-gray-700">{med.dosage}</td>
                    <td className="py-3 pr-4 text-sm text-gray-700">{med.frequency}</td>
                    <td className="py-3 text-sm text-gray-700">{med.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border-l-4 border-primary rounded-lg px-4 py-3 mb-5">
            <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">Doctor's Instructions</p>
            <p className="text-sm text-gray-700 leading-relaxed">{prescription.instructions}</p>
          </div>

          {/* Signature row */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between pt-4 border-t border-gray-100">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Prescription ID</p>
              <p className="text-sm font-mono text-gray-700">{prescription.prescriptionId}</p>
            </div>
            <div className="mt-4 sm:mt-0 sm:text-right">
              <p className="font-signature text-2xl text-gray-700 italic" style={{ fontFamily: 'cursive' }}>
                {prescription.signedBy}
              </p>
              <p className="text-xs text-gray-400">
                Electronically Signed by {prescription.signedBy} · {prescription.signedDate}
              </p>
            </div>
          </div>
        </div>

        {/* Legal notice */}
        <div className="bg-gray-50 px-6 py-3 text-center">
          <p className="text-xs text-gray-400 flex items-center justify-center gap-1.5">
            <ShieldCheck size={13} className="text-gray-400" />
            This is a legally binding digital prescription. For your safety, the original record is stored securely
            in the Medimate cloud and is accessible by licensed pharmacists via the QR code or ID provided.
          </p>
        </div>
      </div>

      {/* Pharmacy forward CTA - only actionable for active prescriptions */}
      {prescription.status === 'Active' && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-blue-50 rounded-lg px-5 py-4 mt-5">
          <div>
            <p className="text-sm font-semibold text-gray-800">Ready for pickup?</p>
            <p className="text-xs text-gray-500">
              Forward this prescription to our in-house pharmacy for 15-minute fulfillment.
            </p>
          </div>
          <button className="flex items-center justify-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors whitespace-nowrap">
            <Send size={16} />
            Forward to In-house Pharmacy
          </button>
        </div>
      )}
    </div>
  );
};

const Prescriptions = () => {
  const [prescriptions] = useState(mockPrescriptions);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredPrescriptions = prescriptions.filter(
    (p) => filterStatus === 'all' || p.status.toLowerCase() === filterStatus.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar patientData={mockPatient} />
      <Header />

      <main className="ml-64 pt-20 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Prescriptions</h1>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="mt-3 sm:mt-0 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Prescriptions</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="expired">Expired</option>
            </select>
          </div>

          {filteredPrescriptions.map((prescription) => (
            <PrescriptionCard key={prescription.id} prescription={prescription} />
          ))}

          {filteredPrescriptions.length === 0 && (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <p className="text-gray-400">No prescriptions found for this filter.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Prescriptions;
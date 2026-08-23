// src/pages/PatientPages/Prescriptions.jsx
import React, { useState } from 'react';
import { 
  Printer, 
  Download, 
  FileText, 
  CheckCircle2, 
  Building, 
  UserCheck, 
  Pill, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function Prescriptions() {
  const [downloaded, setDownloaded] = useState(false);
  const [forwarded, setForwarded] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleForwardPharmacy = () => {
    setForwarded(true);
    setTimeout(() => setForwarded(false), 3500);
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#003f87] tracking-tight">
          Prescriptions
        </h1>
      </div>

      {/* Subheader & Top Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Digital Prescription</h2>
          <p className="text-xs text-gray-500 mt-0.5">Issued on October 24, 2026</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 border border-gray-300 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Printer size={14} />
            <span>Print</span>
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-[#003f87] border border-blue-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Download size={14} />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {downloaded && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2 animate-fade-in max-w-4xl mx-auto">
          <CheckCircle2 size={16} />
          <span>Prescription PDF downloaded successfully!</span>
        </div>
      )}

      {forwarded && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2 animate-fade-in max-w-4xl mx-auto">
          <CheckCircle2 size={16} />
          <span>Prescription forwarded to Medimate In-house Pharmacy! Your order will be ready in 15 minutes.</span>
        </div>
      )}

      {/* Main Prescription Document Card */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-8 shadow-xs max-w-4xl mx-auto space-y-6">
        {/* Hospital & Doctor Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-gray-100">
          <div>
            <h3 className="text-lg font-bold text-[#003f87]">Medimate Central Hospital</h3>
            <p className="text-xs text-gray-500 mt-0.5">1200 Healthcare Plaza, Colombo</p>
            <p className="text-[11px] text-gray-400 mt-0.5">+9490876590 | contact@medsys.hospital</p>
          </div>

          <div className="sm:text-right text-xs">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Physician Details</span>
            <h4 className="font-bold text-gray-900 text-sm mt-0.5">Dr. Akash Smith, MD</h4>
            <p className="text-gray-500">Specialist - Internal Medicine</p>
            <p className="text-[11px] text-gray-400">NPI: 1928374650</p>
          </div>
        </div>

        {/* Patient Details Bar */}
        <div className="bg-[#eaf3ff] border border-[#d0e2ff] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">PATIENT NAME</span>
            <p className="font-bold text-gray-900 text-sm mt-0.5">Akash Samitha</p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">DATE OF BIRTH</span>
            <p className="font-bold text-gray-900 text-sm mt-0.5">May 14, 1982 (41y)</p>
          </div>
        </div>

        {/* Medicine Details Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#e8f1ff] text-[11px] font-bold text-gray-600 uppercase tracking-wider border-b border-blue-100">
                <th className="py-3 px-4">Medicine Name</th>
                <th className="py-3 px-4">Dosage</th>
                <th className="py-3 px-4">Frequency</th>
                <th className="py-3 px-4">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-medium">
              <tr className="hover:bg-blue-50/20">
                <td className="py-3.5 px-4">
                  <div className="font-bold text-[#003f87]">Amoxicillin 500mg</div>
                  <div className="text-[11px] text-gray-400">Oral Capsule</div>
                </td>
                <td className="py-3.5 px-4 text-gray-700">1 Capsule</td>
                <td className="py-3.5 px-4 text-gray-700">Three times a day (TID)</td>
                <td className="py-3.5 px-4 text-gray-700">10 Days</td>
              </tr>
              <tr className="hover:bg-blue-50/20">
                <td className="py-3.5 px-4">
                  <div className="font-bold text-[#003f87]">Ibuprofen 400mg</div>
                  <div className="text-[11px] text-gray-400">Oral Tablet</div>
                </td>
                <td className="py-3.5 px-4 text-gray-700">1 Tablet</td>
                <td className="py-3.5 px-4 text-gray-700">Every 6 hours as needed</td>
                <td className="py-3.5 px-4 text-gray-700">7 Days</td>
              </tr>
              <tr className="hover:bg-blue-50/20">
                <td className="py-3.5 px-4">
                  <div className="font-bold text-[#003f87]">Loratadine 10mg</div>
                  <div className="text-[11px] text-gray-400">Non-drowsy Antihistamine</div>
                </td>
                <td className="py-3.5 px-4 text-gray-700">1 Tablet</td>
                <td className="py-3.5 px-4 text-gray-700">Once daily</td>
                <td className="py-3.5 px-4 text-gray-700">30 Days</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Doctor's Instructions Box */}
        <div className="bg-[#ebf3ff]/70 border-l-4 border-[#1d70f5] p-4 rounded-r-xl text-xs space-y-1">
          <span className="text-[10px] font-bold text-[#1d70f5] uppercase tracking-wider">
            DOCTOR'S INSTRUCTIONS
          </span>
          <p className="text-gray-700 leading-relaxed font-medium">
            Complete the full course of antibiotics even if symptoms improve. Take Amoxicillin with food to avoid stomach upset. Avoid alcohol during the duration of this prescription.
          </p>
        </div>

        {/* Signature & ID Bar */}
        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">PRESCRIPTION ID</span>
            <p className="font-bold text-gray-900 font-mono mt-0.5">RX-2023-9981-AB4</p>
          </div>

          <div className="sm:text-right">
            <div className="font-semibold text-gray-400 italic text-[11px] border-b border-gray-300 pb-0.5 mb-1 inline-block">
              Dr. Akash Smith, MD
            </div>
            <p className="text-gray-700 font-bold text-[11px]">Electronically Signed by Dr. Smith</p>
            <p className="text-[10px] text-gray-400">Date: 10/24/2026 14:22 EST</p>
          </div>
        </div>
      </div>

      {/* Legal Note Below Card */}
      <p className="text-[11px] text-gray-400 text-center max-w-2xl mx-auto leading-relaxed">
        This is a legally binding digital prescription. For your safety, the original record is stored securely in the MedSys cloud and is accessible by licensed pharmacists via the QR code or ID provided.
      </p>

      {/* Bottom Pharmacy Banner */}
      <div className="bg-blue-50/80 border border-blue-100 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-4xl mx-auto shadow-xs">
        <div>
          <h4 className="font-bold text-gray-900 text-sm">Ready for pickup?</h4>
          <p className="text-xs text-gray-600 mt-0.5">
            Forward this prescription to our in-house pharmacy for 15-minute fulfillment.
          </p>
        </div>

        <button
          onClick={handleForwardPharmacy}
          className="bg-[#0052cc] hover:bg-blue-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-xs transition-all cursor-pointer shrink-0"
        >
          Forward to In-house Pharmacy
        </button>
      </div>
    </div>
  );
}

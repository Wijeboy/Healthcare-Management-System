// src/pages/PatientPages/MedicalRecords.jsx
import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Share2, 
  MoreVertical, 
  FileCheck, 
  Clock, 
  User, 
  Calendar,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const mockHistoryRecords = [
  {
    id: '1',
    date: 'June 12, 2024',
    time: '10:00 AM',
    doctor: 'Dr. Nimal',
    department: 'Cardiology',
    status: 'CONFIRMED'
  },
  {
    id: '2',
    date: 'June 18, 2024',
    time: '02:30 PM',
    doctor: 'Dr. Nimal',
    department: 'Orthopedics',
    status: 'PENDING'
  },
  {
    id: '3',
    date: 'July 05, 2024',
    time: '09:15 AM',
    doctor: 'Dr. Sunimal',
    department: 'Dermatology',
    status: 'CONFIRMED'
  }
];

const mockLabReports = [
  {
    id: 'lab1',
    date: 'June 05, 2024',
    title: 'Complete Blood Count (CBC)',
    doctor: 'Dr. Nimal Fernando',
    facility: 'Central Medical Laboratory',
    status: 'Ready',
    fileSize: '1.2 MB'
  },
  {
    id: 'lab2',
    date: 'May 28, 2024',
    title: 'Lipid Profile & Cholesterol Test',
    doctor: 'Dr. Priya Silva',
    facility: 'Central Medical Laboratory',
    status: 'Ready',
    fileSize: '850 KB'
  },
  {
    id: 'lab3',
    date: 'May 14, 2024',
    title: 'Chest X-Ray Imaging Report',
    doctor: 'Dr. Rajesh Kumar',
    facility: 'Radiology Imaging Center',
    status: 'Ready',
    fileSize: '4.5 MB'
  }
];

export default function MedicalRecords() {
  const [activeTab, setActiveTab] = useState('history'); // 'history' or 'lab'
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleShare = () => {
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 3000);
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#003f87] tracking-tight">
          Records
        </h1>
      </div>

      {/* Centered Tab Switcher */}
      <div className="flex justify-center my-4">
        <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-2xl border border-gray-200/60">
          <button
            onClick={() => setActiveTab('lab')}
            className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'lab'
                ? 'bg-[#1d70f5] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Lab Reports
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'history'
                ? 'bg-[#1d70f5] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            History
          </button>
        </div>
      </div>

      {/* Notifications */}
      {downloadSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2 animate-fade-in max-w-lg mx-auto">
          <CheckCircle2 size={16} />
          <span>Medical records downloaded successfully as PDF!</span>
        </div>
      )}

      {shareSuccess && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2 animate-fade-in max-w-lg mx-auto">
          <CheckCircle2 size={16} />
          <span>Secure share link generated and copied to clipboard!</span>
        </div>
      )}

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs space-y-6">
        {activeTab === 'history' ? (
          /* HISTORY TABLE VIEW */
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="py-3 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    DATE
                  </th>
                  <th className="py-3 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    DOCTOR NAME
                  </th>
                  <th className="py-3 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    DEPARTMENT
                  </th>
                  <th className="py-3 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    STATUS
                  </th>
                  <th className="py-3 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-right">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {mockHistoryRecords.map((item) => {
                  const isConfirmed = item.status === 'CONFIRMED';
                  return (
                    <tr key={item.id} className="hover:bg-blue-50/30 transition-colors">
                      {/* DATE */}
                      <td className="py-4 px-6">
                        <div className="font-bold text-gray-900">{item.date}</div>
                        <div className="text-[11px] text-gray-400 font-medium mt-0.5">{item.time}</div>
                      </td>

                      {/* DOCTOR NAME */}
                      <td className="py-4 px-6 font-bold text-gray-900">
                        {item.doctor}
                      </td>

                      {/* DEPARTMENT */}
                      <td className="py-4 px-6 text-gray-600 font-medium">
                        {item.department}
                      </td>

                      {/* STATUS */}
                      <td className="py-4 px-6">
                        {isConfirmed ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#dcfce7] text-[#16a34a] border border-[#bbf7d0]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
                            CONFIRMED
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#ffedd5] text-[#c2410c] border border-[#fed7aa]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#c2410c]" />
                            PENDING
                          </span>
                        )}
                      </td>

                      {/* ACTION */}
                      <td className="py-4 px-6 text-right">
                        <button 
                          type="button"
                          className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreVertical size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          /* LAB REPORTS VIEW */
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockLabReports.map((report) => (
                <div key={report.id} className="border border-gray-200/80 rounded-xl p-5 hover:border-blue-300 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-blue-50 text-[#1d70f5] text-[10px] font-bold px-2.5 py-1 rounded-md">
                        {report.status}
                      </span>
                      <span className="text-[11px] text-gray-400">{report.fileSize}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1">{report.title}</h3>
                    <p className="text-xs text-gray-500 mb-3">{report.doctor}</p>
                    <p className="text-[11px] text-gray-400 flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{report.date}</span>
                    </p>
                  </div>
                  <button
                    onClick={handleDownload}
                    className="mt-4 w-full py-2 bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-[#1d70f5] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Download size={14} />
                    <span>Download Report</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Action Buttons Row */}
        <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
          <button
            type="button"
            onClick={handleShare}
            className="px-6 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold text-xs rounded-xl flex items-center gap-2 transition-all cursor-pointer"
          >
            <Share2 size={15} />
            <span>Share</span>
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="px-6 py-2.5 bg-[#1d4ed8] hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <Download size={15} />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}

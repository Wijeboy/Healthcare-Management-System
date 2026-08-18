// src/pages/MedicalRecords.jsx
import React, { useState } from 'react';
import Sidebar from '../../components/common/Sidebar';
import Header from '../../components/common/Header';
import { FileText, Download, Eye, Filter, Search, Calendar, User } from 'lucide-react';

const mockPatient = {
  id: 'P001',
  name: 'Imasha Perera',
  email: 'imasha@example.com',
  phone: '+94 77 123 4567',
  dateOfBirth: '1995-06-15',
  gender: 'Female',
  address: 'Colombo, Sri Lanka',
};

const mockRecords = [
  {
    id: '1',
    date: 'June 5, 2026',
    type: 'Blood Test Results',
    doctor: 'Dr. Nimal Fernando',
    diagnosis: 'Complete Blood Count - Normal',
    notes: 'All values within normal range. Continue current medication.',
    status: 'New',
    attachments: ['blood_test_report.pdf']
  },
  {
    id: '2',
    date: 'May 28, 2026',
    type: 'X-Ray Report',
    doctor: 'Dr. Priya Silva',
    diagnosis: 'Chest X-Ray - Clear',
    notes: 'No abnormalities detected. Follow-up in 6 months.',
    status: 'Read',
    attachments: ['xray_chest.pdf', 'xray_image.jpg']
  },
  {
    id: '3',
    date: 'May 15, 2026',
    type: 'Consultation Notes',
    doctor: 'Dr. Rajesh Kumar',
    diagnosis: 'General Checkup - Healthy',
    notes: 'Patient reports feeling well. Blood pressure normal. Recommended annual screening.',
    status: 'Read'
  },
  {
    id: '4',
    date: 'April 20, 2026',
    type: 'ECG Report',
    doctor: 'Dr. Sarah Johnson',
    diagnosis: 'Electrocardiogram - Normal Sinus Rhythm',
    notes: 'Heart rhythm regular. No signs of cardiac abnormalities.',
    status: 'New',
    attachments: ['ecg_report.pdf']
  }
];

const MedicalRecords = () => {
  const [records] = useState(mockRecords);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecords = records.filter(record => {
    const matchesType = filterType === 'all' || record.type.toLowerCase().includes(filterType.toLowerCase());
    const matchesStatus = filterStatus === 'all' || record.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar patientData={mockPatient} />
      <Header />
      
      <main className="ml-64 pt-20 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Medical Records</h1>
                <p className="text-gray-600">View and download your medical reports and test results</p>
              </div>
              <div className="mt-4 lg:mt-0 flex space-x-3">
                <div className="bg-primary-light text-primary px-4 py-2 rounded-lg">
                  <span className="font-semibold">{records.filter(r => r.status === 'New').length}</span>
                  <span className="ml-1">New Reports</span>
                </div>
                <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg">
                  <span className="font-semibold">{records.length}</span>
                  <span className="ml-1">Total Records</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Search */}
              <div className="lg:col-span-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search records..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Type Filter */}
              <div>
                <select 
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="blood">Blood Test</option>
                  <option value="xray">X-Ray</option>
                  <option value="consultation">Consultation</option>
                  <option value="ecg">ECG</option>
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="new">New Reports</option>
                  <option value="read">Read Reports</option>
                </select>
              </div>
            </div>
          </div>

          {/* Records List */}
          <div className="space-y-4">
            {filteredRecords.map((record) => (
              <div key={record.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-3 bg-primary-light rounded-lg">
                            <FileText className="text-primary" size={24} />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{record.type}</h3>
                            {record.status === 'New' && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                                New
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="text-gray-400" size={16} />
                          <span className="text-sm text-gray-600">Date: {record.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="text-gray-400" size={16} />
                          <span className="text-sm text-gray-600">Doctor: {record.doctor}</span>
                        </div>
                      </div>

                      {/* Diagnosis */}
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-800 mb-2">Diagnosis</h4>
                        <p className="text-gray-600">{record.diagnosis}</p>
                      </div>

                      {/* Notes */}
                      {record.notes && (
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-800 mb-2">Doctor's Notes</h4>
                          <p className="text-gray-600">{record.notes}</p>
                        </div>
                      )}

                      {/* Attachments */}
                      {record.attachments && record.attachments.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-800 mb-2">Attachments ({record.attachments.length})</h4>
                          <div className="flex flex-wrap gap-2">
                            {record.attachments.map((attachment, index) => (
                              <div key={index} className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
                                <FileText size={16} className="text-gray-600" />
                                <span className="text-sm text-gray-700">{attachment}</span>
                                <button className="text-primary hover:text-primary-dark">
                                  <Download size={14} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex lg:flex-col space-x-3 lg:space-x-0 lg:space-y-3 mt-4 lg:mt-0 lg:ml-6">
                      <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center space-x-2">
                        <Eye size={16} />
                        <span>View</span>
                      </button>
                      <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
                        <Download size={16} />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredRecords.length === 0 && (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <FileText size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-500 mb-2">No medical records found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MedicalRecords;
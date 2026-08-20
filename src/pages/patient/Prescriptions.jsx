// src/pages/Prescriptions.jsx
import React, { useState } from 'react';
import Sidebar from '../../components/common/Sidebar';
import Header from '../../components/common/Header';
import { Pill, Calendar, User, Clock, AlertCircle, Download } from 'lucide-react';

const mockPatient = {
  id: 'P001',
  name: 'Imasha Perera',
  email: 'imasha@example.com',
  phone: '+94 77 123 4567',
  dateOfBirth: '1995-06-15',
  gender: 'Female',
  address: 'Colombo, Sri Lanka',
};

const mockPrescriptions = [
  {
    id: '1',
    date: 'June 5, 2026',
    doctor: 'Dr. Nimal Fernando',
    status: 'Active',
    medications: [
      {
        name: 'Amoxicillin',
        dosage: '500mg',
        frequency: '3 times daily',
        duration: '7 days',
        instructions: 'Take with food'
      },
      {
        name: 'Paracetamol',
        dosage: '500mg',
        frequency: 'As needed',
        duration: '5 days',
        instructions: 'For pain relief'
      }
    ],
    notes: 'Complete the full course of antibiotics. Return if symptoms persist.'
  },
  {
    id: '2',
    date: 'May 28, 2026',
    doctor: 'Dr. Priya Silva',
    status: 'Completed',
    medications: [
      {
        name: 'Metformin',
        dosage: '850mg',
        frequency: '2 times daily',
        duration: '30 days',
        instructions: 'Take with meals'
      }
    ],
    notes: 'Monitor blood sugar levels regularly.'
  },
  {
    id: '3',
    date: 'May 10, 2026',
    doctor: 'Dr. Rajesh Kumar',
    status: 'Expired',
    medications: [
      {
        name: 'Ibuprofen',
        dosage: '400mg',
        frequency: '2 times daily',
        duration: '3 days',
        instructions: 'Take after meals'
      }
    ],
    notes: 'For muscle pain relief.'
  }
];

const Prescriptions = () => {
  const [prescriptions] = useState(mockPrescriptions);
  const [filterStatus, setFilterStatus] = useState('all');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-success bg-green-50 border-green-200';
      case 'Completed': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Expired': return 'text-danger bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const filteredPrescriptions = prescriptions.filter(prescription => {
    return filterStatus === 'all' || prescription.status.toLowerCase() === filterStatus.toLowerCase();
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
                <h1 className="text-3xl font-bold text-gray-800 mb-2">My Prescriptions</h1>
                <p className="text-gray-600">View and manage your medication prescriptions</p>
              </div>
              <div className="mt-4 lg:mt-0 flex space-x-3">
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg">
                  <span className="font-semibold">{prescriptions.filter(p => p.status === 'Active').length}</span>
                  <span className="ml-1">Active</span>
                </div>
                <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg">
                  <span className="font-semibold">{prescriptions.length}</span>
                  <span className="ml-1">Total</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filter */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Filter by status:</label>
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Prescriptions</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>

          {/* Prescriptions List */}
          <div className="space-y-6">
            {filteredPrescriptions.map((prescription) => (
              <div key={prescription.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  {/* Prescription Header */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                    <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                      <div className="p-3 bg-primary-light rounded-lg">
                        <Pill className="text-primary" size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">Prescription #{prescription.id}</h3>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar size={16} />
                            <span>{prescription.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User size={16} />
                            <span>{prescription.doctor}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(prescription.status)}`}>
                        {prescription.status}
                      </span>
                      <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center space-x-2">
                        <Download size={16} />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>

                  {/* Medications */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                      <Pill size={18} className="mr-2 text-primary" />
                      Medications ({prescription.medications.length})
                    </h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {prescription.medications.map((medication, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h5 className="font-semibold text-gray-800 text-lg">{medication.name}</h5>
                            <span className="text-primary font-medium text-sm bg-primary-light px-2 py-1 rounded">
                              {medication.dosage}
                            </span>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center space-x-2">
                              <Clock size={14} className="text-gray-400" />
                              <span className="text-gray-600">
                                <strong>Frequency:</strong> {medication.frequency}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar size={14} className="text-gray-400" />
                              <span className="text-gray-600">
                                <strong>Duration:</strong> {medication.duration}
                              </span>
                            </div>
                            {medication.instructions && (
                              <div className="flex items-start space-x-2">
                                <AlertCircle size={14} className="text-warning mt-0.5" />
                                <span className="text-gray-600">
                                  <strong>Instructions:</strong> {medication.instructions}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Doctor's Notes */}
                  {prescription.notes && (
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Doctor's Notes</h4>
                      <p className="text-gray-600">{prescription.notes}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {prescription.status === 'Active' && (
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center space-x-2">
                          <span>Refill Request</span>
                        </button>
                        <button className="bg-warning text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center space-x-2">
                          <span>Report Side Effects</span>
                        </button>
                        <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                          <span>Set Reminder</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredPrescriptions.length === 0 && (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <Pill size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-500 mb-2">No prescriptions found</h3>
              <p className="text-gray-400">Try adjusting your filter criteria</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};


export default Prescriptions;
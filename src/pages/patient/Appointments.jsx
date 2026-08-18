// src/pages/Appointments.jsx
import React, { useState } from 'react';
import Sidebar from '../../components/common/Sidebar';
import Header from '../../components/common/Header';
import { Calendar, Clock, User, MapPin, Plus, Filter, Search, Eye, Edit, X } from 'lucide-react';

const mockPatient = {
  id: 'P001',
  name: 'Imasha Perera',
  email: 'imasha@example.com',
  phone: '+94 77 123 4567',
  dateOfBirth: '1995-06-15',
  gender: 'Female',
  address: 'Colombo, Sri Lanka',
};

const mockAppointments = [
  {
    id: '1',
    date: 'June 12, 2026',
    time: '10:00 AM',
    doctor: 'Dr. Nimal Fernando',
    department: 'Cardiology',
    status: 'Confirmed'
  },
  {
    id: '2',
    date: 'June 20, 2026',
    time: '2:00 PM',
    doctor: 'Dr. Priya Silva',
    department: 'General Medicine',
    status: 'Pending'
  },
  {
    id: '3',
    date: 'June 25, 2026',
    time: '9:30 AM',
    doctor: 'Dr. Rajesh Kumar',
    department: 'Neurology',
    status: 'Confirmed'
  },
  {
    id: '4',
    date: 'July 5, 2026',
    time: '3:00 PM',
    doctor: 'Dr. Sarah Johnson',
    department: 'Dermatology',
    status: 'Pending'
  }
];

const Appointments = () => {
  const [appointments] = useState(mockAppointments);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'text-success bg-green-50 border-green-200';
      case 'Pending': return 'text-warning bg-yellow-50 border-yellow-200';
      case 'Cancelled': return 'text-danger bg-red-50 border-red-200';
      case 'Completed': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesStatus = filterStatus === 'all' || appointment.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.department.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
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
              <div className="mb-4 lg:mb-0">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">My Appointments</h1>
                <p className="text-gray-600">Manage and track your medical appointments</p>
              </div>
              <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors flex items-center space-x-2 font-medium">
                <Plus size={20} />
                <span>Book New Appointment</span>
              </button>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
              {/* Search */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search by doctor or department..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="flex items-center space-x-2">
                <Filter size={20} className="text-gray-400" />
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Appointments Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="p-6">
                  {/* Status Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                    <div className="flex space-x-2">
                      <button className="p-2 text-primary hover:bg-primary-light rounded-lg transition-colors">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-danger hover:bg-red-100 rounded-lg transition-colors">
                        <X size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary-light rounded-lg">
                        <Calendar className="text-primary" size={20} />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{appointment.date}</div>
                        <div className="text-sm text-gray-600 flex items-center">
                          <Clock size={14} className="mr-1" />
                          {appointment.time}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <User className="text-green-600" size={20} />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{appointment.doctor}</div>
                        <div className="text-sm text-gray-600">{appointment.department}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <MapPin className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">Medimate Medical Center</div>
                        <div className="text-sm text-gray-600">Main Building, Floor 2</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex space-x-3">
                    {appointment.status === 'Pending' && (
                      <button className="flex-1 bg-success text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors font-medium">
                        Confirm
                      </button>
                    )}
                    <button className="flex-1 bg-primary-light text-primary py-2 px-4 rounded-lg hover:bg-blue-200 transition-colors font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredAppointments.length === 0 && (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <Calendar size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-500 mb-2">No appointments found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
              <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium">
                Book New Appointment
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Appointments;
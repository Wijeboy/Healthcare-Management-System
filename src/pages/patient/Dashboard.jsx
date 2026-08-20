// src/pages/Dashboard.jsx
import React from 'react';
import Sidebar from '../../components/common/Sidebar';
import Header from '../../components/common/Header';
import {
  Calendar,
  Clock,
  Folder,
  CreditCard,
  ChevronRight,
  Plus,
  MoreVertical,
  ExternalLink,
  Heart,
  Brain,
  Sun,
  Stethoscope
} from 'lucide-react';

// Enhanced mock data with patient photo
const mockPatient = {
  id: 'P001',
  name: 'Imasha',
  email: 'imasha@medimate.com',
  phone: '+94 77 123 4567',
  dateOfBirth: '1995-06-15',
  gender: 'Female',
  address: 'Colombo, Sri Lanka',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612e995?w=150&h=150&fit=crop&crop=face'
};

const mockDashboardData = {
  nextAppointment: {
    date: 'June 10',
    time: '10:00 AM',
    doctor: 'Nirmal Jayawardhana',
    isUrgent: true
  },
  unreadReports: 2,
  pendingBills: 150
};

const mockAppointments = [
  {
    id: '1',
    date: 'June 12, 2024',
    time: '10:00 AM',
    doctor: 'Dr. Nimal',
    department: 'Cardiology',
    status: 'Confirmed',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=50&h=50&fit=crop&crop=face'
  },
  {
    id: '2',
    date: 'June 20, 2024',
    time: '2:00 PM',
    doctor: 'Dr. Priya Silva',
    department: 'General Medicine',
    status: 'Pending',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=50&h=50&fit=crop&crop=face'
  },
  {
    id: '3',
    date: 'June 25, 2024',
    time: '9:30 AM',
    doctor: 'Dr. Rajesh Kumar',
    department: 'Neurology',
    status: 'Confirmed',
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=50&h=50&fit=crop&crop=face'
  }
];

const departmentStyles = {
  Cardiology: { icon: Heart, classes: 'bg-blue-50 text-blue-700' },
  'General Medicine': { icon: Stethoscope, classes: 'bg-emerald-50 text-emerald-700' },
  Neurology: { icon: Brain, classes: 'bg-purple-50 text-purple-700' },
  Dermatology: { icon: Sun, classes: 'bg-orange-50 text-orange-700' }
};

const Dashboard = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-50 text-green-700';
      case 'Pending': return 'bg-yellow-50 text-yellow-700';
      case 'Cancelled': return 'bg-red-50 text-red-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const getDepartmentStyle = (department) =>
    departmentStyles[department] || { icon: Stethoscope, classes: 'bg-gray-50 text-gray-700' };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    const day = date.getDate();
    return { month, day };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar patientData={mockPatient} />
      <Header />

      <main className="ml-64 pt-20 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Welcome, {mockPatient.name} 👋
            </h1>
            <p className="text-gray-500">Here's what's happening with your health today.</p>
          </div>

          {/* Summary Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {/* Next Appointment Card */}
            <div className="relative bg-white rounded-2xl border-2 border-primary p-5 overflow-hidden">
              {mockDashboardData?.nextAppointment?.isUrgent && (
                <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold tracking-wide px-3 py-1 rounded-bl-lg">
                  URGENT
                </div>
              )}

              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="text-primary" size={20} />
              </div>

              <h3 className="text-sm font-semibold text-gray-500 mb-2">Next Appointment</h3>

              {mockDashboardData?.nextAppointment ? (
                <>
                  <p className="text-base font-bold text-primary mb-1">
                    {mockDashboardData.nextAppointment.date}, {mockDashboardData.nextAppointment.time}
                  </p>
                  <button className="flex items-center text-sm text-gray-500 mb-4 hover:text-gray-700 transition-colors">
                    <span>Dr. {mockDashboardData.nextAppointment.doctor}</span>
                    <ChevronRight size={14} className="ml-0.5" />
                  </button>
                </>
              ) : (
                <p className="text-gray-500 mb-4">No upcoming appointments</p>
              )}

              <button className="w-full border border-primary text-primary py-2.5 rounded-lg hover:bg-primary-light transition-colors flex items-center justify-center space-x-1 text-sm font-semibold">
                <span>View Details</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Unread Reports Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <Folder className="text-primary" size={20} />
              </div>

              <h3 className="text-sm font-semibold text-gray-500 mb-2">Unread Reports</h3>
              <p className="text-base font-bold text-gray-900 mb-4">
                {mockDashboardData?.unreadReports || 0} new reports
              </p>

              <button className="w-full border border-gray-200 text-gray-700 py-2.5 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-1.5 text-sm font-semibold">
                <span>Open Portal</span>
                <ExternalLink size={14} />
              </button>
            </div>

            {/* Pending Bills Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <CreditCard className="text-primary" size={20} />
              </div>

              <h3 className="text-sm font-semibold text-gray-500 mb-2">Pending Bills</h3>
              <p className="text-base font-bold text-red-600 mb-4">
                Rs. {mockDashboardData?.pendingBills?.toLocaleString() || 0}
              </p>

              <button className="w-full bg-primary-dark text-white py-2.5 rounded-lg hover:bg-primary transition-colors flex items-center justify-center space-x-1.5 text-sm font-semibold">
                <span>Pay now</span>
                <CreditCard size={14} />
              </button>
            </div>
          </div>

          {/* Upcoming Appointments Table */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 bg-gray-900 flex justify-between items-center">
              <h2 className="text-base font-bold text-white">Upcoming Appointments</h2>
              <button className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition-colors flex items-center space-x-1.5 text-sm font-semibold">
                <Plus size={16} />
                <span>Schedule New</span>
              </button>
            </div>

            {mockAppointments && mockAppointments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">Doctor Name</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {mockAppointments.map((appointment, index) => {
                      const dateInfo = formatDate(appointment.date);
                      const deptStyle = getDepartmentStyle(appointment.department);
                      const DeptIcon = deptStyle.icon;
                      return (
                        <tr key={appointment.id || index} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-11 h-11 bg-blue-50 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                                <span className="text-[10px] font-semibold text-primary leading-none">{dateInfo.month}</span>
                                <span className="text-sm font-bold text-primary leading-tight">{dateInfo.day}</span>
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900 text-sm">{appointment.date}</div>
                                <div className="text-xs text-gray-400 flex items-center mt-0.5">
                                  <Clock size={12} className="mr-1" />
                                  {appointment.time}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2.5">
                              <img
                                src={appointment.avatar}
                                alt={appointment.doctor}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                              <span className="font-semibold text-gray-900 text-sm">{appointment.doctor}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${deptStyle.classes}`}>
                              <DeptIcon size={12} />
                              {appointment.department}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(appointment.status)}`}>
                              {appointment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
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
              <div className="text-center py-12">
                <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-500 mb-2">No upcoming appointments</h3>
                <p className="text-gray-400 mb-4">Schedule your first appointment to get started</p>
                <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium">
                  Book Appointment
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <footer className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-primary/70">
              <p>© 2024 CareConnect Health Systems. All rights reserved.</p>
              <div className="flex space-x-6 mt-3 md:mt-0">
                <button className="hover:text-primary transition-colors">Privacy</button>
                <button className="hover:text-primary transition-colors">Terms</button>
                <button className="hover:text-primary transition-colors">Audit Log</button>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};


export default Dashboard;
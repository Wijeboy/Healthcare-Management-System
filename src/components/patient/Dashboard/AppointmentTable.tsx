// src/components/patient/Dashboard/AppointmentTable.tsx
import React from 'react';
import { Eye, Edit, X, Plus, Calendar } from 'lucide-react';

interface Appointment {
  id: string;
  date: string;
  time: string;
  doctor: string;
  department: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed';
}

interface AppointmentTableProps {
  appointments: Appointment[];
}

const AppointmentTable: React.FC<AppointmentTableProps> = ({ appointments }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'text-success bg-green-50 border-green-200';
      case 'Pending': return 'text-warning bg-yellow-50 border-yellow-200';
      case 'Cancelled': return 'text-danger bg-red-50 border-red-200';
      case 'Completed': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Upcoming Appointments</h2>
            <p className="text-sm text-gray-600 mt-1">Manage your scheduled medical appointments</p>
          </div>
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center space-x-2 font-medium shadow-sm">
            <Plus size={18} />
            <span>Schedule New</span>
          </button>
        </div>
      </div>

      {appointments && appointments.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.map((appointment, index) => (
                <tr key={appointment.id || index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-gray-900">{appointment.date}</div>
                      <div className="text-sm text-gray-500">{appointment.time}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Dr. {appointment.doctor}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{appointment.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button 
                        className="p-2 text-primary hover:bg-primary-light hover:text-primary-dark rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        className="p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 rounded-lg transition-colors"
                        title="Edit Appointment"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        className="p-2 text-danger hover:bg-red-100 hover:text-red-700 rounded-lg transition-colors"
                        title="Cancel Appointment"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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
  );
};

export default AppointmentTable;
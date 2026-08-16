// src/components/EmergencyCall.tsx
import React, { useState } from 'react';
import { Phone, X, MapPin, Clock, AlertTriangle, User, MessageSquare } from 'lucide-react';

interface EmergencyCallProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmergencyCall: React.FC<EmergencyCallProps> = ({ isOpen, onClose }) => {
  const [selectedService, setSelectedService] = useState<string>('');
  const [emergencyDetails, setEmergencyDetails] = useState({
    type: '',
    description: '',
    location: '',
    patientCondition: ''
  });

  if (!isOpen) return null;

  const emergencyServices = [
    {
      id: 'ambulance',
      name: 'Ambulance',
      number: '+94 11 123 4567',
      description: 'Medical emergency requiring immediate transport',
      icon: '🚑'
    },
    {
      id: 'hospital',
      name: 'Emergency Room',
      number: '+94 11 123 4568',
      description: 'Direct line to hospital emergency department',
      icon: '🏥'
    },
    {
      id: 'poison',
      name: 'Poison Control',
      number: '+94 11 123 4569',
      description: 'Poisoning or overdose emergency',
      icon: '☠️'
    },
    {
      id: 'mental',
      name: 'Mental Health Crisis',
      number: '+94 11 123 4570',
      description: 'Mental health emergency support',
      icon: '🧠'
    },
    {
      id: 'police',
      name: 'Police',
      number: '119',
      description: 'Emergency requiring police assistance',
      icon: '👮'
    },
    {
      id: 'fire',
      name: 'Fire Department',
      number: '110',
      description: 'Fire emergency or rescue services',
      icon: '🚒'
    }
  ];

  const handleCall = (service: any) => {
    // In a real app, this would initiate the call
    alert(`Calling ${service.name} at ${service.number}`);
  };

  const handleQuickReport = () => {
    // Send emergency details to medical team
    alert('Emergency report sent to medical team. Help is on the way!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-danger text-white p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertTriangle size={32} />
              <div>
                <h2 className="text-2xl font-bold">Emergency Services</h2>
                <p className="text-red-100">Get immediate help in case of emergency</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-red-200 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Quick Actions */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Phone className="mr-2 text-danger" size={20} />
              Quick Call Emergency Services
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {emergencyServices.map((service) => (
                <div key={service.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl">{service.icon}</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">{service.name}</h4>
                      <p className="text-danger font-bold">{service.number}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                  <button
                    onClick={() => handleCall(service)}
                    className="w-full bg-danger text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Phone size={18} />
                    <span>Call Now</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Report Form */}
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <MessageSquare className="mr-2 text-primary" size={20} />
              Quick Emergency Report
            </h3>
            <p className="text-gray-600 mb-6">Send your emergency details to the medical team for faster response</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Type</label>
                <select
                  value={emergencyDetails.type}
                  onChange={(e) => setEmergencyDetails({...emergencyDetails, type: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-danger focus:border-transparent"
                >
                  <option value="">Select emergency type</option>
                  <option value="chest-pain">Chest Pain</option>
                  <option value="difficulty-breathing">Difficulty Breathing</option>
                  <option value="severe-injury">Severe Injury</option>
                  <option value="unconscious">Loss of Consciousness</option>
                  <option value="allergic-reaction">Severe Allergic Reaction</option>
                  <option value="mental-health">Mental Health Crisis</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Patient Condition</label>
                <select
                  value={emergencyDetails.patientCondition}
                  onChange={(e) => setEmergencyDetails({...emergencyDetails, patientCondition: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-danger focus:border-transparent"
                >
                  <option value="">Select condition</option>
                  <option value="conscious">Conscious and Alert</option>
                  <option value="confused">Conscious but Confused</option>
                  <option value="unconscious">Unconscious</option>
                  <option value="difficulty-speaking">Difficulty Speaking</option>
                  <option value="severe-pain">In Severe Pain</option>
                </select>
              </div>

              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Location</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={emergencyDetails.location}
                    onChange={(e) => setEmergencyDetails({...emergencyDetails, location: e.target.value})}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-danger focus:border-transparent"
                    placeholder="Enter your current location"
                  />
                  <button className="bg-primary text-white px-4 py-3 rounded-lg hover:bg-primary-dark transition-colors flex items-center space-x-2">
                    <MapPin size={18} />
                    <span>Use GPS</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={emergencyDetails.description}
                  onChange={(e) => setEmergencyDetails({...emergencyDetails, description: e.target.value})}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-danger focus:border-transparent"
                  placeholder="Describe the emergency situation in detail..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleQuickReport}
                className="px-6 py-3 bg-danger text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
              >
                <AlertTriangle size={18} />
                <span>Send Emergency Report</span>
              </button>
            </div>
          </div>

          {/* Important Information */}
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="text-yellow-600 mt-1" size={20} />
              <div>
                <h4 className="font-semibold text-yellow-800 mb-2">Important Emergency Information</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• If this is a life-threatening emergency, call 911 or your local emergency number immediately</li>
                  <li>• Stay calm and provide clear information about your location and situation</li>
                  <li>• Do not hang up until the operator tells you to do so</li>
                  <li>• If possible, have someone else make the call while you provide first aid</li>
                  <li>• Your medical information has been pre-filled to help emergency responders</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyCall;
// src/pages/Support.jsx
import React, { useState } from 'react';
import Sidebar from '../../components/common/Sidebar';
import Header from '../../components/common/Header';
import {
  AlertCircle,
  Phone,
  Mail,
  Clock,
  Lock,
  Send,
  ChevronDown,
  ChevronUp,
  Stethoscope,
  Receipt,
  Laptop
} from 'lucide-react';

const mockPatient = {
  id: 'P001',
  name: 'Imasha Perera',
  email: 'imasha@example.com',
  phone: '+94 77 123 4567',
  dateOfBirth: '1995-06-15',
  gender: 'Female',
  address: 'Colombo, Sri Lanka',
};

const contactCards = [
  {
    id: 'clinical',
    title: 'Clinical Support',
    icon: Stethoscope,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    phone: '1-800-CARE-CLN',
    email: 'nurse@carepulse.com',
    hours: 'Mon-Fri: 8AM - 8PM'
  },
  {
    id: 'billing',
    title: 'Billing Inquiries',
    icon: Receipt,
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600',
    phone: '1-800-CARE-BILL',
    email: 'billing@carepulse.com',
    hours: 'Mon-Fri: 9AM - 5PM'
  },
  {
    id: 'technical',
    title: 'Technical Support',
    icon: Laptop,
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    phone: '1-800-CARE-TECH',
    email: 'support@carepulse.com',
    hours: '24/7 Availability'
  }
];

const quickAnswers = [
  {
    id: '1',
    question: 'How do I view my payment history?',
    answer: 'Navigate to Payments in the sidebar to review your billing statements, invoices, and payment history.'
  },
  {
    id: '2',
    question: 'Where are my lab results?',
    answer: 'Your lab results are available in the Records section under the Lab Reports tab, organized by normal and abnormal findings.'
  },
  {
    id: '3',
    question: 'Can I message my doctor?',
    answer: 'Direct messaging with your doctor is coming soon. For now, use the Secure Message form below or call our Clinical Support line.'
  },
  {
    id: '4',
    question: 'Resetting my password?',
    answer: 'Go to your account Settings and select "Change Password." You will need to confirm your current password before setting a new one.'
  }
];

const Support = () => {
  const [expanded, setExpanded] = useState('1');
  const [form, setForm] = useState({
    name: 'asmith',
    email: 'asmith@medcore.health',
    message: ''
  });

  const toggleAnswer = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Your message has been sent securely. Our team will respond shortly.');
    setForm((prev) => ({ ...prev, message: '' }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar patientData={mockPatient} />
      <Header />

      <main className="ml-64 pt-20 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Contact Support</h1>
            <p className="text-gray-500 text-sm mt-1">
              We're here to help you manage your health and answer any questions you may have.
            </p>
          </div>

          {/* Urgent Medical Needs Banner */}
          <div className="bg-red-50 border border-red-100 rounded-2xl p-5 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start space-x-3">
              <AlertCircle size={22} className="text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-red-700">Urgent Medical Needs</h3>
                <p className="text-sm text-red-600 mt-1 max-w-lg">
                  If you are experiencing a life-threatening emergency, please call 911 immediately or visit the nearest emergency room.
                </p>
              </div>
            </div>
            <button className="flex items-center justify-center space-x-2 bg-red-500 text-white px-5 py-2.5 rounded-lg hover:bg-red-600 transition-colors font-semibold text-sm flex-shrink-0">
              <Phone size={16} />
              <span>24/7 Nurse Hotline</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Secure Message Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center space-x-2 mb-5">
                  <Lock size={18} className="text-primary" />
                  <h3 className="font-bold text-gray-900">Secure Message</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">Name</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">Email Address</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">Message</label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Please describe your needs in detail..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="flex items-center text-xs text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2"></span>
                      HIPAA Compliant Secure Channel
                    </span>
                    <button
                      type="submit"
                      className="flex items-center space-x-2 bg-primary-dark text-white px-5 py-2.5 rounded-lg hover:bg-primary transition-colors font-semibold text-sm"
                    >
                      <Send size={16} />
                      <span>Send Securely</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Contact Cards + Quick Answers */}
            <div className="lg:col-span-1 space-y-4">
              {contactCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.id} className="bg-white rounded-2xl border border-gray-100 p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${card.iconBg}`}>
                        <Icon size={16} className={card.iconColor} />
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm">{card.title}</h4>
                    </div>
                    <div className="space-y-1.5 text-sm text-gray-500">
                      <p className="flex items-center"><Phone size={13} className="mr-2 flex-shrink-0" />{card.phone}</p>
                      <p className="flex items-center"><Mail size={13} className="mr-2 flex-shrink-0" />{card.email}</p>
                      <p className="flex items-center"><Clock size={13} className="mr-2 flex-shrink-0" />{card.hours}</p>
                    </div>
                  </div>
                );
              })}

              {/* Quick Answers */}
              <div className="bg-white rounded-2xl border border-gray-100 p-4">
                <h4 className="font-bold text-gray-900 text-sm mb-3">Quick Answers</h4>
                <div className="space-y-2">
                  {quickAnswers.map((qa) => (
                    <div key={qa.id} className="border border-gray-100 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleAnswer(qa.id)}
                        className="w-full flex items-center justify-between px-3 py-2.5 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-sm text-gray-700 font-medium">{qa.question}</span>
                        {expanded === qa.id ? (
                          <ChevronUp size={15} className="text-gray-400 flex-shrink-0 ml-2" />
                        ) : (
                          <ChevronDown size={15} className="text-gray-400 flex-shrink-0 ml-2" />
                        )}
                      </button>
                      {expanded === qa.id && (
                        <div className="px-3 pb-3 text-xs text-gray-500 leading-relaxed">
                          {qa.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
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

export default Support;
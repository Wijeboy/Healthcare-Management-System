// src/pages/PatientPages/Support.jsx
import React, { useState } from 'react';
import { 
  PhoneCall, 
  Lock, 
  Send, 
  Headphones, 
  CreditCard, 
  Wrench, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2,
  Mail,
  Clock,
  Phone
} from 'lucide-react';

const faqs = [
  {
    id: 'faq1',
    question: 'How do I view my payment history?',
    answer: 'Navigate to Payments in the sidebar to review your billing statements, invoices, and payment history.'
  },
  {
    id: 'faq2',
    question: 'Where are my lab results?',
    answer: 'Your lab results are posted under Records -> Lab Reports tab as soon as they are released by the pathology clinic.'
  },
  {
    id: 'faq3',
    question: 'Can I message my doctor?',
    answer: 'Yes, you can send secure clinical inquiries through this support portal or request a tele-consultation appointment.'
  },
  {
    id: 'faq4',
    question: 'Resetting my password?',
    answer: 'You can update your security credentials under Settings -> Security, or click "Forgot Password" on the login screen.'
  }
];

export default function Support() {
  const [formData, setFormData] = useState({
    name: 'asmith',
    email: 'asmith@medcore.health',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState('faq1');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ ...formData, message: '' });
    }, 3000);
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#003f87] tracking-tight">
          Support
        </h1>
      </div>

      {/* Subheader Title */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Contact Support</h2>
        <p className="text-xs text-gray-500 mt-1">
          We're here to help you manage your health and answer any questions you may have.
        </p>
      </div>

      {/* Urgent Medical Needs Red Alert Banner */}
      <div className="bg-red-50 border-l-4 border-red-500 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-extrabold text-base shrink-0 mt-0.5">
            *
          </div>
          <div>
            <h3 className="text-sm font-bold text-red-900">Urgent Medical Needs</h3>
            <p className="text-xs text-red-700 mt-0.5 max-w-xl leading-relaxed">
              If you are experiencing a life-threatening emergency, please call 911 immediately or visit the nearest emergency room.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => alert("Connecting to 24/7 Nurse Hotline: 1-800-CARE-CLN")}
          className="bg-[#b91c1c] hover:bg-red-800 text-white font-bold text-xs px-5 py-3 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all shrink-0 cursor-pointer"
        >
          <PhoneCall size={16} />
          <span>24/7 Nurse Hotline</span>
        </button>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Secure Message Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2">
            <Lock size={18} className="text-[#003f87]" />
            <h3 className="text-base font-bold text-gray-900">Secure Message</h3>
          </div>

          {submitted && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2 animate-fade-in">
              <CheckCircle2 size={16} />
              <span>Message transmitted securely! Our clinical team will respond shortly.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#003f87]/20 focus:border-[#003f87]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#003f87]/20 focus:border-[#003f87]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Message</label>
              <textarea
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Please describe your needs in detail..."
                className="w-full p-3.5 bg-gray-50/80 border border-gray-200 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#003f87]/20 focus:border-[#003f87]"
                required
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[11px] text-gray-400 font-medium flex items-center gap-1">
                <Lock size={12} /> HIPAA Compliant Secure Channel
              </span>
              <button
                type="submit"
                className="w-full sm:w-auto bg-[#003f87] hover:bg-blue-900 text-white font-bold py-2.5 px-6 rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <Send size={15} />
                <span>Send Securely</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Contact Cards & Quick Answers (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* 3 Contact Cards */}
          <div className="space-y-3">
            {/* Card 1: Clinical Support */}
            <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-xs flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1d70f5] flex items-center justify-center shrink-0">
                <Headphones size={18} />
              </div>
              <div className="text-xs space-y-1">
                <h4 className="font-bold text-gray-900">Clinical Support</h4>
                <p className="text-gray-600 flex items-center gap-1.5"><Phone size={12} className="text-gray-400" /> 1-800-CARE-CLN</p>
                <p className="text-gray-600 flex items-center gap-1.5"><Mail size={12} className="text-gray-400" /> nurse@carepulse.com</p>
                <p className="text-gray-400 flex items-center gap-1.5 text-[11px]"><Clock size={12} /> Mon-Fri: 8AM - 8PM</p>
              </div>
            </div>

            {/* Card 2: Billing Inquiries */}
            <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-xs flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                <CreditCard size={18} />
              </div>
              <div className="text-xs space-y-1">
                <h4 className="font-bold text-gray-900">Billing Inquiries</h4>
                <p className="text-gray-600 flex items-center gap-1.5"><Phone size={12} className="text-gray-400" /> 1-800-CARE-BILL</p>
                <p className="text-gray-600 flex items-center gap-1.5"><Mail size={12} className="text-gray-400" /> billing@carepulse.com</p>
                <p className="text-gray-400 flex items-center gap-1.5 text-[11px]"><Clock size={12} /> Mon-Fri: 9AM - 5PM</p>
              </div>
            </div>

            {/* Card 3: Technical Support */}
            <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-xs flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Wrench size={18} />
              </div>
              <div className="text-xs space-y-1">
                <h4 className="font-bold text-gray-900">Technical Support</h4>
                <p className="text-gray-600 flex items-center gap-1.5"><Phone size={12} className="text-gray-400" /> 1-800-CARE-TECH</p>
                <p className="text-gray-600 flex items-center gap-1.5"><Mail size={12} className="text-gray-400" /> support@carepulse.com</p>
                <p className="text-gray-400 flex items-center gap-1.5 text-[11px]"><Clock size={12} /> 24/7 Availability</p>
              </div>
            </div>
          </div>

          {/* Quick Answers Accordion Box */}
          <div className="bg-blue-50/50 rounded-2xl border border-blue-100 p-5 space-y-3">
            <h3 className="text-base font-bold text-gray-900">Quick Answers</h3>

            <div className="space-y-2">
              {faqs.map((faq) => {
                const isOpen = openFaq === faq.id;
                return (
                  <div key={faq.id} className="bg-white rounded-xl border border-gray-200/70 overflow-hidden text-xs">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? '' : faq.id)}
                      className="w-full p-3 font-bold text-gray-800 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? <ChevronUp size={16} className="text-gray-400 shrink-0" /> : <ChevronDown size={16} className="text-gray-400 shrink-0" />}
                    </button>
                    {isOpen && (
                      <div className="px-3 pb-3 pt-1 text-gray-600 text-[11px] leading-relaxed border-t border-gray-100">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

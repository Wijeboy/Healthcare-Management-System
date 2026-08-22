// src/pages/Support.jsx
import React, { useState } from 'react';
import { Phone, Mail, MessageCircle, Clock, HelpCircle, FileText, Send, ChevronDown, ChevronUp } from 'lucide-react';

const mockPatient = {
  id: 'P001',
  name: 'Imasha Perera',
  email: 'imasha@example.com',
  phone: '+94 77 123 4567',
  dateOfBirth: '1995-06-15',
  gender: 'Female',
  address: 'Colombo, Sri Lanka',
};

const mockFAQs = [
  {
    id: '1',
    question: 'How do I book an appointment?',
    answer: 'You can book an appointment by clicking on the "Book Appointment" button in the dashboard or navigating to the Appointments page. Select your preferred doctor, date, and time slot.',
    category: 'Appointments'
  },
  {
    id: '2',
    question: 'Can I cancel or reschedule my appointment?',
    answer: 'Yes, you can cancel or reschedule your appointment up to 24 hours before the scheduled time. Go to your appointments page and select the appointment you want to modify.',
    category: 'Appointments'
  },
  {
    id: '3',
    question: 'How do I access my medical records?',
    answer: 'Your medical records are available in the Medical Records section. You can view, download, and print your test results, reports, and consultation notes.',
    category: 'Medical Records'
  },
  {
    id: '4',
    question: 'How can I make payments online?',
    answer: 'Go to the Payments section to view your bills and make payments. We accept credit cards, debit cards, and bank transfers. All transactions are secure and encrypted.',
    category: 'Payments'
  },
  {
    id: '5',
    question: 'What should I do in case of emergency?',
    answer: 'For medical emergencies, please call our 24/7 emergency hotline at +94 11 123 4567 or visit the nearest emergency room. You can also use the Emergency Call button in the sidebar.',
    category: 'Emergency'
  },
  {
    id: '6',
    question: 'How do I update my personal information?',
    answer: 'You can update your personal information by going to your Profile page. Click on the Edit button and update your details. Make sure to save the changes.',
    category: 'Account'
  }
];

const Support = () => {
  const [activeTab, setActiveTab] = useState('contact');
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [feedbackForm, setFeedbackForm] = useState({
    subject: '',
    category: '',
    message: '',
    priority: 'medium'
  });

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    // Handle feedback submission
    console.log('Feedback submitted:', feedbackForm);
    // Reset form
    setFeedbackForm({
      subject: '',
      category: '',
      message: '',
      priority: 'medium'
    });
    alert('Thank you for your feedback! We will get back to you soon.');
  };

  const faqCategories = ['All', ...Array.from(new Set(mockFAQs.map(faq => faq.category)))];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredFAQs = selectedCategory === 'All' 
    ? mockFAQs 
    : mockFAQs.filter(faq => faq.category === selectedCategory);

  return (
    <section className="p-6 space-y-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Support Center</h1>
              <p className="text-gray-600">Get help and support for your healthcare needs</p>
            </div>
          </div>

          {/* Emergency Contact Banner */}
          <div className="bg-danger rounded-xl shadow-md p-6 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/20 rounded-lg">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Emergency Hotline</h3>
                  <p className="text-red-100">24/7 Emergency Support</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">+94 11 123 4567</div>
                <p className="text-red-100">Available 24/7</p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-xl shadow-md mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { key: 'contact', label: 'Contact Us', icon: Phone },
                  { key: 'faq', label: 'FAQ', icon: HelpCircle },
                  { key: 'feedback', label: 'Feedback', icon: MessageCircle }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm ${
                      activeTab === tab.key
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <tab.icon size={20} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {/* Contact Us Tab */}
              {activeTab === 'contact' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Get in Touch</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contact Methods */}
                    <div className="space-y-6">
                      <div className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="p-3 bg-primary-light rounded-lg">
                            <Phone className="text-primary" size={24} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">Phone Support</h4>
                            <p className="text-sm text-gray-600">Speak with our support team</p>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">General Inquiries:</span>
                            <span className="font-medium">+94 11 234 5678</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Appointments:</span>
                            <span className="font-medium">+94 11 234 5679</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Billing:</span>
                            <span className="font-medium">+94 11 234 5680</span>
                          </div>
                        </div>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="p-3 bg-blue-100 rounded-lg">
                            <Mail className="text-blue-600" size={24} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">Email Support</h4>
                            <p className="text-sm text-gray-600">Send us your questions</p>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">General:</span>
                            <span className="font-medium">support@medimate.lk</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Technical:</span>
                            <span className="font-medium">tech@medimate.lk</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Billing:</span>
                            <span className="font-medium">billing@medimate.lk</span>
                          </div>
                        </div>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="p-3 bg-green-100 rounded-lg">
                            <Clock className="text-green-600" size={24} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">Support Hours</h4>
                            <p className="text-sm text-gray-600">When we're available</p>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Monday - Friday:</span>
                            <span className="font-medium">8:00 AM - 8:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Saturday:</span>
                            <span className="font-medium">9:00 AM - 5:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Sunday:</span>
                            <span className="font-medium">Emergency Only</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-4">Quick Actions</h4>
                        <div className="space-y-3">
                          <button className="w-full bg-primary text-white p-4 rounded-lg hover:bg-primary-dark transition-colors flex items-center space-x-3">
                            <Phone size={20} />
                            <span>Call Support Now</span>
                          </button>
                          <button className="w-full bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-3">
                            <MessageCircle size={20} />
                            <span>Start Live Chat</span>
                          </button>
                          <button className="w-full bg-gray-100 text-gray-700 p-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-3">
                            <Mail size={20} />
                            <span>Send Email</span>
                          </button>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 mb-4">Self-Service</h4>
                        <div className="space-y-3">
                          <button className="w-full border border-gray-300 p-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <FileText size={20} className="text-gray-600" />
                              <span>User Guide</span>
                            </div>
                            <span className="text-sm text-gray-500">PDF Download</span>
                          </button>
                          <button className="w-full border border-gray-300 p-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <HelpCircle size={20} className="text-gray-600" />
                              <span>Video Tutorials</span>
                            </div>
                            <span className="text-sm text-gray-500">YouTube</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* FAQ Tab */}
              {activeTab === 'faq' && (
                <div>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 lg:mb-0">Frequently Asked Questions</h3>
                    <div className="flex space-x-2">
                      {faqCategories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            selectedCategory === category
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {filteredFAQs.map((faq) => (
                      <div key={faq.id} className="border border-gray-200 rounded-lg">
                        <button
                          onClick={() => toggleFAQ(faq.id)}
                          className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-sm text-primary bg-primary-light px-2 py-1 rounded">
                              {faq.category}
                            </span>
                            <span className="font-medium text-gray-800">{faq.question}</span>
                          </div>
                          {expandedFAQ === faq.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                        {expandedFAQ === faq.id && (
                          <div className="p-4 pt-0 text-gray-600 border-t border-gray-200">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Feedback Tab */}
              {activeTab === 'feedback' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Send Feedback</h3>
                  
                  <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subject *
                        </label>
                        <input
                          type="text"
                          required
                          value={feedbackForm.subject}
                          onChange={(e) => setFeedbackForm({...feedbackForm, subject: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Brief description of your feedback"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category *
                        </label>
                        <select
                          required
                          value={feedbackForm.category}
                          onChange={(e) => setFeedbackForm({...feedbackForm, category: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="">Select Category</option>
                          <option value="technical">Technical Issue</option>
                          <option value="billing">Billing</option>
                          <option value="appointment">Appointments</option>
                          <option value="feature">Feature Request</option>
                          <option value="general">General Feedback</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Priority
                      </label>
                      <div className="flex space-x-4">
                        {['low', 'medium', 'high'].map((priority) => (
                          <label key={priority} className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="priority"
                              value={priority}
                              checked={feedbackForm.priority === priority}
                              onChange={(e) => setFeedbackForm({...feedbackForm, priority: e.target.value})}
                              className="text-primary focus:ring-primary"
                            />
                            <span className="capitalize text-gray-700">{priority}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        required
                        rows={6}
                        value={feedbackForm.message}
                        onChange={(e) => setFeedbackForm({...feedbackForm, message: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Please provide detailed information about your feedback or issue..."
                      />
                    </div>

                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center space-x-2"
                      >
                        <Send size={18} />
                        <span>Send Feedback</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
    </section>
  );
};

export default Support;

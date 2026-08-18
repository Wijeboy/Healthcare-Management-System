// src/pages/Payments.jsx
import React, { useState } from 'react';
import Sidebar from '../../components/common/Sidebar';
import Header from '../../components/common/Header';
import { 
  CreditCard, 
  Calendar, 
  Receipt, 
  Download, 
  Eye, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  DollarSign,
  Shield,
  Lock,
  X,
  Filter,
  TrendingUp,
  XCircle,
  Plus
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

const mockPayments = [
  {
    id: '1',
    date: 'Aug 12, 2026',
    description: 'Cardiology Consultation - Dr. Nimal Fernando',
    amount: 2500,
    status: 'Paid',
    paymentMethod: 'Visa ****1234',
    receiptId: 'RCP-001',
    transactionId: 'TXN-001234',
    type: 'Medical'
  },
  {
    id: '2',
    date: 'Aug 10, 2026',
    description: 'Blood Test - Complete Blood Count',
    amount: 1200,
    status: 'Paid',
    paymentMethod: 'MasterCard ****5678',
    receiptId: 'RCP-002',
    transactionId: 'TXN-001233',
    type: 'Medical'
  },
  {
    id: '3',
    date: 'Aug 08, 2026',
    description: 'X-Ray Chest - Radiology Department',
    amount: 1800,
    status: 'Pending',
    dueDate: 'Aug 15, 2026',
    transactionId: 'TXN-001232',
    type: 'Medical'
  },
  {
    id: '4',
    date: 'Aug 05, 2026',
    description: 'General Checkup - Dr. Priya Silva',
    amount: 3000,
    status: 'Overdue',
    dueDate: 'Aug 10, 2026',
    transactionId: 'TXN-001231',
    type: 'Medical'
  },
  {
    id: '5',
    date: 'Aug 01, 2026',
    description: 'Insurance Claim - General Checkup',
    amount: 500,
    status: 'Paid',
    paymentMethod: 'Insurance Claim',
    receiptId: 'RCP-003',
    transactionId: 'TXN-001230',
    type: 'Insurance'
  }
];

const mockPaymentMethods = [
  {
    id: '1',
    type: 'card',
    name: 'Visa Credit Card',
    details: '**** **** **** 1234',
    isDefault: true
  },
  {
    id: '2',
    type: 'card',
    name: 'MasterCard',
    details: '**** **** **** 5678',
    isDefault: false
  },
  {
    id: '3',
    type: 'bank',
    name: 'Bank Transfer',
    details: 'Commercial Bank - ****4321',
    isDefault: false
  }
];

// Payment Form Component
const SecurePaymentForm = ({ isOpen, onClose, payment, onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    holderName: '',
    expiryDate: '',
    cvv: '',
    promoCode: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const subtotal = payment.amount;
  const tax = 0;
  const discount = formData.promoCode === 'HEALTH10' ? payment.amount * 0.1 : 0;
  const total = subtotal + tax - discount;

  const handlePayment = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    onPaymentSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Secure Payment</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            {/* Security Badge */}
            <div className="flex items-center space-x-2 mb-6 p-3 bg-green-50 border border-green-200 rounded-lg">
              <Shield className="text-green-600" size={20} />
              <span className="text-sm font-medium text-green-800">SSL Secured</span>
              <Lock className="text-green-600" size={16} />
              <span className="text-sm text-green-700">256-bit Encryption</span>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Method</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 border-2 rounded-lg flex items-center justify-center space-x-2 transition-colors ${
                    paymentMethod === 'card'
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-gray-300 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  <CreditCard size={20} />
                  <span className="font-medium">Credit Card</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('insurance')}
                  className={`p-4 border-2 rounded-lg flex items-center justify-center space-x-2 transition-colors ${
                    paymentMethod === 'insurance'
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-gray-300 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  <Shield size={20} />
                  <span className="font-medium">Insurance</span>
                </button>
              </div>
            </div>

            {/* Credit Card Form */}
            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, cardNumber: e.target.value }))}
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                  <input
                    type="text"
                    value={formData.holderName}
                    onChange={(e) => setFormData(prev => ({ ...prev, holderName: e.target.value }))}
                    placeholder="Imasha Perera"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                    <input
                      type="text"
                      value={formData.expiryDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                    <input
                      type="text"
                      value={formData.cvv}
                      onChange={(e) => setFormData(prev => ({ ...prev, cvv: e.target.value }))}
                      placeholder="123"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Insurance Form */}
            {paymentMethod === 'insurance' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Provider</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Select Insurance Provider</option>
                    <option>Ceylinco Insurance</option>
                    <option>AIA Insurance</option>
                    <option>SLII</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Policy Number</label>
                  <input
                    type="text"
                    placeholder="Enter your policy number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Billing Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Billing Summary</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Consultation Fee</span>
                  <span className="font-medium">Rs.{payment.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">Rs.{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">Rs.{tax.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span className="font-medium">-Rs.{discount.toLocaleString()}</span>
                  </div>
                )}
                <hr className="border-gray-300" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>Rs.{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Promo Code</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={formData.promoCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, promoCode: e.target.value }))}
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300">
                    Apply
                  </button>
                </div>
                {formData.promoCode === 'HEALTH10' && (
                  <p className="text-green-600 text-xs mt-1">✓ 10% discount applied!</p>
                )}
              </div>

              {/* Payment Button */}
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Lock size={16} />
                    <span>Pay Rs.{total.toLocaleString()} Now</span>
                  </>
                )}
              </button>

              <div className="mt-4 text-xs text-gray-500 text-center">
                <p>Your payment information is encrypted and secure</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Payments = () => {
  const [payments, setPayments] = useState(mockPayments);
  const [paymentMethods] = useState(mockPaymentMethods);
  const [filterStatus, setFilterStatus] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('bills');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'text-green-700 bg-green-50 border-green-200';
      case 'Pending': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'Overdue': return 'text-red-700 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Paid': return <CheckCircle size={16} className="text-green-600" />;
      case 'Pending': return <Clock size={16} className="text-yellow-600" />;
      case 'Overdue': return <AlertCircle size={16} className="text-red-600" />;
      default: return <Clock size={16} className="text-gray-600" />;
    }
  };

  const handlePayNow = (payment) => {
    setSelectedPayment(payment);
    setShowPaymentForm(true);
  };

  const handlePaymentSuccess = () => {
    if (selectedPayment) {
      setPayments(prev => prev.map(p => 
        p.id === selectedPayment.id 
          ? { ...p, status: 'Paid', paymentMethod: 'Visa ****1234', receiptId: `RCP-${Date.now()}` }
          : p
      ));
    }
  };

  const filteredPayments = payments.filter(payment => {
    const statusMatch = filterStatus === 'all' || payment.status.toLowerCase() === filterStatus.toLowerCase();
    const typeMatch = typeFilter === 'all' || payment.type?.toLowerCase() === typeFilter.toLowerCase();
    return statusMatch && typeMatch;
  });

  const totalPending = payments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.amount, 0);
  const totalOverdue = payments.filter(p => p.status === 'Overdue').reduce((sum, p) => sum + p.amount, 0);
  const totalPaid = payments.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0);

  // Transaction History Data
  const totalSpentYTD = payments.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0);
  const lastTransaction = payments.filter(p => p.status === 'Paid').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

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
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Payments & Billing</h1>
                <p className="text-gray-600">Manage your medical bills and payment methods</p>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="text-green-600" size={24} />
                </div>
                <span className="text-2xl font-bold text-green-600">Rs.{totalPaid.toLocaleString()}</span>
              </div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Total Paid</h3>
              <p className="text-xs text-gray-400">This month</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Clock className="text-yellow-600" size={24} />
                </div>
                <span className="text-2xl font-bold text-yellow-600">Rs.{totalPending.toLocaleString()}</span>
              </div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Pending</h3>
              <p className="text-xs text-gray-400">Due soon</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-red-100 rounded-lg">
                  <AlertCircle className="text-red-600" size={24} />
                </div>
                <span className="text-2xl font-bold text-red-600">Rs.{totalOverdue.toLocaleString()}</span>
              </div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Overdue</h3>
              <p className="text-xs text-gray-400">Immediate attention</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <DollarSign className="text-blue-600" size={24} />
                </div>
                <span className="text-2xl font-bold text-blue-600">Rs.{(totalPending + totalOverdue).toLocaleString()}</span>
              </div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Total Outstanding</h3>
              <p className="text-xs text-gray-400">All unpaid bills</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-xl shadow-md mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { key: 'bills', label: 'Bills & Invoices', icon: Receipt },
                  { key: 'history', label: 'Payment History', icon: Calendar },
                  { key: 'methods', label: 'Payment Methods', icon: CreditCard }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm ${
                      activeTab === tab.key
                        ? 'border-blue-500 text-blue-600'
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
              {/* Bills & Invoices Tab */}
              {activeTab === 'bills' && (
                <div>
                  {/* Filter */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <label className="text-sm font-medium text-gray-700">Filter by status:</label>
                      <select 
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="all">All Bills</option>
                        <option value="pending">Pending</option>
                        <option value="overdue">Overdue</option>
                        <option value="paid">Paid</option>
                      </select>
                    </div>
                    {(totalPending > 0 || totalOverdue > 0) && (
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                        Pay All Outstanding
                      </button>
                    )}
                  </div>

                  {/* Bills List */}
                  <div className="space-y-4">
                    {filteredPayments.map((payment) => (
                      <div key={payment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <div className="p-2 bg-blue-50 rounded-lg">
                                <Receipt className="text-blue-600" size={20} />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-800">{payment.description}</h3>
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                  <span>Bill Date: {payment.date}</span>
                                  {payment.dueDate && (
                                    <span>Due: {payment.dueDate}</span>
                                  )}
                                  {payment.receiptId && (
                                    <span>Receipt: {payment.receiptId}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                            <div className="text-right">
                              <div className="text-2xl font-bold text-gray-800">
                                Rs.{payment.amount.toLocaleString()}
                              </div>
                              {payment.paymentMethod && (
                                <div className="text-sm text-gray-500">{payment.paymentMethod}</div>
                              )}
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(payment.status)}
                              <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(payment.status)}`}>
                                {payment.status}
                              </span>
                            </div>

                            <div className="flex space-x-2">
                              {payment.status === 'Paid' ? (
                                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
                                  <Download size={16} />
                                  <span>Receipt</span>
                                </button>
                              ) : (
                                <button 
                                  onClick={() => handlePayNow(payment)}
                                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                                >
                                  <CreditCard size={16} />
                                  <span>Pay Now</span>
                                </button>
                              )}
                              <button className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                                <Eye size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Enhanced Payment History Tab */}
              {activeTab === 'history' && (
                <div>
                  {/* Summary Cards for History */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white border rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <TrendingUp className="text-blue-600" size={24} />
                        </div>
                        <span className="text-2xl font-bold text-gray-800">Rs.{totalSpentYTD.toLocaleString()}</span>
                      </div>
                      <h3 className="text-sm font-medium text-gray-500">Total Spent (YTD)</h3>
                    </div>

                    <div className="bg-white border rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-yellow-100 rounded-lg">
                          <Clock className="text-yellow-600" size={24} />
                        </div>
                        <span className="text-2xl font-bold text-gray-800">Rs.{totalPending.toLocaleString()}</span>
                      </div>
                      <h3 className="text-sm font-medium text-gray-500">Pending Payments</h3>
                    </div>

                    <div className="bg-white border rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-green-100 rounded-lg">
                          <CheckCircle className="text-green-600" size={24} />
                        </div>
                        <span className="text-2xl font-bold text-gray-800">
                          Rs.{lastTransaction ? lastTransaction.amount.toLocaleString() : '0'}
                        </span>
                      </div>
                      <h3 className="text-sm font-medium text-gray-500">Last Transaction</h3>
                    </div>
                  </div>

                  {/* Filters and Actions */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 lg:mb-0">Billing History</h2>
                    <div className="flex items-center space-x-4">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2">
                        <Plus size={16} />
                        <span>New Payment</span>
                      </button>
                      <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
                        <Download size={16} />
                        <span>Download Statements</span>
                      </button>
                    </div>
                  </div>

                  {/* Filter Controls */}
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <Filter size={16} className="text-gray-500" />
                      <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="all">All</option>
                        <option value="medical">Medical</option>
                        <option value="insurance">Insurance</option>
                      </select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Status:</span>
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="all">All</option>
                        <option value="paid">Success</option>
                        <option value="pending">Pending</option>
                        <option value="overdue">Overdue</option>
                      </select>
                    </div>
                  </div>

                  {/* Transactions Table */}
                  <div className="overflow-x-auto bg-white border rounded-lg">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Transaction ID</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Description</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-700">Amount</th>
                          <th className="text-center py-3 px-4 font-semibold text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPayments.map((payment) => (
                          <tr key={payment.id} className="border-t border-gray-200 hover:bg-gray-50">
                            <td className="py-3 px-4 text-sm text-gray-600">{payment.date}</td>
                            <td className="py-3 px-4 text-sm font-medium text-gray-800">{payment.transactionId || `TXN-${payment.id}`}</td>
                            <td className="py-3 px-4">
                              <div>
                                <div className="text-sm font-medium text-gray-800">{payment.description}</div>
                                <div className="text-xs text-gray-500">
                                  {payment.type} • {payment.paymentMethod || 'Pending'}
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-2">
                                {getStatusIcon(payment.status)}
                                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(payment.status)}`}>
                                  {payment.status === 'Paid' ? 'Success' : payment.status}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-right text-sm font-semibold text-gray-800">
                              Rs.{payment.amount.toLocaleString()}
                            </td>
                            <td className="py-3 px-4 text-center">
                              {payment.status === 'Paid' && (
                                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                  Download
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Security Notice */}
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="p-1 bg-blue-100 rounded">
                        <Shield className="text-blue-600" size={16} />
                      </div>
                      <h4 className="font-medium text-blue-800">Encrypted Transactions</h4>
                    </div>
                    <p className="text-sm text-blue-700 mt-1">
                      All medical payments are secured with 256-bit SSL encryption and comply with healthcare data protection standards.
                    </p>
                  </div>
                </div>
              )}

              {/* Payment Methods Tab */}
              {activeTab === 'methods' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">Saved Payment Methods</h3>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Add New Method
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-50 rounded-lg">
                              <CreditCard className="text-blue-600" size={20} />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-800">{method.name}</h4>
                              <p className="text-sm text-gray-600">{method.details}</p>
                              {method.isDefault && (
                                <span className="inline-flex px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full mt-1">
                                  Default
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                              Edit
                            </button>
                            <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Payment Form Modal */}
      {showPaymentForm && selectedPayment && (
        <SecurePaymentForm
          isOpen={showPaymentForm}
          onClose={() => setShowPaymentForm(false)}
          payment={selectedPayment}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default Payments;
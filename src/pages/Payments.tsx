// src/pages/Payments.tsx
import React, { useState } from 'react';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import { CreditCard, Calendar, Receipt, Download, Eye, AlertCircle, CheckCircle, Clock, DollarSign } from 'lucide-react';
import { Patient } from '../types';

const mockPatient: Patient = {
  id: 'P001',
  name: 'Imasha Perera',
  email: 'imasha@example.com',
  phone: '+94 77 123 4567',
  dateOfBirth: '1995-06-15',
  gender: 'Female',
  address: 'Colombo, Sri Lanka',
};

interface Payment {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  dueDate?: string;
  paymentMethod?: string;
  receiptId?: string;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank';
  name: string;
  details: string;
  isDefault: boolean;
}

const mockPayments: Payment[] = [
  {
    id: '1',
    date: 'June 5, 2026',
    description: 'Cardiology Consultation - Dr. Nimal Fernando',
    amount: 2500,
    status: 'Paid',
    paymentMethod: 'Visa ****1234',
    receiptId: 'RCP-001'
  },
  {
    id: '2',
    date: 'May 28, 2026',
    description: 'Blood Test - Complete Blood Count',
    amount: 1200,
    status: 'Paid',
    paymentMethod: 'MasterCard ****5678',
    receiptId: 'RCP-002'
  },
  {
    id: '3',
    date: 'June 10, 2026',
    description: 'X-Ray Chest - Radiology Department',
    amount: 1800,
    status: 'Pending',
    dueDate: 'June 15, 2026'
  },
  {
    id: '4',
    date: 'May 15, 2026',
    description: 'General Checkup - Dr. Priya Silva',
    amount: 3000,
    status: 'Overdue',
    dueDate: 'May 30, 2026'
  }
];

const mockPaymentMethods: PaymentMethod[] = [
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

const Payments: React.FC = () => {
  const [payments] = useState<Payment[]>(mockPayments);
  const [paymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'bills' | 'history' | 'methods'>('bills');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'text-success bg-green-50 border-green-200';
      case 'Pending': return 'text-warning bg-yellow-50 border-yellow-200';
      case 'Overdue': return 'text-danger bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Paid': return <CheckCircle size={16} className="text-success" />;
      case 'Pending': return <Clock size={16} className="text-warning" />;
      case 'Overdue': return <AlertCircle size={16} className="text-danger" />;
      default: return <Clock size={16} className="text-gray-600" />;
    }
  };

  const filteredPayments = payments.filter(payment => {
    return filterStatus === 'all' || payment.status.toLowerCase() === filterStatus.toLowerCase();
  });

  const totalPending = payments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.amount, 0);
  const totalOverdue = payments.filter(p => p.status === 'Overdue').reduce((sum, p) => sum + p.amount, 0);
  const totalPaid = payments.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0);

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
                  <CheckCircle className="text-success" size={24} />
                </div>
                <span className="text-2xl font-bold text-success">Rs.{totalPaid.toLocaleString()}</span>
              </div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Total Paid</h3>
              <p className="text-xs text-gray-400">This month</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Clock className="text-warning" size={24} />
                </div>
                <span className="text-2xl font-bold text-warning">Rs.{totalPending.toLocaleString()}</span>
              </div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Pending</h3>
              <p className="text-xs text-gray-400">Due soon</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-red-100 rounded-lg">
                  <AlertCircle className="text-danger" size={24} />
                </div>
                <span className="text-2xl font-bold text-danger">Rs.{totalOverdue.toLocaleString()}</span>
              </div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Overdue</h3>
              <p className="text-xs text-gray-400">Immediate attention</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-primary-light rounded-lg">
                  <DollarSign className="text-primary" size={24} />
                </div>
                <span className="text-2xl font-bold text-primary">Rs.{(totalPending + totalOverdue).toLocaleString()}</span>
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
                    onClick={() => setActiveTab(tab.key as any)}
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
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="all">All Bills</option>
                        <option value="pending">Pending</option>
                        <option value="overdue">Overdue</option>
                        <option value="paid">Paid</option>
                      </select>
                    </div>
                    {(totalPending > 0 || totalOverdue > 0) && (
                      <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium">
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
                              <div className="p-2 bg-primary-light rounded-lg">
                                <Receipt className="text-primary" size={20} />
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
                                <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center space-x-2">
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

              {/* Payment History Tab */}
              {activeTab === 'history' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment History</h3>
                  <div className="space-y-4">
                    {payments.filter(p => p.status === 'Paid').map((payment) => (
                      <div key={payment.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                              <CheckCircle className="text-success" size={20} />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-800">{payment.description}</h4>
                              <p className="text-sm text-gray-600">Paid on {payment.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="font-semibold text-gray-800">Rs.{payment.amount.toLocaleString()}</div>
                              <div className="text-sm text-gray-500">{payment.paymentMethod}</div>
                            </div>
                            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
                              <Download size={16} />
                              <span>Receipt</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Payment Methods Tab */}
              {activeTab === 'methods' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">Saved Payment Methods</h3>
                    <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
                      Add New Method
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-primary-light rounded-lg">
                              <CreditCard className="text-primary" size={20} />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-800">{method.name}</h4>
                              <p className="text-sm text-gray-600">{method.details}</p>
                              {method.isDefault && (
                                <span className="inline-flex px-2 py-1 bg-primary-light text-primary text-xs font-medium rounded-full mt-1">
                                  Default
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-primary hover:text-primary-dark text-sm font-medium">
                              Edit
                            </button>
                            <button className="text-danger hover:text-red-700 text-sm font-medium">
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
    </div>
  );
};

export default Payments;
// src/pages/Payments.jsx
import React, { useMemo, useState } from 'react';
import Sidebar from '../../components/common/Sidebar';
import Header from '../../components/common/Header';
import {
  CreditCard,
  Shield,
  Lock,
  Filter,
  Plus,
  Download,
  TrendingUp,
  Clock,
  ChevronLeft,
  ChevronRight,
  ArrowRight
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

const billingHistory = [
  {
    id: '1',
    date: 'Oct 24, 2024',
    transactionId: '#TXN-88291',
    description: 'Consultation Fee',
    subtitle: 'General Health Assessment',
    status: 'Success',
    type: 'Medical',
    amount: 1000
  },
  {
    id: '2',
    date: 'Oct 22, 2024',
    transactionId: '#TXN-88285',
    description: 'Lab Charges',
    subtitle: 'Complete Blood Count (CBC)',
    status: 'Success',
    type: 'Medical',
    amount: 500
  },
  {
    id: '3',
    date: 'Oct 18, 2024',
    transactionId: '#TXN-88110',
    description: 'Medicine Purchase',
    subtitle: 'Prescription #PRX-4421',
    status: 'Pending',
    type: 'Medical',
    amount: 1500
  },
  {
    id: '4',
    date: 'Oct 15, 2024',
    transactionId: '#TXN-88092',
    description: 'Radiology',
    subtitle: 'Chest X-Ray',
    status: 'Cancelled',
    type: 'Medical',
    amount: 3000
  },
  {
    id: '5',
    date: 'Oct 10, 2024',
    transactionId: '#TXN-88801',
    description: 'Consultation Fee',
    subtitle: 'Cardiology Review',
    status: 'Success',
    type: 'Insurance',
    amount: 1200
  }
];

const getStatusStyle = (status) => {
  switch (status) {
    case 'Success': return 'bg-blue-50 text-blue-700';
    case 'Pending': return 'bg-red-50 text-red-600';
    case 'Cancelled': return 'bg-gray-100 text-gray-500';
    default: return 'bg-gray-100 text-gray-600';
  }
};

const pendingBill = {
  consultationFee: 100,
  labCharges: 50,
  description1: 'General Health Assessment',
  description2: 'Complete Blood Count (CBC)'
};

const Payments = () => {
  const [view, setView] = useState('transactions'); // 'transactions' | 'payment'
  const [typeFilter, setTypeFilter] = useState('All');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [promoCode, setPromoCode] = useState('');
  const [cardForm, setCardForm] = useState({
    cardNumber: '',
    holderName: '',
    expiryDate: '',
    cvv: ''
  });

  const subtotal = pendingBill.consultationFee + pendingBill.labCharges;
  const discount = promoCode.trim().toUpperCase() === 'HEALTH10' ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  const totalSpentYTD = billingHistory
    .filter((p) => p.status === 'Success')
    .reduce((sum, p) => sum + p.amount, 0);
  const pendingTotal = billingHistory
    .filter((p) => p.status === 'Pending')
    .reduce((sum, p) => sum + p.amount, 0);
  const lastTransaction = billingHistory.find((p) => p.status === 'Success');

  const filteredHistory = useMemo(() => {
    if (typeFilter === 'All') return billingHistory;
    return billingHistory.filter((p) => p.type === typeFilter);
  }, [typeFilter]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar patientData={mockPatient} />
      <Header />

      <main className="ml-64 pt-20 p-6">
        <div className="max-w-6xl mx-auto">
          {view === 'transactions' ? (
            <>
              {/* Page Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Recent Transactions</h1>
                  <p className="text-gray-500 text-sm mt-1">Keep track of your medical billing and insurance claims.</p>
                </div>
                <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                  <button className="flex items-center space-x-2 border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold">
                    <Filter size={16} />
                    <span>Filters</span>
                  </button>
                  <button
                    onClick={() => setView('payment')}
                    className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors text-sm font-semibold"
                  >
                    <Plus size={16} />
                    <span>New Payment</span>
                  </button>
                </div>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
                      <TrendingUp size={18} className="text-primary" />
                    </div>
                    <span className="text-xs font-semibold text-green-600">+2.4%</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-1">Total Spent (YTD)</p>
                  <p className="text-xl font-bold text-gray-900">Rs.{totalSpentYTD.toLocaleString()}.00</p>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center mb-3">
                    <CreditCard size={18} className="text-red-500" />
                  </div>
                  <p className="text-xs text-gray-400 mb-1">Pending Payments</p>
                  <p className="text-xl font-bold text-gray-900">Rs.{pendingTotal.toLocaleString()}.00</p>
                  <p className="text-xs text-red-500 font-medium mt-1">1 action required</p>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                    <Clock size={18} className="text-gray-500" />
                  </div>
                  <p className="text-xs text-gray-400 mb-1">Last Transaction</p>
                  <p className="text-xl font-bold text-gray-900">Rs.{lastTransaction?.amount.toLocaleString() || 0}.00</p>
                  <p className="text-xs text-gray-400 mt-1">{lastTransaction?.description} ({lastTransaction?.date.split(',')[0]})</p>
                </div>
              </div>

              {/* Billing History */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-6">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                  <h3 className="font-bold text-gray-900">Billing History</h3>
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    {['All', 'Medical', 'Insurance'].map((option) => (
                      <button
                        key={option}
                        onClick={() => setTypeFilter(option)}
                        className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                          typeFilter === option ? 'bg-primary text-white' : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">Transaction ID</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wide">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredHistory.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-sm text-gray-600">{item.date}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{item.transactionId}</td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-semibold text-gray-900">{item.description}</div>
                            <div className="text-xs text-gray-400">{item.subtitle}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(item.status)}`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                            Rs.{item.amount.toLocaleString()}.00
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400">Showing 1-5 of 48 transactions</p>
                  <div className="flex items-center space-x-2">
                    <button className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors">
                      <ChevronLeft size={14} />
                    </button>
                    <button className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors">
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield size={18} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Encrypted Transactions</h4>
                    <p className="text-xs text-gray-500 mt-1">
                      All medical payments are secured with 256-bit SSL encryption and HIPAA compliance standards.
                    </p>
                  </div>
                </div>

                <div className="bg-primary-dark rounded-2xl p-5 flex items-center justify-between text-white">
                  <div>
                    <h4 className="font-semibold text-sm">Download Statements</h4>
                    <p className="text-xs text-blue-100 mt-1">Get your tax-ready annual medical expense report.</p>
                    <button className="mt-3 flex items-center space-x-1.5 bg-white text-primary-dark text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
                      <Download size={13} />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Page Header */}
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Secure Payment</h1>
                <button
                  onClick={() => setView('transactions')}
                  className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                >
                  Recent Transactions
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Payment Form */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <div className="flex">
                      <button
                        onClick={() => setPaymentMethod('card')}
                        className={`flex-1 flex items-center justify-center space-x-2 py-3.5 text-sm font-semibold transition-colors ${
                          paymentMethod === 'card' ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        <CreditCard size={16} />
                        <span>CREDIT CARD</span>
                      </button>
                      <button
                        onClick={() => setPaymentMethod('insurance')}
                        className={`flex-1 flex items-center justify-center space-x-2 py-3.5 text-sm font-semibold transition-colors ${
                          paymentMethod === 'insurance' ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        <Shield size={16} />
                        <span>INSURANCE</span>
                      </button>
                    </div>

                    <div className="p-6">
                      {paymentMethod === 'card' ? (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-500 mb-2">Card Number</label>
                            <input
                              type="text"
                              value={cardForm.cardNumber}
                              onChange={(e) => setCardForm({ ...cardForm, cardNumber: e.target.value })}
                              placeholder="12345 7890 45678 3425"
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-500 mb-2">Cardholder Name</label>
                            <input
                              type="text"
                              value={cardForm.holderName}
                              onChange={(e) => setCardForm({ ...cardForm, holderName: e.target.value })}
                              placeholder="John D. Smith"
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-500 mb-2">Expiry Date</label>
                              <input
                                type="text"
                                value={cardForm.expiryDate}
                                onChange={(e) => setCardForm({ ...cardForm, expiryDate: e.target.value })}
                                placeholder="07/26"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-500 mb-2">CVV</label>
                              <input
                                type="password"
                                value={cardForm.cvv}
                                onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value })}
                                placeholder="•••"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary focus:border-transparent"
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2 text-xs text-gray-400">
                            <span className="flex items-center">
                              <Shield size={13} className="text-green-600 mr-1.5" />
                              SSL SECURED
                            </span>
                            <span className="flex items-center">
                              <Lock size={13} className="mr-1.5" />
                              256-bit Encryption
                            </span>
                          </div>

                          <button className="w-full bg-primary text-white py-3.5 rounded-lg font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center space-x-2">
                            <span>Pay Rs{total.toFixed(2)} Now</span>
                            <ArrowRight size={16} />
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-500 mb-2">Insurance Provider</label>
                            <select className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary focus:border-transparent">
                              <option>Select Insurance Provider</option>
                              <option>Ceylinco Insurance</option>
                              <option>AIA Insurance</option>
                              <option>SLII</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-500 mb-2">Policy Number</label>
                            <input
                              type="text"
                              placeholder="Enter your policy number"
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                          </div>
                          <button className="w-full bg-primary text-white py-3.5 rounded-lg font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center space-x-2">
                            <span>Submit Claim</span>
                            <ArrowRight size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="bg-gray-100 text-xs text-gray-500 rounded-xl p-4 mt-4 leading-relaxed">
                    By clicking "Pay Now," you agree to our <span className="text-primary font-medium">Terms of Service</span> and{' '}
                    <span className="text-primary font-medium">Payment Policy</span>. Your payment data is handled securely and never stored on our servers.
                  </p>
                </div>

                {/* Billing Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Billing Summary</h3>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-gray-700">Consultation Fee</p>
                          <p className="text-xs text-gray-400">{pendingBill.description1}</p>
                        </div>
                        <span className="font-semibold text-gray-900">Rs.{pendingBill.consultationFee}.00</span>
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <p className="text-gray-700">Lab Charges</p>
                          <p className="text-xs text-gray-400">{pendingBill.description2}</p>
                        </div>
                        <span className="font-semibold text-gray-900">Rs.{pendingBill.labCharges}.00</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 mt-4 pt-4 space-y-2 text-sm">
                      <div className="flex justify-between text-gray-500">
                        <span>Subtotal</span>
                        <span>Rs.{subtotal}.00</span>
                      </div>
                      <div className="flex justify-between text-gray-500">
                        <span>Tax (0%)</span>
                        <span>Rs.0.00</span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-Rs.{discount.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-center">
                      <span className="font-semibold text-gray-900">Total</span>
                      <span className="text-xl font-bold text-primary">Rs.{total.toFixed(2)}</span>
                    </div>

                    <div className="mt-5">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Promo code"
                          className="flex-1 px-3 py-2.5 text-sm focus:outline-none"
                        />
                        <button className="px-4 py-2.5 text-xs font-bold text-primary hover:bg-primary-light transition-colors">
                          APPLY
                        </button>
                      </div>
                    </div>

                    <div className="relative rounded-xl overflow-hidden mt-5 h-28">
                      <img
                        src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop"
                        alt="Secure card payment"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-blue-900/40"></div>
                      <p className="absolute bottom-3 left-3 text-white text-xs font-semibold">
                        Secure Transaction Guaranteed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

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

export default Payments;
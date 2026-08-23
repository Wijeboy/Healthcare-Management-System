// src/pages/PatientPages/Payments.jsx
import React, { useState } from 'react';
import { 
  CreditCard, 
  ShieldCheck, 
  Download, 
  Plus, 
  Filter, 
  ChevronRight, 
  ChevronLeft, 
  Eye, 
  EyeOff, 
  Lock, 
  Tag, 
  CheckCircle2, 
  FileText, 
  ArrowRight,
  TrendingUp,
  Receipt
} from 'lucide-react';

const mockTransactions = [
  {
    id: '#TXN-88291',
    date: 'Oct 24, 2024',
    description: 'Consultation Fee',
    subtext: 'General Health Assessment',
    category: 'Medical',
    status: 'Success',
    amount: 'Rs.1000.00'
  },
  {
    id: '#TXN-88285',
    date: 'Oct 22, 2024',
    description: 'Lab Charges',
    subtext: 'Complete Blood Count (CBC)',
    category: 'Medical',
    status: 'Success',
    amount: 'Rs.500.00'
  },
  {
    id: '#TXN-88110',
    date: 'Oct 18, 2024',
    description: 'Medicine Purchase',
    subtext: 'Prescription #PRX-4421',
    category: 'Medical',
    status: 'Pending',
    amount: 'Rs.1500.00'
  },
  {
    id: '#TXN-88092',
    date: 'Oct 15, 2024',
    description: 'Radiology',
    subtext: 'Chest X-Ray',
    category: 'Insurance',
    status: 'Cancelled',
    amount: 'Rs.3000.00'
  },
  {
    id: '#TXN-88801',
    date: 'Oct 10, 2024',
    description: 'Consultation Fee',
    subtext: 'Cardiology Review',
    category: 'Medical',
    status: 'Success',
    amount: 'Rs.1200.00'
  }
];

export default function Payments() {
  const [viewMode, setViewMode] = useState('history'); // 'history' or 'checkout'
  const [historyTab, setHistoryTab] = useState('all'); // 'all', 'medical', 'insurance'
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showCvv, setShowCvv] = useState(false);

  // Form State
  const [cardNumber, setCardNumber] = useState('12345 7890 45678 3425');
  const [cardHolder, setCardHolder] = useState('John D. Smith');
  const [expiry, setExpiry] = useState('07/26');
  const [cvv, setCvv] = useState('***');
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  const handlePayNow = (e) => {
    e.preventDefault();
    setPaymentSuccess(true);
    setTimeout(() => {
      setPaymentSuccess(false);
      setViewMode('history');
    }, 2500);
  };

  const filteredTransactions = mockTransactions.filter((t) => {
    if (historyTab === 'medical') return t.category === 'Medical';
    if (historyTab === 'insurance') return t.category === 'Insurance';
    return true;
  });

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#003f87] tracking-tight">
          Payments
        </h1>
        {viewMode === 'checkout' && (
          <button
            onClick={() => setViewMode('history')}
            className="text-xs font-bold text-[#1d70f5] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Recent Transactions</span>
            <ChevronRight size={14} />
          </button>
        )}
      </div>

      {paymentSuccess ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center max-w-md mx-auto shadow-xs animate-fade-in">
          <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">Payment Successful!</h2>
          <p className="text-xs text-gray-500 mb-6">
            Transaction receipt sent to your email. Total Paid: <span className="font-bold text-gray-900">Rs.150.00</span>
          </p>
          <button
            onClick={() => {
              setPaymentSuccess(false);
              setViewMode('history');
            }}
            className="w-full bg-[#1d70f5] text-white py-2.5 rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-xs"
          >
            Back to Billing History
          </button>
        </div>
      ) : viewMode === 'history' ? (
        /* RECENT TRANSACTIONS / BILLING HISTORY VIEW */
        <div className="space-y-6">
          {/* Section Subheader & Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
              <p className="text-xs text-gray-500 mt-0.5">Keep track of your medical billing and insurance claims.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 border border-gray-300 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 transition-all">
                <Filter size={14} />
                <span>Filters</span>
              </button>
              <button
                onClick={() => setViewMode('checkout')}
                className="px-4 py-2 bg-[#1d70f5] hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
              >
                <Plus size={16} />
                <span>New Payment</span>
              </button>
            </div>
          </div>

          {/* 3 Overview Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1: Total Spent */}
            <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1d70f5] flex items-center justify-center">
                    <Receipt size={18} />
                  </div>
                  <span className="text-[10px] font-bold text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-md">
                    +2.4%
                  </span>
                </div>
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total Spent (YTD)</div>
                <div className="text-xl font-extrabold text-gray-900 tracking-tight mt-1">Rs.12,450.00</div>
              </div>
            </div>

            {/* Card 2: Pending Payments */}
            <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-3">
                  <CreditCard size={18} />
                </div>
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Pending Payments</div>
                <div className="text-xl font-extrabold text-gray-900 tracking-tight mt-1">Rs.1,500.00</div>
                <div className="text-[11px] font-bold text-red-600 mt-1">1 action required</div>
              </div>
            </div>

            {/* Card 3: Last Transaction */}
            <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center mb-3">
                  <TrendingUp size={18} />
                </div>
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Last Transaction</div>
                <div className="text-xl font-extrabold text-gray-900 tracking-tight mt-1">Rs.500.00</div>
                <div className="text-[11px] font-medium text-gray-500 mt-1">Blood Test (Oct 24)</div>
              </div>
            </div>
          </div>

          {/* Billing History Section */}
          <div className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-xs">
            {/* Header & Tabs */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100 bg-gray-50/40">
              <h3 className="text-base font-bold text-gray-900">Billing History</h3>
              <div className="flex items-center gap-1 bg-gray-200/60 p-1 rounded-xl">
                <button
                  onClick={() => setHistoryTab('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    historyTab === 'all' ? 'bg-[#1d70f5] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setHistoryTab('medical')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    historyTab === 'medical' ? 'bg-[#1d70f5] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Medical
                </button>
                <button
                  onClick={() => setHistoryTab('insurance')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    historyTab === 'insurance' ? 'bg-[#1d70f5] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Insurance
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/60 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    <th className="py-3 px-6">Date</th>
                    <th className="py-3 px-6">Transaction ID</th>
                    <th className="py-3 px-6">Description</th>
                    <th className="py-3 px-6">Status</th>
                    <th className="py-3 px-6 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs font-medium">
                  {filteredTransactions.map((t) => (
                    <tr key={t.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="py-4 px-6 text-gray-800 font-semibold">{t.date}</td>
                      <td className="py-4 px-6 font-mono text-gray-400 text-[11px]">{t.id}</td>
                      <td className="py-4 px-6">
                        <div className="font-bold text-gray-900">{t.description}</div>
                        <div className="text-[11px] text-gray-400 font-normal">{t.subtext}</div>
                      </td>
                      <td className="py-4 px-6">
                        {t.status === 'Success' && (
                          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                            Success
                          </span>
                        )}
                        {t.status === 'Pending' && (
                          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-pink-50 text-pink-700 border border-pink-200">
                            Pending
                          </span>
                        )}
                        {t.status === 'Cancelled' && (
                          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-gray-100 text-gray-600 border border-gray-200">
                            Cancelled
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right font-extrabold text-gray-900">{t.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/40 flex items-center justify-between text-xs text-gray-500">
              <span>Showing 1-5 of 48 transactions</span>
              <div className="flex items-center gap-1">
                <button className="p-1 rounded border border-gray-200 hover:bg-white text-gray-600">
                  <ChevronLeft size={14} />
                </button>
                <button className="p-1 rounded border border-gray-200 hover:bg-white text-gray-600">
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Security & Statement Cards */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Left Card: Encrypted Transactions */}
            <div className="md:col-span-6 bg-gray-50 border border-gray-200/80 rounded-2xl p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-white text-[#1d70f5] border border-blue-100 flex items-center justify-center shrink-0 shadow-xs">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 mb-1">Encrypted Transactions</h4>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  All medical payments are secured with 256-bit SSL encryption and HIPAA compliance standards.
                </p>
              </div>
            </div>

            {/* Right Card: Download Statements Banner */}
            <div className="md:col-span-6 bg-[#0052cc] text-white rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden shadow-xs">
              <div>
                <h4 className="text-sm font-bold mb-1">Download Statements</h4>
                <p className="text-[11px] text-blue-100 mb-4 max-w-[240px]">
                  Get your tax-ready annual medical expense report.
                </p>
              </div>
              <button className="w-fit bg-white text-[#0052cc] hover:bg-blue-50 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer">
                <Download size={14} />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* SECURE PAYMENT CHECKOUT VIEW */
        <div className="space-y-6 animate-fade-in">
          <div>
            <h2 className="text-2xl font-bold text-[#003f87]">Secure Payment</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Form (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs">
                {/* Method Tabs */}
                <div className="grid grid-cols-2 gap-2 mb-6 bg-gray-100 p-1 rounded-xl">
                  <button className="py-2.5 text-xs font-bold bg-[#1d70f5] text-white rounded-lg flex items-center justify-center gap-2 shadow-xs">
                    <CreditCard size={14} />
                    <span>CREDIT CARD</span>
                  </button>
                  <button className="py-2.5 text-xs font-bold text-gray-600 hover:text-gray-900 rounded-lg flex items-center justify-center gap-2">
                    <span>INSURANCE</span>
                  </button>
                </div>

                {/* Card Form */}
                <form onSubmit={handlePayNow} className="space-y-4">
                  {/* Card Number */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full pl-3.5 pr-20 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1d70f5]/20 focus:border-[#1d70f5]"
                        required
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] font-bold text-gray-400">
                        <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">VISA</span>
                        <span className="bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded">MC</span>
                      </div>
                    </div>
                  </div>

                  {/* Cardholder Name */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1d70f5]/20 focus:border-[#1d70f5]"
                      required
                    />
                  </div>

                  {/* Expiry & CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full px-3.5 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1d70f5]/20 focus:border-[#1d70f5]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">CVV</label>
                      <div className="relative">
                        <input
                          type={showCvv ? "text" : "password"}
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          className="w-full pl-3.5 pr-10 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1d70f5]/20 focus:border-[#1d70f5]"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowCvv(!showCvv)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showCvv ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Security Icons */}
                  <div className="flex items-center justify-between text-[11px] text-gray-500 font-medium py-1">
                    <span className="flex items-center gap-1 text-green-700 font-bold">
                      <ShieldCheck size={14} /> SSL SECURED
                    </span>
                    <span className="flex items-center gap-1 text-gray-500">
                      <Lock size={12} /> 256-bit Encryption
                    </span>
                  </div>

                  {/* Pay Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#1d70f5] hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                  >
                    <span>Pay Rs150.00 Now</span>
                    <ArrowRight size={18} />
                  </button>
                </form>
              </div>

              {/* Policy Callout */}
              <div className="bg-gray-100/80 border border-gray-200 rounded-xl p-4 flex items-start gap-3 text-xs text-gray-600">
                <span className="material-symbols-outlined text-gray-500 shrink-0 text-lg">info</span>
                <p className="leading-relaxed">
                  By clicking "Pay Now", you agree to our <a href="#" className="text-blue-600 underline">Terms of Service</a> and <a href="#" className="text-blue-600 underline">Payment Policy</a>. Your payment data is handled securely and never stored on our servers.
                </p>
              </div>
            </div>

            {/* Right Column: Billing Summary (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs space-y-4">
                <h3 className="text-base font-bold text-[#003f87] flex items-center gap-2">
                  <Receipt size={18} />
                  <span>Billing Summary</span>
                </h3>

                <div className="space-y-3 pt-2 text-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-gray-900">Consultation Fee</div>
                      <div className="text-[11px] text-gray-400">General Health Assessment</div>
                    </div>
                    <span className="font-extrabold text-gray-900">Rs.100.00</span>
                  </div>

                  <div className="flex justify-between items-start pt-2 border-t border-gray-100">
                    <div>
                      <div className="font-bold text-gray-900">Lab Charges</div>
                      <div className="text-[11px] text-gray-400">Complete Blood Count (CBC)</div>
                    </div>
                    <span className="font-extrabold text-gray-900">Rs.50.00</span>
                  </div>
                </div>

                {/* Subtotal Calculation Box */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-2 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-900">Rs.150.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (0%)</span>
                    <span className="font-semibold text-gray-900">Rs.0.00</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-semibold">-Rs.0.00</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200 flex justify-between items-baseline">
                    <span className="text-base font-extrabold text-[#003f87]">Total</span>
                    <span className="text-2xl font-extrabold text-[#003f87]">Rs.150.00</span>
                  </div>
                </div>

                {/* Promo Code Box */}
                <div className="border border-dashed border-gray-300 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1">
                    <Tag size={16} className="text-gray-400" />
                    <input
                      type="text"
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full text-xs font-semibold focus:outline-none bg-transparent"
                    />
                  </div>
                  <button 
                    type="button"
                    onClick={() => setDiscountApplied(true)}
                    className="text-xs font-bold text-[#1d70f5] hover:underline"
                  >
                    APPLY
                  </button>
                </div>
              </div>

              {/* Card Guarantee Graphic Card */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-xs flex flex-col justify-end min-h-[140px] relative overflow-hidden">
                <div className="absolute top-4 right-4 opacity-20 text-white">
                  <CreditCard size={80} />
                </div>
                <div className="relative z-10">
                  <p className="text-xs font-bold tracking-wider uppercase text-blue-100">
                    Secure Transaction Guaranteed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

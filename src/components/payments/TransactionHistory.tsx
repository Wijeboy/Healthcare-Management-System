// src/components/payments/TransactionHistory.tsx
import React, { useState } from 'react';
import { Download, Filter, Calendar, TrendingUp, CheckCircle, Clock, XCircle } from 'lucide-react';

interface Transaction {
  id: string;
  date: string;
  transactionId: string;
  description: string;
  status: 'Success' | 'Pending' | 'Cancelled';
  amount: number;
  type: 'Medical' | 'Insurance';
  paymentMethod?: string;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: 'Aug 12, 2026',
    transactionId: 'TXN-001234',
    description: 'Cardiology Consultation - Dr. Nimal Fernando',
    status: 'Success',
    amount: 2500,
    type: 'Medical',
    paymentMethod: 'Visa ****1234'
  },
  {
    id: '2',
    date: 'Aug 10, 2026',
    transactionId: 'TXN-001233',
    description: 'Blood Test - Complete Blood Count',
    status: 'Success',
    amount: 1200,
    type: 'Medical',
    paymentMethod: 'MasterCard ****5678'
  },
  {
    id: '3',
    date: 'Aug 08, 2026',
    transactionId: 'TXN-001232',
    description: 'Insurance Claim - General Checkup',
    status: 'Pending',
    amount: 3000,
    type: 'Insurance'
  },
  {
    id: '4',
    date: 'Aug 05, 2026',
    transactionId: 'TXN-001231',
    description: 'X-Ray Chest - Radiology Department',
    status: 'Cancelled',
    amount: 1800,
    type: 'Medical'
  },
  {
    id: '5',
    date: 'Aug 01, 2026',
    transactionId: 'TXN-001230',
    description: 'General Checkup - Dr. Priya Silva',
    status: 'Success',
    amount: 500,
    type: 'Medical',
    paymentMethod: 'Visa ****1234'
  }
];

const TransactionHistory: React.FC = () => {
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [filter, setFilter] = useState<'All' | 'Medical' | 'Insurance'>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Success' | 'Pending' | 'Cancelled'>('All');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Success': return <CheckCircle size={16} className="text-green-600" />;
      case 'Pending': return <Clock size={16} className="text-yellow-600" />;
      case 'Cancelled': return <XCircle size={16} className="text-red-600" />;
      default: return <Clock size={16} className="text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success': return 'text-green-700 bg-green-50 border-green-200';
      case 'Pending': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'Cancelled': return 'text-red-700 bg-red-50 border-red-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const typeMatch = filter === 'All' || transaction.type === filter;
    const statusMatch = statusFilter === 'All' || transaction.status === statusFilter;
    return typeMatch && statusMatch;
  });

  // Calculate statistics
  const totalSpent = transactions
    .filter(t => t.status === 'Success')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const pendingPayments = transactions
    .filter(t => t.status === 'Pending')
    .reduce((sum, t) => sum + t.amount, 0);

  const lastTransaction = transactions
    .filter(t => t.status === 'Success')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="text-blue-600" size={24} />
            </div>
            <span className="text-2xl font-bold text-gray-800">Rs.{totalSpent.toLocaleString()}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Total Spent (YTD)</h3>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="text-yellow-600" size={24} />
            </div>
            <span className="text-2xl font-bold text-gray-800">Rs.{pendingPayments.toLocaleString()}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Pending Payments</h3>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
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
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 lg:mb-0">Billing History</h2>
          <div className="flex items-center space-x-4">
            <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium">
              + New Payment
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
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="All">All</option>
              <option value="Medical">Medical</option>
              <option value="Insurance">Insurance</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="All">All</option>
              <option value="Success">Success</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
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
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-600">{transaction.date}</td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-800">{transaction.transactionId}</td>
                  <td className="py-3 px-4">
                    <div>
                      <div className="text-sm font-medium text-gray-800">{transaction.description}</div>
                      <div className="text-xs text-gray-500">
                        {transaction.type} • {transaction.paymentMethod || 'Pending'}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(transaction.status)}
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right text-sm font-semibold text-gray-800">
                    Rs.{transaction.amount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {transaction.status === 'Success' && (
                      <button className="text-primary hover:text-primary-dark text-sm font-medium">
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
              <Calendar className="text-blue-600" size={16} />
            </div>
            <h4 className="font-medium text-blue-800">Encrypted Transactions</h4>
          </div>
          <p className="text-sm text-blue-700 mt-1">
            All medical payments are secured with 256-bit SSL encryption and comply with healthcare data protection standards.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  // State for user data and financial summaries
  const [userName, setUserName] = useState('nbsm');
  const [balance, setBalance] = useState(90);
  const [income, setIncome] = useState(100);
  const [expenses, setExpenses] = useState(10);
  const [netThisMonth, setNetThisMonth] = useState(90);

  // State for transactions (simulated data)
  const [transactions, setTransactions] = useState([
    { id: 1, description: 'vkll Shopping', type: 'expense', amount: -10, date: 'Jul 27, 2025' },
    { id: 2, description: 'hjkm Rental', type: 'income', amount: 100, date: 'Jul 27, 2025' },
  ]);

  // State for modals (for adding income/expense)
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);

  // Simulate fetching data on component mount
  useEffect(() => {
    // In a real app, you would fetch this from your MERN backend
    // Example: fetchData();
  }, []);

  // Function to handle adding income (placeholder)
  const handleAddIncome = (amount, description) => {
    // In a real app, send this to your backend
    console.log(`Adding income: ${amount} - ${description}`);
    setIncome(prev => prev + amount);
    setBalance(prev => prev + amount);
    setNetThisMonth(prev => prev + amount);
    setTransactions(prev => [{ id: Date.now(), description, type: 'income', amount, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }, ...prev]);
    setShowAddIncomeModal(false);
  };

  // Function to handle adding expense (placeholder)
  const handleAddExpense = (amount, description) => {
    // In a real app, send this to your backend
    console.log(`Adding expense: ${amount} - ${description}`);
    setExpenses(prev => prev + amount); // Store as positive for total, but use negative for display
    setBalance(prev => prev - amount);
    setNetThisMonth(prev => prev - amount);
    setTransactions(prev => [{ id: Date.now(), description, type: 'expense', amount: -amount, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }, ...prev]);
    setShowAddExpenseModal(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="flex items-center mb-4 sm:mb-0">
          <span className="text-3xl font-bold text-green-700 mr-2">💸</span>
          <h1 className="text-3xl font-bold text-green-700">Xpenso</h1>
        </div>
        <div className="text-gray-600 text-lg mb-4 sm:mb-0">
          Welcome back, <span className="font-semibold">{userName}</span>
        </div>
        <div className="flex space-x-3 w-full sm:w-auto">
          <button
            onClick={() => setShowAddIncomeModal(true)}
            className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Income
          </button>
          <button
            onClick={() => setShowAddExpenseModal(true)}
            className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
            </svg>
            Add Expense
          </button>
        </div>
      </div>

      {/* Summary Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SummaryCard title="Total Balance" value={`$${balance}`} description="Available to spend" icon="balance" color="green" />
        <SummaryCard title="Total Income" value={`$${income}`} description="All time earnings" icon="income" color="blue" />
        <SummaryCard title="Total Expenses" value={`$${expenses}`} description="All time spending" icon="expense" color="red" />
        <SummaryCard title="This Month" value={`$${netThisMonth}`} description="Net this month" icon="calendar" color="purple" />
      </div>

      {/* Monthly Summary & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">This Month Summary</h3>
          <p className="text-gray-600 mb-4">Your financial activity this month</p>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-lg">
              <span className="flex items-center text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Income
              </span>
              <span className="font-bold text-green-600">${income}</span>
            </div>
            <div className="flex justify-between items-center text-lg">
              <span className="flex items-center text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
                Expenses
              </span>
              <span className="font-bold text-red-600">${expenses}</span>
            </div>
            <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between items-center text-xl font-bold text-gray-800">
              <span>Net Change</span>
              <span>${netThisMonth}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <p className="text-gray-600 mb-4">Common tasks to manage your finances</p>
          <div className="space-y-3">
            <button
              onClick={() => setShowAddIncomeModal(true)}
              className="w-full bg-green-100 text-green-800 py-3 px-4 rounded-lg flex items-center justify-center font-semibold hover:bg-green-200 transition duration-300 ease-in-out"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Record New Income
            </button>
            <button
              onClick={() => setShowAddExpenseModal(true)}
              className="w-full bg-red-100 text-red-800 py-3 px-4 rounded-lg flex items-center justify-center font-semibold hover:bg-red-200 transition duration-300 ease-in-out"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
              </svg>
              Add New Expense
            </button>
            <div className="w-full bg-gray-100 text-gray-600 py-3 px-4 rounded-lg flex items-center justify-center font-semibold cursor-not-allowed">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Set financial goals (coming soon)
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Transactions</h3>
        <p className="text-gray-600 mb-4">Your latest income and expense entries</p>
        <div className="space-y-4">
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <div key={transaction.id} className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3
                    ${transaction.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {transaction.type === 'income' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V9m0 3v2m0 3.5V17m-3-6h6m-6 4h6m-6 4h6" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{transaction.description}</div>
                    <div className="text-sm text-gray-500">{transaction.date}</div>
                  </div>
                </div>
                <div className={`font-bold text-lg ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.type === 'income' ? '+' : ''}${Math.abs(transaction.amount)}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No transactions yet. Add some to get started!</p>
          )}
        </div>
      </div>

      {/* Add Income Modal */}
      {showAddIncomeModal && (
        <TransactionModal
          title="Record New Income"
          onClose={() => setShowAddIncomeModal(false)}
          onSubmit={handleAddIncome}
          type="income"
        />
      )}

      {/* Add Expense Modal */}
      {showAddExpenseModal && (
        <TransactionModal
          title="Add New Expense"
          onClose={() => setShowAddExpenseModal(false)}
          onSubmit={handleAddExpense}
          type="expense"
        />
      )}
    </div>
  );
};

// Helper component for Summary Cards
const SummaryCard = ({ title, value, description, icon, color }) => {
  // Use static classes for Tailwind compatibility
  const iconMap = {
    balance: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 0h.01M9 12h6m-5 0h.01M9 16h6m-5 0h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    income: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3 3 7-7M9 10v6m-3 0h6a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
      </svg>
    ),
    expense: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    calendar: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  };

  // Static background color classes
  const bgColorMap = {
    green: 'bg-green-100',
    blue: 'bg-blue-100',
    red: 'bg-red-100',
    purple: 'bg-purple-100',
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
      <div>
        <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
      <div className={`p-3 rounded-full ${bgColorMap[color]}`}>{iconMap[icon]}</div>
    </div>
  );
};

// Modal component for adding income/expense
const TransactionModal = ({ title, onClose, onSubmit, type }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setError('Please enter a valid positive amount.');
      return;
    }
    if (!description.trim()) {
      setError('Please enter a description.');
      return;
    }
    onSubmit(parseFloat(amount), description);
    setAmount('');
    setDescription('');
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">
              Amount ($)
            </label>
            <input
              type="number"
              id="amount"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="e.g., 50.00"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setError(''); // Clear error on input change
              }}
              step="0.01"
              min="0.01"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <input
              type="text"
              id="description"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="e.g., Groceries, Salary"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setError(''); // Clear error on input change
              }}
              required
            />
          </div>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={
                type === 'income'
                  ? 'font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out bg-green-600 hover:bg-green-700 text-white'
                  : 'font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out bg-red-600 hover:bg-red-700 text-white'
              }
            >
              {type === 'income' ? 'Add Income' : 'Add Expense'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
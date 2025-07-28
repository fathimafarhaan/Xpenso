import React, { useState } from 'react';
import '../index.css'; // Make sure to import the main Tailwind CSS file

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Corrected line

  const handleSignIn = async () => {
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      // Mock API call for demonstration
      const mockLogin = new Promise((resolve) => {
        setTimeout(() => {
          if (password) { // Checks if a password was entered
            resolve({ ok: true, json: () => ({ success: true }) });
          } else {
            resolve({ ok: false, json: () => ({ message: 'Invalid credentials.' }) });
          }
        }, 500);
      });

      const res = await mockLogin;
      const data = await res.json();

      if (res.ok && data.success) {
        setError('');
        if (onLogin) onLogin();
      } else {
        setError(data.message || 'Invalid credentials.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-sans">
      <h1 className="text-4xl font-bold text-green-700 mb-2">💸 Xpenso</h1>
      <p className="text-gray-600 mb-8">Take control of your finances</p>

      <div className="bg-white p-8 rounded-lg shadow-xl w-80 text-center">
        <h2 className="text-2xl font-semibold mb-2">Welcome back</h2>
        <p className="text-gray-500 mb-6">Sign in to access your financial dashboard</p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          onClick={handleSignIn}
          className="w-full p-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition duration-300"
        >
          Sign In
        </button>
        <p className="mt-4 text-sm text-gray-500">
          Demo: use any email and password
        </p>
      </div>
    </div>
  );
}

export default Login;
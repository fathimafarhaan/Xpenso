import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './index.css'; 

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-inter">
      {isLoggedIn ? (
        <Dashboard />
      ) : (
        <Login onLogin={handleLoginSuccess} />
      )}
    </div>
  );
}
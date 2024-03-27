import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RecordsPage from './pages/RecordsPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // Update state if token exists
    }
  }, []); // Empty dependency array means this runs once on component mount

  const handleLoginSuccess = (token) => {
    console.log("Logged in successfully. Token:", token);
    localStorage.setItem('token', token); // Save token to local storage
    setIsLoggedIn(true); // Update login state
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <HomePage /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/records" element={isLoggedIn ? <RecordsPage /> : <Navigate replace to="/login" />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;

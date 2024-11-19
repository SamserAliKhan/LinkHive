import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import OTPPage from './pages/OTPPage';
import Dashboard from './pages/Dashboard'; // Add the Dashboard route
import AddLinks from './pages/AddLink';
import './styles/main.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/OTP" element={<OTPPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard/*" element={<Dashboard />} /> {/* Nested routes */}
        <Route path="/AddLink"element={<AddLinks/>}/>
      </Routes>
    </Router>
  );
};

export default App;

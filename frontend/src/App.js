import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import OTPPage from './pages/OTPPage';
import Dashboard from './pages/Dashboard';
import AddLinks from './pages/AddLink';
import LinkManager from './components/LinkManager';
import UserProfile from './components/UserProfile';
import './styles/main.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/OTP" element={<OTPPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/AddLink" element={<AddLinks/>}/>
        <Route path="/links" element={<LinkManager/>}/>
        <Route path="/profile" element={<UserProfile/>}/>
      </Routes>
    </Router>
  );
};

export default App;

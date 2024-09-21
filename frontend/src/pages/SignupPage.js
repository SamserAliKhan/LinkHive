import React, { useState } from 'react';
import axios from 'axios';
// import dotenv from 'dotenv';
// dotenv.config();

const backendUrl = "http://localhost:5000";
console.log('Backend URL:', backendUrl);

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}/api/auth/signup`, formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      // Handle success response
      console.log('Signup successful:', response.data);
      setSuccessMessage('Signup successful!');
      setErrorMessage('');  // Clear any previous error messages
    } catch (error) {
      // Handle error response
      console.error('Signup failed:', error.response?.data || error.message);
      setErrorMessage('Signup failed. Please try again Letter.');
      setSuccessMessage('');  // Clear any previous success messages
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input 
        type="text" 
        name="username" 
        value={formData.username} 
        onChange={handleChange} 
        placeholder="Username" 
        required 
      />
      <input 
        type="email" 
        name="email" 
        value={formData.email} 
        onChange={handleChange} 
        placeholder="Email" 
        required 
      />
      <input 
        type="password" 
        name="password" 
        value={formData.password} 
        onChange={handleChange} 
        placeholder="Password" 
        required 
      />
      <button type="submit">Signup</button>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </form>
  );
};

export default SignupPage;
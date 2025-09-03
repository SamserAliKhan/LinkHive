import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { signup, handleApiCall } from '../services/apiService';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // Remove confirmPassword before sending to backend
      const { confirmPassword, ...signupData } = formData;
      const result = await handleApiCall(signup, signupData);
      
      console.log('Signup successful:', result);
      setSuccessMessage('Signup successful!');
      
      // Navigate to OTP page after successful signup
      setTimeout(() => {
        navigate('/OTP');
      }, 1000);
    } catch (error) {
      console.error('Signup failed:', error.message);
      setErrorMessage(error.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
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
      <input 
        type="password" 
        name="confirmPassword" 
        value={formData.confirmPassword} 
        onChange={handleChange} 
        placeholder="Confirm Password" 
        required
        />
        
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Signing Up...' : 'SignUp'}
      </button>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </form>
  );
};

export default SignupPage;

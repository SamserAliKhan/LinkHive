  import React, { useState } from 'react';
  import {useNavigate} from 'react-router-dom';
  import { login, handleApiCall } from '../services/apiService';


  const LoginPage = () => {
    const [formData, setFormData] = useState({
      email: '',
      password: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setSuccessMessage(''); // Clear previous messages
      setErrorMessage('');
      setIsLoading(true);

      try {
        const result = await handleApiCall(login, formData);
        setSuccessMessage('Login successful!');
        console.log(result);
        navigate('/dashboard'); // navigating to dashboard page after successful login
      } catch (error) {
        console.error('Error logging in:', error.message);
        setErrorMessage(error.message || 'Login failed. Please check your credentials.');
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    );
  };

  export default LoginPage;

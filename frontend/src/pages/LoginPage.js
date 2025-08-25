  import React, { useState } from 'react';
  import {useNavigate} from 'react-router-dom';
  import api from '../Config/axiosConfig';


  const LoginPage = () => {
    const [formData, setFormData] = useState({
      email: '',
      password: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setSuccessMessage(''); // Clear previous messages
      setErrorMessage('');

      try {
        const response = await api.post(
          "/auth/login",
          formData
        );
        setSuccessMessage('Login successful!');
        console.log(response.data);
        navigate('/dashboard'); // navigating to dashboard page after successful login

      } catch (error) {
        console.error('Error logging in:', error);
        setErrorMessage('Login failed. Please check your credentials.');
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
        <button type="submit">Login</button>
      </form>
    );
  };

  export default LoginPage;

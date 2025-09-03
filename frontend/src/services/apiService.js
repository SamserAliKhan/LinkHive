import api from '../Config/axiosConfig';

/**
 * Centralized API service for all backend endpoints
 * All endpoints follow the correct backend API structure
 */

// ==================== AUTH ENDPOINTS ====================

/**
 * Send OTP to mobile number
 * @param {string} mobileNumber - Mobile number to send OTP to
 */
export const sendOTP = async (mobileNumber) => {
  const response = await api.post('/auth/otp/send', { mobileNumber });
  return response.data;
};

/**
 * Verify OTP
 * @param {string} mobileNumber - Mobile number
 * @param {string} otp - OTP code
 */
export const verifyOTP = async (mobileNumber, otp) => {
  const response = await api.post('/auth/otp/verify', { mobileNumber, otp });
  return response.data;
};

/**
 * User login
 * @param {Object} credentials - Login credentials
 * @param {string} credentials.email - User email
 * @param {string} credentials.password - User password
 */
export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

/**
 * User signup
 * @param {Object} userData - User signup data
 * @param {string} userData.username - Username
 * @param {string} userData.email - Email
 * @param {string} userData.password - Password
 */
export const signup = async (userData) => {
  const response = await api.post('/auth/signup', userData);
  return response.data;
};

/**
 * User logout
 */
export const logout = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

/**
 * Refresh access token
 */
export const refreshToken = async () => {
  const response = await api.post('/auth/refresh');
  return response.data;
};

// ==================== USER ENDPOINTS ====================

/**
 * Get current user profile
 */
export const getCurrentUser = async () => {
  const response = await api.get('/user/me');
  return response.data;
};

// ==================== LINK ENDPOINTS ====================

/**
 * Add new link
 * @param {Object} linkData - Link data
 * @param {string} linkData.title - Link title
 * @param {string} linkData.url - Link URL
 * @param {string} linkData.description - Link description (optional)
 * @param {Array} linkData.tags - Array of tags (optional)
 */
export const addLink = async (linkData) => {
  const response = await api.post('/link/addLink', linkData);
  return response.data;
};

/**
 * Get all links for the current user
 */
export const getAllLinks = async () => {
  const response = await api.get('/link/');
  return response.data;
};

/**
 * Get a specific link by ID
 * @param {string} linkId - Link ID
 */
export const getLinkById = async (linkId) => {
  const response = await api.get(`/link/${linkId}`);
  return response.data;
};

/**
 * Update a specific link
 * @param {string} linkId - Link ID
 * @param {Object} linkData - Updated link data
 */
export const updateLink = async (linkId, linkData) => {
  const response = await api.put(`/link/update/${linkId}`, linkData);
  return response.data;
};

/**
 * Delete a specific link
 * @param {string} linkId - Link ID
 */
export const deleteLink = async (linkId) => {
  const response = await api.delete(`/link/delete/${linkId}`);
  return response.data;
};

// ==================== ERROR HANDLING WRAPPER ====================

/**
 * Wrapper function to handle API errors consistently
 * @param {Function} apiCall - The API function to call
 * @param {...any} args - Arguments to pass to the API function
 */
export const handleApiCall = async (apiCall, ...args) => {
  try {
    return await apiCall(...args);
  } catch (error) {
    console.error('API Error:', error);
    
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      const errorMessage = error.response.data?.message || error.response.data?.error || 'An error occurred';
      throw new Error(errorMessage);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Network error - please check your connection');
    } else {
      // Something else happened
      throw new Error('An unexpected error occurred');
    }
  }
};
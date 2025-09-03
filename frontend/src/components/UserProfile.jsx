import React, { useState, useEffect } from 'react';
import { getCurrentUser, handleApiCall } from '../services/apiService';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      setError('');
      const userData = await handleApiCall(getCurrentUser);
      setUser(userData.user || userData);
    } catch (error) {
      console.error('Error loading user profile:', error.message);
      setError(error.message || 'Failed to load user profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center py-8">
          <div className="text-xl">Loading your profile...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center py-8">
          <div className="text-red-600 text-xl">{error}</div>
          <button 
            onClick={loadUserProfile}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">User Profile</h2>
        
        {user && (
          <div className="space-y-4">
            <div className="border-b pb-4">
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <p className="mt-1 text-lg text-gray-900">{user.username || 'N/A'}</p>
            </div>
            
            <div className="border-b pb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-lg text-gray-900">{user.email || 'N/A'}</p>
            </div>
            
            {user.mobileNumber && (
              <div className="border-b pb-4">
                <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                <p className="mt-1 text-lg text-gray-900">{user.mobileNumber}</p>
              </div>
            )}
            
            {user.role && (
              <div className="border-b pb-4">
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <p className="mt-1 text-lg text-gray-900">{user.role}</p>
              </div>
            )}
            
            <div className="border-b pb-4">
              <label className="block text-sm font-medium text-gray-700">Member Since</label>
              <p className="mt-1 text-lg text-gray-900">
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
            
            <div className="pt-4">
              <button 
                onClick={loadUserProfile}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Refresh Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
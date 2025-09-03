import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout, handleApiCall } from '../services/apiService';

const Sidebar = ({ isSidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await handleApiCall(logout);
      // Redirect to login page after successful logout
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error.message);
      // Even if logout fails on server, we can still redirect to login
      navigate('/login');
    }
  };
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white p-6 space-y-6 shadow-lg transition-all duration-300 ease-in-out 
        ${isSidebarOpen ? 'left-0' : '-left-64'} 
        sm:w-16 md:w-20 lg:w-60`} // Toggle width based on state with responsive classes
    >
      {/* Close/Open Button */}
      <button
        className="absolute top-4 left-4 text-white text-2xl"
        onClick={() => setSidebarOpen(!isSidebarOpen)} // Toggle sidebar on button click
      >
        {isSidebarOpen ? '❌' : '☰'} {/* Change icon based on sidebar state */}
      </button>

      {/* Sidebar Links */}
      <div className="text-xl font-semibold mt-12">
        <Link to="/dashboard" className="block py-2 px-4 hover:text-yellow-300">Dashboard</Link>
      </div>
      <div className="text-xl font-semibold">
        <Link to="/profile" className="block py-2 px-4 hover:text-yellow-300">Profile</Link>
      </div>
      <div className="text-xl font-semibold">
        <Link to="/settings" className="block py-2 px-4 hover:text-yellow-300">Settings</Link>
      </div>
      <div className="text-xl font-semibold">
        <button 
          onClick={handleLogout}
          className="block py-2 px-4 hover:text-yellow-300 bg-transparent border-none text-white text-xl font-semibold cursor-pointer w-full text-left"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

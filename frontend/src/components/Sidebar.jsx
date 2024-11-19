import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isSidebarOpen, setSidebarOpen }) => {
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
    </div>
  );
};

export default Sidebar;

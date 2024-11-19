import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import DashboardHome from '../components/DashboardHome'; // Import the DashboardHome component
import Sidebar from '../components/sidebar';// Import Sidebar component

const DashboardPage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true); // Define the sidebar state

  return React.createElement(
    'div',
    { className: 'flex bg-gray-100 min-h-screen' },
    // Sidebar Component
    React.createElement(Sidebar, {
      isSidebarOpen: isSidebarOpen,
      setSidebarOpen: setSidebarOpen,
    }),
    // Main Content
    React.createElement(
      'div',
      {
        className: `flex-1 bg-yellow-300 py-16 px-6 transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-0'
        }`,
      },
      React.createElement(
        'section',
        { className: 'text-center' },
        React.createElement(
          'h1',
          { className: 'text-5xl font-bold text-gray-800' },
          'LinkHive Dashboard'
        ),
        React.createElement(
          'p',
          { className: 'mt-4 text-lg text-gray-700' },
          'Manage your links with ease in your personalized dashboard!'
        )
      ),
      // Render DashboardHome Component
      React.createElement(DashboardHome)
    )
  );
};

export default DashboardPage;

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css'; // Ensure Sidebar styles are imported

const DashboardPage = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div className="sidebar">
        <Link to="/home" className="sidebar-item">Home</Link>
        <Link to="/links" className="sidebar-item">Links</Link>
        <Link to="/settings" className="sidebar-item">Settings</Link>
        <Link to="/profile" className="sidebar-item">Profile</Link>
      </div>

      {/* Main Content */}
      <div className="main-content flex-1 bg-yellow-300 py-16 px-6">
        <section className="text-center">
          <h1 className="text-5xl font-bold text-gray-800">LinkHive Dashboard</h1>
          <p className="mt-4 text-lg text-gray-700">
            Manage your links with ease in your personalized dashboard!
          </p>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center">Your Features</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[{title: 'Add New Link', description: 'Create and organize your links.'}, {title: 'Analytics', description: 'View your link performance.'}].map((feature, index) => (
              <div
                key={index}
                className="bg-white shadow-lg p-6 rounded-lg text-center hover:scale-105 transform transition-all"
              >
                <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                <p className="mt-4 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;

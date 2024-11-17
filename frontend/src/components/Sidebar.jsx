import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <Link to="/dashboard">Dashboard</Link>
      </div>
      <div className="sidebar-item">
        <Link to="/profile">Profile</Link>
      </div>
      <div className="sidebar-item">
        <Link to="/settings">Settings</Link>
      </div>
      {/* Add more sidebar items as needed */}
    </div>
  );
};

export default Sidebar;

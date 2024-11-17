import React from "react";
import Dashboard from "./Dashboard";

const MainContent = ({ activeSection }) => {
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "linkShortener":
        return <h2>Link Shortener Section</h2>;
      case "contentFolder":
        return <h2>Content Folder Section</h2>;
      case "settings":
        return <h2>Settings Section</h2>;
      default:
        return <Dashboard />;
    }
  };

  return <div className="main-content">{renderContent()}</div>;
};

export default MainContent;

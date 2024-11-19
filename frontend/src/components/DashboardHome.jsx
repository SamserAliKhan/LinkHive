import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardHome = () => {
  const navigate = useNavigate();

  const handleAddLinkClick = () => {
    navigate('/addLink'); // Replace '/addLink' with the actual path to your AddLink page
  };

  return (
    <section>
      <h2 className="text-3xl font-bold text-gray-800 text-center">Your Features</h2>
      <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: 'Add New Link', description: 'Create and organize your links.' },
          { title: 'Analytics', description: 'View your link performance.' },
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-white shadow-lg p-6 rounded-lg text-center hover:scale-105 transform transition-all"
          >
            <h3
              className="text-xl font-semibold text-gray-800 cursor-pointer"
              onClick={feature.title === 'Add New Link' ? handleAddLinkClick : null}
            >
              {feature.title}
            </h3>
            <p className="mt-4 text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DashboardHome;

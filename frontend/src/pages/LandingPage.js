import React from 'react';
import { Link } from 'react-router-dom';
// import logo from '../../public/images/2-Photoroom.png';

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-yellow-300 text-center py-16">
        <h1 className="text-5xl font-bold text-gray-800">LinkHive</h1>
        <p className="mt-4 text-lg text-gray-700">
          Organize Your Links, Your Way with LinkHive!
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link to ="/signup">
          <button className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900">
            Get Started for Free
          </button>
          </Link>
          <button className="bg-white text-gray-800 px-6 py-3 rounded-lg border border-gray-800 hover:bg-gray-200">
            Explore Features
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Why Choose LinkHive?
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Feature Cards */}
          {[
            {
              title: "Organized Dashboard",
              description: "Group links under headings and customize flashcards.",
            },
            {
              title: "Custom Themes",
              description: "Add colors, icons, or images to make it truly yours.",
            },
            {
              title: "Advanced Analytics",
              description: "Track clicks and understand your audience.",
            },
            {
              title: "Seamless Experience",
              description: "Optimized for mobile and desktop.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white shadow-lg p-6 rounded-lg text-center hover:scale-105 transform transition-all"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="mt-4 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-200 py-16">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          How It Works
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4 px-6">
          {[
            { step: "Sign Up", description: "Create an account." },
            { step: "Add Links", description: "Start adding your important links." },
            { step: "Organize", description: "Use flashcards and headings to organize." },
            { step: "Share", description: "Share your personalized LinkHive page with others." },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-lg p-6 rounded-lg text-center hover:scale-105 transform transition-all"
            >
              <h3 className="text-xl font-semibold text-gray-800">{item.step}</h3>
              <p className="mt-4 text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          What Our Users Say
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {["John Doe", "Jane Smith", "Chris Johnson"].map((user, index) => (
            <div
              key={index}
              className="bg-white shadow-lg p-6 rounded-lg text-center"
            >
              <p className="italic text-gray-600">
                “LinkHive made it so easy to manage my portfolio links!”
              </p>
              <h4 className="mt-4 font-bold text-gray-800">{user}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>© 2024 LinkHive. All rights reserved.</p>
        <div className="mt-2">
          <a
            href="#"
            className="text-yellow-300 hover:underline mx-2"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-yellow-300 hover:underline mx-2"
          >
            Terms of Service
          </a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

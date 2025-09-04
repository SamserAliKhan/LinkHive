import React from "react";
import { Link } from "react-router-dom";
// import logo from '../../public/images/2-Photoroom.png';

const LandingPage = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-500">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 dark:from-purple-600 dark:via-indigo-600 dark:to-blue-600 text-center py-24 px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white drop-shadow-md">
          LinkHive
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-800 dark:text-gray-200 max-w-2xl mx-auto">
          Organize Your Links, Your Way with LinkHive!
        </p>
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Link to="/signup">
            <button className="bg-gray-900 text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition-all shadow-md hover:shadow-xl dark:hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]">
              Get Started for Free
            </button>
          </Link>
          <button className="bg-white text-gray-900 px-8 py-3 rounded-xl border border-gray-800 hover:bg-gray-200 transition-all shadow-md hover:shadow-xl dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:drop-shadow-[0_0_12px_rgba(255,215,0,0.7)]">
            Explore Features
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-screen-xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center">
          Why Choose LinkHive?
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Organized Dashboard",
              description:
                "Group links under headings and customize flashcards.",
            },
            {
              title: "Custom Themes",
              description:
                "Add colors, icons, or images to make it truly yours.",
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
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl text-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:dark:shadow-none dark:hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.7)]"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-200 dark:bg-gray-800 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center">
          How It Works
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4 px-6 max-w-screen-xl mx-auto">
          {[
            { step: "Sign Up", description: "Create an account." },
            {
              step: "Add Links",
              description: "Start adding your important links.",
            },
            {
              step: "Organize",
              description: "Use flashcards and headings to organize.",
            },
            {
              step: "Share",
              description: "Share your personalized LinkHive page with others.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl text-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:dark:shadow-none dark:hover:drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {item.step}
              </h3>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 max-w-screen-xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center">
          What Our Users Say
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "John Doe",
              feedback:
                "LinkHive made it so easy to manage my portfolio links!",
            },
            {
              name: "Jane Smith",
              feedback: "I love how customizable the dashboard is!",
            },
            {
              name: "Chris Johnson",
              feedback: "Sharing links has never been easier.",
            },
          ].map((user, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl text-center transition-all duration-300 hover:shadow-lg hover:dark:shadow-none dark:hover:drop-shadow-[0_0_12px_rgba(147,197,253,0.8)]"
            >
              <p className="italic text-gray-600 dark:text-gray-300">
                “{user.feedback}”
              </p>
              <h4 className="mt-4 font-bold text-gray-900 dark:text-white">
                {user.name}
              </h4>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 dark:bg-black dark:text-gray-400 py-8 text-center border-t border-gray-700">
        <p>© 2024 LinkHive. All rights reserved.</p>
        <div className="mt-4 flex justify-center gap-6">
          <a href="#" className="text-yellow-400 hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="text-yellow-400 hover:underline">
            Terms of Service
          </a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

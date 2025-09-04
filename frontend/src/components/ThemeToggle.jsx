import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (theme === "dark" || (!theme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative flex h-8 w-14 items-center rounded-full bg-gray-300 dark:bg-gray-700 transition-colors duration-300 focus:outline-none"
      aria-label="Toggle theme"
    >
      {/* Sliding Circle */}
      <span
        className={`absolute left-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md transition-all duration-500 transform ${
          isDark ? "translate-x-6" : "translate-x-0"
        }`}
      >
        {isDark ? (
          // Moon Icon 🌙
          <svg
            className="h-4 w-4 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293a8 8 0 01-10.586-10.586 8.001 8.001 0 1010.586 10.586z" />
          </svg>
        ) : (
          // Sun Icon ☀️
          <svg
            className="h-4 w-4 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 2.47a1 1 0 011.42 1.42l-.7.7a1 1 0 11-1.42-1.42l.7-.7zM17 9a1 1 0 100 2h1a1 1 0 100-2h-1zM4 10a1 1 0 000-2H3a1 1 0 000 2h1zm2.05-4.53a1 1 0 10-1.42-1.42l-.7.7a1 1 0 101.42 1.42l.7-.7zM10 18a1 1 0 011-1h0a1 1 0 110 2h0a1 1 0 01-1-1zm6.36-2.05a1 1 0 00-1.42-1.42l-.7.7a1 1 0 101.42 1.42l.7-.7zM6.76 15.66a1 1 0 00-1.42 0l-.7.7a1 1 0 001.42 1.42l.7-.7a1 1 0 000-1.42z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;

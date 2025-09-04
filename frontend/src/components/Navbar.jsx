import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import logo from "../images/logo.png";

export default function Navbar({ user = null, onLogout }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setOpen(!open);

  // Scroll effect for stronger background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 
        backdrop-blur-xl border-b
        ${
          scrolled
            ? "bg-white/80 dark:bg-gray-900/80 shadow-md"
            : "bg-white/40 dark:bg-gray-900/40"
        }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img src={logo} alt="LinkHive Logo" className="h-10 w-10" />
          <span className="text-lg font-bold bg-gradient-to-r from-yellow-500 to-pink-500 bg-clip-text text-transparent">
            LinkHive
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="/dashboard"
            className="text-sm font-medium text-gray-700 hover:text-black dark:text-white dark:hover:text-yellow-300 transition-colors"
          >
            Dashboard
          </a>
          <a
            href="/profile"
            className="text-sm font-medium text-gray-700 hover:text-black dark:text-white dark:hover:text-yellow-300 transition-colors"
          >
            Profile
          </a>
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-gray-100/70 dark:bg-gray-800/70 px-3 py-1 shadow-sm">
            <ThemeToggle />
            {user ? (
              <>
                <span className="text-sm text-gray-700 dark:text-gray-200">
                  Hi, {user.name || "User"}
                </span>
                <button
                  onClick={onLogout}
                  className="rounded-lg border border-red-500 px-3 py-1 text-sm text-red-500 dark:bg-red-500 dark:hover:bg-red-600 dark:text-white dark:hover:text-white hover:bg-red-500 hover:text-white transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  className="rounded-lg border px-3 py-1 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className="rounded-lg bg-gradient-to-r from-yellow-400 to-pink-500 px-3 py-1 text-sm text-white shadow-md hover:scale-105 transition"
                >
                  Sign up
                </a>
              </>
            )}
          </div>
        </div>

        {/* Mobile toggle stays same */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {open ? (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* TODO: Add Mobile menu below if needed */}
    </header>
  );
}

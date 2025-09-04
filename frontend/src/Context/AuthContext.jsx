// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { getProfile, logout } from "../APIs/Api.js";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // while checking session
  const navigate = useNavigate();

  // Fetch logged-in user on mount (checks cookie session)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getProfile(); // backend returns user info if cookie valid
        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

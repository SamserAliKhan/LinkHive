// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { getProfile, logout } from "../APIs/Api.js";
import { useNavigate } from "react-router-dom";
import { setLogoutHandler } from "../APIs/AxiosConfig.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Centralized logout (used by both user click + interceptor)
  const handleLogout = async () => {
    try {
      await logout(); // invalidate session server-side
    } catch (err) {
      console.error("Logout API failed", err);
    } finally {
      setUser(null);
      navigate("/login");
    }
  };

  // Attach logout handler to Axios interceptor
  useEffect(() => {
    setLogoutHandler(handleLogout);
  }, []);

  // Fetch logged-in user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getProfile();
        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

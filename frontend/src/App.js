// src/App.jsx
import React from "react";
import AppRouter from "./Routes/AppRouter";
import { AuthProvider } from "./Context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
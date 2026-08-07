import React, { createContext, useContext, useState } from "react";
import axiosClient from "../api/axiosClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const cached = localStorage.getItem("medimate_user");
    return cached ? JSON.parse(cached) : null;
  });

  // POST /api/auth/login  { email, password }  ->  { token, user }
  async function login(email, password) {
    const { data } = await axiosClient.post("/auth/login", { email, password });
    localStorage.setItem("medimate_token", data.token);
    localStorage.setItem("medimate_user", JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  }

  function logout() {
    localStorage.removeItem("medimate_token");
    localStorage.removeItem("medimate_user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

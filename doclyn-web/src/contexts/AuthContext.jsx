import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const setNewToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const removeToken = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, setNewToken, removeToken, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

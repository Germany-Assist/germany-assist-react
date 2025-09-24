
import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const BACKEND_URL = "http://localhost:3000";
  const login = async ({ credentials }) => {
    const res = await axios.post(`${BACKEND_URL}/login`, credentials, {
      withCredentials: true,
    });
    setUser(res.data.user);
    setAccessToken(res.data.accessToken);
    setUserId(res.data.user.id);
  };

  const logOut = async () => {
    await axios.post(`${BACKEND_URL}/logout`, {}, { withCredentials: true });
    setUser(null);
    setAccessToken(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ accessToken, user, userId,login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

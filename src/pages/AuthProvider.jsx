import axios from "axios";
import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || null);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);

  const BACKEND_URL = "http://localhost:3000/api";

  const login = async (credentials) => {
    const res = await axios.post(`${BACKEND_URL}/user/login`, credentials, {
      withCredentials: true,
    });

    setUser(res.data.user);
    setAccessToken(res.data.accessToken);
    setUserId(res.data.user.id);


    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("userId", res.data.user.id);
  };

  const logOut = async () => {
    await axios.post(`${BACKEND_URL}/logout`, {}, { withCredentials: true });
    setUser(null);
    setAccessToken(null);
    setUserId(null);


    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider value={{ accessToken, user, userId, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

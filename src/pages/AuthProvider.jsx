import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config/api";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken"));
  const [tokenExpiry, setTokenExpiry] = useState(localStorage.getItem("tokenExpiry"));

  const login = async (credentials) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/user/login`, credentials, {
      });

      const { user, accessToken, refreshToken } = res.data;
      const decoded = jwtDecode(accessToken);
      const expiryTime = decoded.exp * 1000;

      setUser(user);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setTokenExpiry(expiryTime);

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("tokenExpiry", expiryTime);

      console.log(`Logged in. Access token expires at: ${new Date(expiryTime).toLocaleTimeString()}`);
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
    }
  };


  const refreshAccessToken = async () => {
    if (!refreshToken) {
      console.warn(" No refresh token available — redirecting to login.");
      logOut();
      return;
    }

    try {
      const res = await axios.post(`${BACKEND_URL}/user/refresh-token`, { refreshToken });
      const newAccessToken = res.data.accessToken;
      const decoded = jwtDecode(newAccessToken);
      const newExpiryTime = decoded.exp * 1000;

      setAccessToken(newAccessToken);
      setTokenExpiry(newExpiryTime);
      localStorage.setItem("accessToken", newAccessToken);
      localStorage.setItem("tokenExpiry", newExpiryTime);

      console.log(` Token refreshed. New expiry: ${new Date(newExpiryTime).toLocaleTimeString()}`);
    } catch (err) {
      console.error(" Failed to refresh token:", err.response?.data || err.message);
      logOut();
    }
  };


  const logOut = async () => {
    try {
      await axios.get(`${BACKEND_URL}/user/logout`, { withCredentials: true });
    } catch {
      console.warn("Logout API failed — clearing locally only.");
    }

    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    setTokenExpiry(null);

    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("tokenExpiry");

    navigate("/login", { replace: true });
  };


  useEffect(() => {
    if (!accessToken) return;

    const decoded = jwtDecode(accessToken);
    const expiryTime = decoded.exp * 1000;
    const remaining = expiryTime - Date.now();

    if (remaining <= 0) {
      console.log(" Token expired — refreshing...");
      refreshAccessToken();
      return;
    }

    console.log(` Access token valid for ${(remaining / 1000).toFixed(0)} seconds`);
    const timer = setTimeout(() => {
      console.log(" Token expired — refreshing now...");
      refreshAccessToken();
    }, remaining - 5000);   

    return () => clearTimeout(timer);
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ accessToken, user,login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
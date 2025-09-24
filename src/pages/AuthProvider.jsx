<<<<<<< HEAD
import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config/api";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || null);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);

 

  const login = async (credentials) => {
  const res = await axios.post(`${BACKEND_URL}/user/login`, credentials, {
    withCredentials: true,
  });

  console.log("Login response:", res.data); 

  if (!res.data.accessToken) {
    console.warn("No accessToken in response — check backend!");
  }

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
=======

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
    <AuthContext.Provider value={{ accessToken, user, login, logOut }}>
>>>>>>> 21fc5c9 (7 sign in the user (#15))
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

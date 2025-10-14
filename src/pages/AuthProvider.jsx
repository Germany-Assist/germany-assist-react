import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || null);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const [tokenExpired,setTokenExpired]=useState(localStorage.getItem("tokenExpiry")||null);
 
   useEffect(()=>{
    if(accessToken){
      try {
        const decoded =jwtDecode(accessToken);
        const expTime=decoded.exp * 1000;
        setTokenExpired(expTime);
        localStorage.setItem("tokenExpiry",expTime);


        //Logout when token expires
        const now=Date.now();
        if(expTime<=now){
          logOut();
        }else{
          const timeout=expTime-now();
          const timer=setTimeout(()=>{
            alert("Your session has expired please login again");
            logOut();
          },timeout);
          return ()=>clearTimeout(timer);
        }
      } catch (err) {
        console.error("Error decoding JWT",err)
      logOut();
      }
    }
   },[accessToken])


  const login = async (credentials) => {
  const res = await axios.post(`http://localhost:3000/user/login`, credentials, {
    withCredentials: true,
  });

  console.log("Login response:", res.data); 

  if (!res.data.accessToken) {
    console.warn("No accessToken in response — check backend!");
  }

  const decoded=jwtDecode(res.data.accessToken);
  const expTime=decoded.exp * 1000;

  setUser(res.data.user);
  setAccessToken(res.data.accessToken);
  setUserId(res.data.user.id);
  setTokenExpired(expTime);
  localStorage.setItem("user", JSON.stringify(res.data.user));
  localStorage.setItem("accessToken", res.data.accessToken);
  localStorage.setItem("userId", res.data.user.id);
  localStorage.setItem("tokenExpiry",expTime);
};


  const logOut = async () => {
    await axios.post(`http://localhost:3000/logout`, {}, { withCredentials: true });
    setUser(null);
    setAccessToken(null);
    setUserId(null);
    setTokenExpired(null);


    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiry");
  };

  return (
    <AuthContext.Provider value={{ accessToken, user, userId, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
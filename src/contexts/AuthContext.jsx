import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { jwtDecode } from "jwt-decode";
import { setupInterceptors } from "../api/client";
import {
  loginRequest,
  refreshTokenRequest,
  logoutRequest,
  signUpRequest,
  googleLoginRequest,
} from "../auth/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const refreshTimeoutRef = useRef(null);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    Boolean(localStorage.getItem("accessToken"))
  );

  const [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem("accessToken")
  );

  const scheduleRefresh = (token) => {
    try {
      const { exp } = jwtDecode(token);
      const expiresAt = exp * 1000;
      const delay = expiresAt - Date.now() - 5000;

      if (delay <= 0) {
        refreshAccessToken();
        return;
      }

      refreshTimeoutRef.current = setTimeout(refreshAccessToken, delay);
    } catch {
      logOut();
    }
  };
  const signUp = async (data) => {
    const { user, accessToken } = await signUpRequest(data);
    setUser(user);
    setAccessToken(accessToken);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", accessToken);
    scheduleRefresh(accessToken);
    return { user, accessToken };
  };
  const googleLogin = async (idToken) => {
    const { user, accessToken } = await googleLoginRequest(idToken);
    setUser(user);
    setAccessToken(accessToken);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", accessToken);
    scheduleRefresh(accessToken);
    return { user, accessToken };
  };
  const login = async (credentials) => {
    const { user, accessToken } = await loginRequest(credentials);
    setUser(user);
    setAccessToken(accessToken);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", accessToken);
    scheduleRefresh(accessToken);
  };
  const refreshAccessToken = async () => {
    try {
      const newToken = await refreshTokenRequest();
      setAccessToken(newToken);
      localStorage.setItem("accessToken", newToken);
      scheduleRefresh(newToken);
      return newToken;
    } catch {
      logOut();
      throw new Error("Session expired");
    }
  };
  const logOut = async () => {
    try {
      await logoutRequest();
      setIsAuthenticated(false);
    } catch {
      // ignore
    }
    clearTimeout(refreshTimeoutRef.current);
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
  };

  useEffect(() => {
    setupInterceptors({
      getAccessToken: () => accessToken,
      refreshAccessToken,
      onLogout: logOut,
    });
  }, []);

  useEffect(() => {
    if (accessToken) {
      scheduleRefresh(accessToken);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        login,
        logOut,
        signUp,
        googleLogin,
        isAuthenticated,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

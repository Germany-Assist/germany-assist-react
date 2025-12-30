//auth context
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { jwtDecode } from "jwt-decode";
import { setupInterceptors, api } from "../api/client";
import {
  loginRequest,
  refreshTokenRequest,
  logoutRequest,
  signUpRequest,
  googleLoginRequest,
} from "../auth/authService";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const refreshTimeoutRef = useRef(null);
  const navigate = useNavigate();

  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const isAuthenticated = Boolean(accessToken);

  const scheduleRefresh = (token) => {
    if (!token) return;
    if (refreshTimeoutRef.current) clearTimeout(refreshTimeoutRef.current);

    try {
      const { exp } = jwtDecode(token);
      const delay = exp * 1000 - Date.now() - 5000; // refresh 5s before expiry
      if (delay <= 0) return refreshAccessToken();

      refreshTimeoutRef.current = setTimeout(refreshAccessToken, delay);
    } catch {
      logOut();
    }
  };

  // ------------------------
  // Auth actions
  // ------------------------
  const login = async (credentials) => {
    const { user, accessToken } = await loginRequest(credentials);
    setUser(user);
    setAccessToken(accessToken);
    scheduleRefresh(accessToken);
    return { user, accessToken };
  };

  const signUp = async (data) => {
    const { user, accessToken } = await signUpRequest(data);
    setUser(user);
    setAccessToken(accessToken);
    scheduleRefresh(accessToken);
    return { user, accessToken };
  };

  const googleLogin = async (idToken) => {
    const { user, accessToken } = await googleLoginRequest(idToken);
    setUser(user);
    setAccessToken(accessToken);
    scheduleRefresh(accessToken);
    return { user, accessToken };
  };

  const refreshAccessToken = async () => {
    try {
      const newToken = await refreshTokenRequest();
      setAccessToken(newToken);
      scheduleRefresh(newToken);
      return newToken;
    } catch {
      logOut();
      throw new Error("Refresh token failed");
    }
  };

  const logOut = async (goHome) => {
    try {
      await logoutRequest();
    } catch {}
    if (refreshTimeoutRef.current) clearTimeout(refreshTimeoutRef.current);
    setUser(null);
    setAccessToken(null);
    if (goHome) navigate("/");
  };

  // ------------------------
  // Bootstrap auth
  // ------------------------
  useEffect(() => {
    setupInterceptors({
      getAccessToken: () => accessToken,
      refreshAccessToken,
      onLogout: logOut,
    });

    const bootstrap = async () => {
      try {
        const token = await refreshAccessToken();
        if (token) {
          // profile can be fetched here if needed
        }
      } catch {
        // not logged in
      } finally {
        setAuthLoading(false);
      }
    };

    bootstrap();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated,
        authLoading,
        login,
        signUp,
        googleLogin,
        logOut,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

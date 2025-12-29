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
import { useNavigate } from "react-router-dom";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const refreshTimeoutRef = useRef(null);
  const navigate = useNavigate();
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem("accessToken")
  );

  const isAuthenticated = Boolean(accessToken);

  const scheduleRefresh = (token) => {
    if (!token || typeof token !== "string") {
      console.warn("scheduleRefresh called with invalid token:", token);
      return;
    }

    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }

    try {
      const { exp } = jwtDecode(token);
      const expiresAt = exp * 1000;
      const delay = expiresAt - Date.now() - 5000;

      if (delay <= 0) {
        refreshAccessToken();
        return;
      }

      refreshTimeoutRef.current = setTimeout(refreshAccessToken, delay);
    } catch (err) {
      console.error("Failed to schedule refresh:", err);
      logOut();
    }
  };

  // -------------------
  // Auth actions
  // -------------------
  const login = async (credentials) => {
    const { user, accessToken } = await loginRequest(credentials);
    setUser(user);
    setAccessToken(accessToken);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", accessToken);
  };

  const signUp = async (data) => {
    const { user, accessToken } = await signUpRequest(data);
    setUser(user);
    setAccessToken(accessToken);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", accessToken);
    return { user, accessToken };
  };

  const googleLogin = async (idToken) => {
    const { user, accessToken } = await googleLoginRequest(idToken);
    setUser(user);
    setAccessToken(accessToken);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", accessToken);
    return { user, accessToken };
  };

  const refreshAccessToken = async () => {
    try {
      const newToken = await refreshTokenRequest();
      setAccessToken(newToken);
      localStorage.setItem("accessToken", newToken);
      return newToken;
    } catch (err) {
      console.error("Refresh token failed:", err);
      logOut();
      throw err;
    }
  };

  const logOut = async (goHome) => {
    try {
      await logoutRequest();
      if (goHome) navigate("/");
    } catch {
      // ignore
    }

    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }

    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
  };

  // -------------------
  // Bootstrap auth ONCE
  // -------------------
  useEffect(() => {
    const bootstrapAuth = async () => {
      try {
        await refreshAccessToken();
      } catch {
        // not logged in, ignore
      } finally {
        setAuthLoading(false);
      }
    };
    bootstrapAuth();
  }, []);

  // -------------------
  // Setup Axios interceptors
  // -------------------
  useEffect(() => {
    setupInterceptors({
      getAccessToken: () => accessToken,
      refreshAccessToken,
      onLogout: logOut,
    });
  }, [accessToken]);

  // -------------------
  // Schedule refresh when token changes
  // -------------------
  useEffect(() => {
    if (accessToken) {
      scheduleRefresh(accessToken);
    }
  }, [accessToken]);

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

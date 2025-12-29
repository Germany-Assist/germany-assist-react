import { createRoot } from "react-dom/client";
import "./index.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider, useAuth } from "./contexts/AuthContext.jsx";
import { ProfileProvider, useProfile } from "./contexts/profileContext.jsx";

function BootstrapGate({ children }) {
  const { refreshAccessToken } = useAuth();
  const { fetchProfile } = useProfile();
  useEffect(() => {
    const bootstrap = async () => {
      const ok = await refreshAccessToken();
      if (ok) {
        await fetchProfile();
      }
    };
    bootstrap();
  }, []);
  return children;
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProfileProvider>
          <BootstrapGate>
            <App />
          </BootstrapGate>
        </ProfileProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

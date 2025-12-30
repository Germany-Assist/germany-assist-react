import { createRoot } from "react-dom/client";
import "./index.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider, useAuth } from "./contexts/AuthContext.jsx";
import { ProfileProvider, useProfile } from "./contexts/profileContext.jsx";

export const BootstrapGate = ({ children }) => {
  const { refreshAccessToken } = useAuth();
  const { fetchProfile } = useProfile();
  const [bootstrapped, setBootstrapped] = useState(false);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const token = await refreshAccessToken();
        if (token) {
          await fetchProfile(); // fetch profile safely
        }
      } catch {
        // user is not logged in, ignore
      } finally {
        setBootstrapped(true);
      }
    };

    bootstrap();
  }, []);
  if (!bootstrapped) return <div>Loading...</div>; // or a splash screen
  return children;
};
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

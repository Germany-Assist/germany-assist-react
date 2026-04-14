import { createContext, useContext, useEffect } from "react";
import { socket } from "../socket";
import { useAuth } from "./AuthContext";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { accessToken, logOut } = useAuth();

  useEffect(() => {
    // 👉 handler لازم يكون معرف عشان نعمل off
    const handleNotification = (data) => {
      console.log("🔔 Notification:", data);
    };

    const handleAuthError = (err) => {
      console.log("❌ Socket error:", err);

      if (err?.message === "Unauthorized") {
        logOut(true);
      }
    };

    if (accessToken) {
      socket.auth = { token: accessToken };
      socket.connect();

      socket.on("notification", handleNotification);
      socket.on("connect_error", handleAuthError);

      console.log("🟢 Socket connected...");
    } else {
      socket.disconnect();
      console.log("🔴 Socket disconnected");
    }

    return () => {
      socket.off("notification", handleNotification);
      socket.off("connect_error", handleAuthError);
      socket.disconnect();
    };
  }, [accessToken, logOut]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within SocketProvider");
  }
  return context;
};
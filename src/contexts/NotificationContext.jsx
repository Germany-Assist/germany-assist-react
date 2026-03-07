import { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "./SocketContext";
import { getNotifications } from "../api/notificationaApi"; 

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const socket = useSocket();
  const [unreadCount, setUnreadCount] = useState(0);
  const [latestNotification, setLatestNotification] = useState(null);

  
  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const res = await getNotifications({
          page: 1,
          limit: 100,
        });

       
        const unread = res.notifications.filter(n => !n.isRead).length;

        setUnreadCount(unread);
      } catch (error) {
        console.error("Error fetching unread count:", error);
      }
    };

    fetchUnreadCount();
  }, []);

  
  useEffect(() => {
    if (!socket) return;

    const handleNotification = (data) => {
      setUnreadCount((prev) => prev + 1);
      setLatestNotification(data);
    };

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
    };
  }, [socket]);

  return (
    <NotificationContext.Provider
      value={{
        unreadCount,
        setUnreadCount,
        latestNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  return useContext(NotificationContext);
};


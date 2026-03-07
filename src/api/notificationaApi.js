import { api } from "./client";

// Get notifications
export const getNotifications = async (params) => {
  const { data } = await api.get("/notification", {
    params: {
      ...params,
      _t: Date.now(), // Cache is prohibited
    },
  });

  return data;
};

// Mark notification as read
export const markNotificationAsRead = async (id) => {
  const { data } = await api.put(`/notification/${id}`);
  return data;
};


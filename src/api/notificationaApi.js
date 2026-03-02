import axios from "@/lib/axios";


export const getNotifications = async (params) => {
  const { data } = await axios.get("/notification", { params });
  return data;
};

//Function to mark notifications as read
export const markNotificationAsRead = async (id) => {
  const { data } = await axios.patch(`/notification/${id}/read`);
  return data;
};
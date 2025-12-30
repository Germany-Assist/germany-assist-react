import { api } from "./client";

export const profileRequest = async () => {
  const res = await api.get("/auth/profile");
  return res.data; // { user }
};

export const uploadProfileImage = async (payload) => {
  const res = await api.post(
    "/asset/upload/users/post/image/profileImage",
    payload
  );
  return res.data; // { user }
};

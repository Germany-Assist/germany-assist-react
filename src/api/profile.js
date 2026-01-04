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
export const addToFavoriteApi = async (id) => {
  const res = await api.put(`/service/client/favorite/${id}`, null);
  return res.status == 201;
};
export const removeFromFavoriteApi = async (id) => {
  const res = await api.delete(`/service/client/favorite/${id}`, null, {
    params: { id },
  });
  return res.status == 200;
};

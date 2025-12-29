import { api } from "./client";

export const profileRequest = async () => {
  const res = await api.get(
    "/auth/profile",
    {},
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return res.data; // { user }
};

import { api } from "./client";

export const fetchServiceProfile = async (serviceId) => {
  const data = await api.get(`/service/${serviceId}`);
  return data.data;
};

export const fetchCategories = async () => {
  const data = await api.get("/category");
  return data.data;
};

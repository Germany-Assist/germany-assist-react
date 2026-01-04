import { api } from "./client";

export const fetchServiceProfile = async (serviceId) => {
  const data = await api.get(`/service/${serviceId}`);
  return data.data;
};

export const fetchCategories = async () => {
  const data = await api.get("/category");
  return data.data;
};

export const fetchServicesApi = async (query) => {
  const data = await api.get(`/service?${query.toString()}`);
  return data.data;
};
export const fetchPaymentIntentApi = async (id) => {
  const data = await api.get(`/order/pay/${id.toString()}`);
  return data.data;
};

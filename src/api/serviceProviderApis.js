import { api } from "./client";

export const getAllServices = async (params) => {
  const queryString = params
    ? `?${new URLSearchParams(params).toString()}`
    : "";
  const res = await api.get(`/service/provider/services${queryString}`);
  return res.data;
};
export const createNewService = async (payload) => {
  const res = await api.post("/service/provider", payload);
  return res;
};
export const publishService = async (serviceId) => {
  const res = await api.get(`/service/provider/services/publish/${serviceId}`);
  return res;
};
export const unpublishService = async (serviceId) => {
  const res = await api.get(
    `/service/provider/services/unpublish/${serviceId}`,
  );
  return res;
};
export const serviceProfilePageSP = async (serviceId) => {
  const res = await api.get(`/service/provider/services/${serviceId}`);
  return res.data;
};
export const serviceProviderCheckout = async (orderId) => {
  const res = await api.get(`/order/serviceProvider/checkout/${orderId}`);
  return res.data;
};
export const serviceProviderCloseOrder = async (orderId) => {
  const res = await api.get(`/order/serviceProvider/close/${orderId}`);
  return res.data;
};
export const serviceProviderGetAllOrders = async (params) => {
  const queryString = params
    ? `?${new URLSearchParams(params).toString()}`
    : "";
  const res = await api.get(`/order/serviceProvider/getAll${queryString}`);
  return res.data;
};
export const serviceProviderFinanceInit = async () => {
  const res = await api.get(`/dashboard/provider/finance`);
  return res.data;
};

const serviceProviderApis = {
  publishService,
  unpublishService,
  getAllServices,
};
export default serviceProviderApis;

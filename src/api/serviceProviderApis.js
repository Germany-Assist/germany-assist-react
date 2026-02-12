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
export const createNewPost = async (payload) => {
  const res = await api.post(`/post/createNewPost`, payload);
  return res.data;
};
export const archiveTimeline = async (timelineId) => {
  const res = await api.put(
    `/service/timeline/provider/archiveTimeline/${timelineId}`,
  );
  return res.data;
};
export const createNewTimeline = async (payload) => {
  const res = await api.post(
    `/service/timeline/provider/createNewTimeline`,
    payload,
  );
  return res.data;
};
export const archiveVariant = async (variantId) => {
  const res = await api.put(
    `/service/variant/provider/archiveVariant/${variantId}`,
  );
  return res.data;
};
export const createNewVariant = async (payload) => {
  const res = await api.post(
    `/service/variant/provider/createNewVariant`,
    payload,
  );
  return res.data;
};
export const serviceProviderSubmitVerification = async (payload) => {
  const res = await api.post(`/requests/provider`, payload);
  return res.data;
};
export const serviceProviderReSubmitVerification = async (payload) => {
  const res = await api.put(`/requests/provider`, payload);
  return res.data;
};
export const serviceProviderGetVerificationStatus = async () => {
  const res = await api.get(`/requests/provider/profile`);
  return res.data;
};

const serviceProviderApis = {
  publishService,
  unpublishService,
  serviceProviderGetVerificationStatus,
  serviceProviderReSubmitVerification,
  serviceProviderSubmitVerification,
  getAllServices,
};
export default serviceProviderApis;

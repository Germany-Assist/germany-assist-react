import { api } from "./client";

export const getAllServices = async () => {
  const res = await api.get("/service/provider/services");
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
    `/service/provider/services/unpublish/${serviceId}`
  );
  return res;
};
export const serviceProfilePageSP = async (serviceId) => {
  const res = await api.get(`/service/provider/services/${serviceId}`);
  return res.data;
};
const serviceProviderApis = {
  publishService,
  unpublishService,
  getAllServices,
};
export default serviceProviderApis;

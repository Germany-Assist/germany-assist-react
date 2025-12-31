import { api } from "./client";

export const getAllServices = async () => {
  const res = await api.get("/service/provider/services");
  return res.data;
};
export const createNewService = async (payload) => {
  const res = await api.post("/service/provider", payload);
  return res;
};
const serviceProviderApis = {
  getAllServices,
};
export default serviceProviderApis;

import { api } from "./client";

export async function fetchClientOrders(params) {
  const queryString = params
    ? `?${new URLSearchParams(params).toString()}`
    : "";
  const res = await api.get(`/order/client/getAll${queryString}`);
  return res.data;
}

export async function openNewDispute(payload) {
  const res = await api.post(`/dispute`, payload);
  return res.data;
}

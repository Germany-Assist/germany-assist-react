// src/api/clientUserApis.js
import { api } from "./client";

export async function fetchClientOrders(params) {
  const queryString = params ? `?${new URLSearchParams(params).toString()}` : "";
  const res = await api.get(`/order/client/getAll${queryString}`);
  return res.data;
}

export async function checkIfBoughtClientApi(serviceId) {
  if (!serviceId) throw new Error("serviceId is required");
  const res = await api.get(`/order/client/checkIfBought/${serviceId}`);
  return res.data;
}

export async function openNewDispute(payload) {
  const res = await api.post(`/dispute/create`, payload);
  return res.data;
}

// add client dispute endpoints for ClientDisputes.jsx
export async function getMyDisputes() {
  const res = await api.get("/dispute"); 
  return res.data;
}

export async function cancelMyDispute(id) {
  if (!id) throw new Error("id is required");
  const res = await api.patch(`/dispute/${id}/cancel`);
  return res.data;
}
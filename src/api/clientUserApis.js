// src/api/clientUserApis.js
import { api } from "./client";

export async function fetchClientOrders(params) {
  const queryString = params ? `?${new URLSearchParams(params).toString()}` : "";
  const res = await api.get(`/order/client/getAll${queryString}`);
  return res.data;
}

export async function checkIfBoughtClientApi(serviceId) {
  const res = await api.get(`/order/client/checkIfBought/${serviceId}`);
  return res.data;
}

export async function openNewDispute(payload) {
  const res = await api.post(`/dispute/create`, payload);
  return res.data;
}

// أضف هذه الدوال الآن لكي يعمل ملف ClientDisputes.jsx
export async function getMyDisputes() {
  const res = await api.get("/dispute"); // المسار حسب الـ Swagger
  return res.data;
}

export async function cancelMyDispute(id) {
  const res = await api.patch(`/dispute/${id}/cancel`);
  return res.data;
}
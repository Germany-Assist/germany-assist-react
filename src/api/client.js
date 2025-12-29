import axios from "axios";
import { API_URL } from "../config/api";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const setupInterceptors = ({
  getAccessToken,
  refreshAccessToken,
  onLogout,
}) => {
  let isRefreshing = false;
  let queue = [];
  api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  api.interceptors.response.use(
    (res) => res,
    async (err) => {
      const original = err.config;
      if (original?.skipAuthRefresh) {
        return Promise.reject(err);
      }
      if (err.response?.status === 401 && !original._retry) {
        original._retry = true;
        if (!isRefreshing) {
          isRefreshing = true;
          try {
            const newToken = await refreshAccessToken();
            queue.forEach((cb) => cb(newToken));
            queue = [];
          } catch {
            onLogout();
            return Promise.reject(err);
          } finally {
            isRefreshing = false;
          }
        }
        return new Promise((resolve) => {
          queue.push((token) => {
            original.headers.Authorization = `Bearer ${token}`;
            resolve(api(original));
          });
        });
      }
      return Promise.reject(err);
    }
  );
};

export const apiCaller = async ({ method, url, data, config }) => {
  try {
    let resp;
    switch (method.toLowerCase()) {
      case "get":
      case "delete":
        resp = await api[method](url, config);
        break;
      case "post":
      case "put":
      case "patch":
        resp = await api[method](url, data, config);
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
    return resp.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

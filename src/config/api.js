export const NODE_ENV = import.meta.env.VITE_NODE_ENV || "development";
export const LOCAL_BACKEND_URL = import.meta.env.VITE_LOCAL_BACKEND_URL || "http://localhost:5000";
export const DROPLET_BACKEND_URL = import.meta.env.VITE_DROPLET_BACKEND_URL;
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
export const STRIPE_KEY = import.meta.env.VITE_STRIPE_SK;
export const API_URL =
  NODE_ENV == "production"
    ? `${DROPLET_BACKEND_URL}/api`
    : `${LOCAL_BACKEND_URL}/api`;
console.log("Current API URL:", API_URL);
console.log("Local Backend URL Variable:", LOCAL_BACKEND_URL);
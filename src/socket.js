import { io } from "socket.io-client";
export const STAGING_BACKEND_URL = import.meta.env.VITE_DROPLET_STAGING_URL;
export const NODE_ENV = import.meta.env.VITE_NODE_ENV;
export const LOCAL_BACKEND_URL = import.meta.env.VITE_LOCAL_BACKEND_URL;
export const DROPLET_BACKEND_URL = import.meta.env.VITE_DROPLET_BACKEND_URL;

export const SOCKET_URL =
  NODE_ENV === "production"
    ? `${DROPLET_BACKEND_URL}`
    : NODE_ENV === "staging"
      ? `${STAGING_BACKEND_URL}`
      : `${LOCAL_BACKEND_URL}`;
export const socket = io(SOCKET_URL, {
  autoConnect: false,
});

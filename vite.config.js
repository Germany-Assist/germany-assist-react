import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    proxy: {
      "/staging/backend": {
        target: "http://www.germany-assist.com",
        changeOrigin: true,
      },
    },
  },
});

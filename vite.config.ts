import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";
import * as dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
    }),
  ],
  server: {
    proxy: {
      "/back": {
        target: process.env.VITE_PROD_URL, 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/back/, ""), 
        secure: false,
      },
    },
  },
});

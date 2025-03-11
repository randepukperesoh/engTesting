import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";
import * as dotenv from "dotenv";

// Загрузка переменных окружения
dotenv.config();

export default defineConfig({
  // base: "/t/speaktest/",
  plugins: [
    react(),
    visualizer({
      open: true,
    }),
  ],
  server: {
    proxy: {
      "/back": {
        target: process.env.VITE_API_URL, // Использование переменной окружения
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/back/, ""),
        secure: false,
      },
    },
  },
});

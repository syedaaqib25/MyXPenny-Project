import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["prop-types"], // Prevents Rollup from failing due to missing prop-types
    },
  },
  server: {
    port: 3000, // Change this if you need a different port
  },
  resolve: {
    alias: {
      "@": "/src", // Allows you to use `@/components/...` instead of relative paths
    },
  },
});

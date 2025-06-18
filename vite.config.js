// /* eslint-disable no-undef */
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: "127.0.0.1",
//     port: 5173,
//   },
// });
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
// });
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://upskilling-egypt.com:3006",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "/api/v1"),
      },
      "/images": {
        target: "https://upskilling-egypt.com:3006",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

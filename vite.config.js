import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // The background photos live in ../images, outside this project folder.
  server: { fs: { allow: [".."] } },
  define: { __PREVIEW__: false },
});

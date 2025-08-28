import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@karel/ctrl_f_pro_elements": path.resolve(__dirname, "../ctrl_f_pro_elements/src"),
    },
  },
});

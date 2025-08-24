import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // todo なぜ設定したのか、確かデプロイの観点だったような、、、
  // base: "/transfer-vehicle/", // ← リポジトリ名を指定
  server: {},
});

/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    include: ["test/vitest/**.test.tsx"],
    exclude: ["node_modules"],
    coverage: {
      reporter: ["json-summary"],
    },
    globals: true,
    environment: "jsdom",
    alias: {
      "@/": new URL("./src/", import.meta.url).pathname,
    },
  },
});

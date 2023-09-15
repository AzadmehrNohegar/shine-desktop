import { join } from "path";
import { defineConfig } from "vite";
import { VitePluginDoubleshot } from "vite-plugin-doubleshot";

// https://vitejs.dev/config/
export default defineConfig({
  root: join(__dirname, "src/frontend"),
  plugins: [
    VitePluginDoubleshot({
      type: "electron",
      main: "dist/backend/index.js",
      entry: "src/backend/index.ts",
      outDir: "dist/backend",
      external: ["electron"],
      electron: {
        build: {
          config: "./electron-builder.config.js",
        },
        preload: {
          entry: "src/preload/index.ts",
          outDir: "dist/preload",
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@frontend": join(__dirname, "src/frontend"),
      "@backend": join(__dirname, "src/backend"),
      "@model": join(__dirname, "src/model"),
    },
  },
  base: "./",
  build: {
    outDir: join(__dirname, "dist/frontend"),
    emptyOutDir: true,
  },
});

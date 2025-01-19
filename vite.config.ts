import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// export type definition files
import dts from "vite-plugin-dts";

import path from "path";

export default defineConfig({
  plugins: [react(), dts({ include: "src" })],
  build: {
    // build package as a library
    lib: {
      entry: path.resolve(__dirname, "src/main.tsx"),
      // es = ES module
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      // avoid bundling react and react-dom
      // as they will be already required and bundled by the user app
      // using this application
      external: ["react", "react-dom", "react/jsx-runtime", "tailwindcss"],
    },
    sourcemap: true,
  },
});

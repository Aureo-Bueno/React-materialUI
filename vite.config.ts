import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
// import svgr from "vite-plugin-svgr"; // se usar SVG como componente

export default defineConfig({
  server: {
    port: 8080,
  },
  plugins: [
    react(),
    tsconfigPaths(),
    // svgr(),
  ],
});

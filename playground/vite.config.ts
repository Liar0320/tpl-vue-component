import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader()],
  resolve: {
    alias: {
      "vue-visual-editor/dist/styles/index.css": "vue-visual-editor/src/styles/index.scss",
      "vue-visual-editor": "vue-visual-editor/src/index",
    },
  },
});

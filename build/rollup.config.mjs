import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
// import vue from "rollup-plugin-vue";
import typescript from "rollup-plugin-typescript2";
import path from "node:path";
import generateDts from "./plugins/generate-dts";
// const resolve = require("@rollup/plugin-node-resolve");

/**@type {import("rollup").RollupOptions} */
export default {
  input: path.resolve(__dirname, "../packages/src/index.ts"),
  output: {
    file: path.resolve(__dirname, "../packages/dist/index.js"),
    format: "esm",
  },
  plugins: [
    vue({
      isProduction: false,
    }),
    svgLoader(),
    typescript({
      tsconfig: path.resolve(__dirname, "../packages/tsconfig.json"),
    }),
    generateDts({
      pkgRoot: path.resolve(__dirname, "../packages/src"),
      buildOutput: path.resolve(__dirname, "../packages/dist"),
      tsConfigFilePath: path.resolve(__dirname, "../packages/tsconfig.json"),
    }),
    // vueJsx(),
    // DefineOptions(),
    // nodeResolve({
    //   extensions: [".mjs", ".js", ".json", ".ts"],
    // }),
    // commonjs(),
    // esbuild({
    //   target,
    //   // tsconfig: '../../tsconfig.json',
    //   define: {
    //     "process.env.NODE_ENV": JSON.stringify("production"),
    //   },
    //   loaders: {
    //     ".vue": "ts",
    //   },
    // }),
    // filesize({ reporter }),
  ],
  external: ["vue", "node_modules", "vue-demi", "vue-core"],
  treeshake: true,
};

import vue from "rollup-plugin-vue";
// const vue = require("@vitejs/plugin-vue")
import typescript from "rollup-plugin-typescript2";
// const typescript = require("@rollup/plugin-typescript");
import path from "node:path";
// const resolve = require("@rollup/plugin-node-resolve");
import generateTypes from "./utils/generate-types.mjs";

debugger;
generateTypes(
  path.resolve(__dirname, "../packages/src"),
  path.resolve(__dirname, "../packages/dist"),
  path.resolve(__dirname, "../packages/tsconfig.json")
);

export default {
  input: path.resolve(__dirname, "../packages/src/index.ts"),
  output: {
    file: path.resolve(__dirname, "../packages/dist/index.js"),
    format: "esm",
  },
  plugins: [
    vue({
      isProduction: true,
    }),
    typescript({
      tsconfig: path.resolve(__dirname, "../packages/tsconfig.json"),
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

const vue = require("rollup-plugin-vue");
// const vue = require("@vitejs/plugin-vue")
const typescript = require("rollup-plugin-typescript2");
// const typescript = require("@rollup/plugin-typescript");
const path = require("path");
// const resolve = require("@rollup/plugin-node-resolve");
module.exports = {
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
      abortOnError:false
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

/*
 * @Author: lich
 * @Date: 2023-02-06 01:57:31
 * @Last Modified by: lich
 * @Last Modified time: 2023-02-06 02:09:35
 */
import generateTypes from "../utils/generate-types.mjs";

/**
 * @param {Object} opts
 * @param {string} opts.pkgRoot  需要遍历的文件路径
 * @param {string} opts.buildOutput  打包的输出目录
 * @param {string} opts.tsConfigFilePath tsconfig root
 * @returns {import("rollup").Plugin} */
export default function generateDts({
  pkgRoot,
  buildOutput,
  tsConfigFilePath,
}) {
  return {
    name: "generate-dts", // this name will show up in warnings and errors
    buildEnd() {
      generateTypes(pkgRoot, buildOutput, tsConfigFilePath);
    },
  };
}

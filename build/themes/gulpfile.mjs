/*
 * @Author: lich
 * @Date: 2023-02-27 00:36:57
 * @Last Modified by: lich
 * @Last Modified time: 2023-02-27 00:56:28
 * @descriptions:
 * 1. error, ReferenceError: gulp is not defined . https://stackoverflow.com/questions/8817423/why-is-dirname-not-defined-in-node-repl
 * 2. https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
 */
import dartSass from "sass";
import gulpSass from "gulp-sass";
import { resolve } from "path";
import gulp from "gulp";
import { pkgOutput, pkgRoot } from "../utils/const.js";

const sass = gulpSass(dartSass);
const rootDir = resolve(pkgRoot, "src/styles/**/*");
const outputDir = resolve(pkgOutput, "styles");

function buildStyles() {
  return gulp.src(rootDir).pipe(sass().on("error", sass.logError)).pipe(gulp.dest(outputDir));
}

export default buildStyles;

import path from "path";
// export const pkgRoot = resolve(__dirname, "../../packages/src");
// export const pkgRoot = resolve(__dirname, "../../packages/src");

export const projRoot = path.resolve(__dirname, "..", "..");
export const pkgRoot = path.resolve(projRoot, "packages");
export const pkgOutput = path.resolve(pkgRoot, "dist");

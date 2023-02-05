/*
 * @Author: lich
 * @Date: 2023-02-05 22:38:07
 * @Last Modified by: lich
 * @Last Modified time: 2023-02-06 00:23:59
 * @descrition:
 * 生成声明文件
 */
import path from "path";
import fs from "fs";
import { Project } from "ts-morph";
import glob from "fast-glob";
import resolveFrom from "resolve-from";
// import { buildOutput, pkgRoot } from "../utils/paths";

let buildOutput = path.resolve(__dirname, "dist");
let pkgRoot = path.resolve(__dirname, "src");
let tsConfigFilePath = fs.existsSync("tsconfig.json")
  ? "tsconfig.json"
  : undefined;

let vueCompiler;

const getVueCompiler = () => {
  if (!vueCompiler) {
    const id = resolveFrom.silent(process.cwd(), "@vue/compiler-sfc");
    if (!id) {
      throw new Error("@vue/compiler-sfc is not founded in ./node_modules");
    }
    vueCompiler = require(id);
  }

  return vueCompiler;
};

export async function build() {
  const outDir = path.resolve(buildOutput, "types");

  const vueCompiler = getVueCompiler();

  const compilerOptions = {
    allowJs: true,
    declaration: true,
    noEmit: false,
    emitDeclarationOnly: true,
    noEmitOnError: true,
  };
  if (outDir) {
    compilerOptions.outDir = outDir;
  }

  const project = new Project({
    compilerOptions,
    tsConfigFilePath,
    skipAddingFilesFromTsConfig: true,
  });
  const files = await glob("**/*.{js,ts,vue}", {
    cwd: pkgRoot,
    absolute: true,
    onlyFiles: true,
  });

  const sourceFiles = [];

  await Promise.all(
    files.map(async (file) => {
      const content = await fs.promises.readFile(file, "utf8");
      if (file.endsWith(".ts")) {
        const sourceFile = project.createSourceFile(
          path.relative(process.cwd(), file),
          content,
          {
            overwrite: true,
          }
        );
        sourceFiles.push(sourceFile);
        return;
      }
      const sfc = vueCompiler.parse(content);
      const { script, scriptSetup } = sfc.descriptor;
      if (script || scriptSetup) {
        let content = "";
        let isTS = false;
        if (script && script.content) {
          content += script.content;
          if (script.lang === "ts") isTS = true;
        }
        if (scriptSetup) {
          const compiled = vueCompiler.compileScript(sfc.descriptor, {
            id: "xxx",
          });
          content += compiled.content;
          if (scriptSetup.lang === "ts") isTS = true;
        }
        const sourceFile = project.createSourceFile(
          path.relative(process.cwd(), file) + (isTS ? ".ts" : ".js"),
          content
        );
        sourceFiles.push(sourceFile);
      }
    })
  );

  const diagnostics = project.getPreEmitDiagnostics();
  console.log(project.formatDiagnosticsWithColorAndContext(diagnostics));

  const emitted = project.emitToMemory();

  for (const sourceFile of sourceFiles) {
    const emitOutput = sourceFile.getEmitOutput();
    for (const outputFile of emitOutput.getOutputFiles()) {
      const filepath = outputFile.getFilePath().replace(".vue.d.ts", ".d.ts");
      await fs.promises.mkdir(path.dirname(filepath), { recursive: true });
      await fs.promises.writeFile(
        filepath,
        outputFile.getText().replace(".vue", ""),
        "utf8"
      );
      console.log(`Emitted ${filepath}`);
    }
  }
}

/**
 * @param {string } _pkgRoot  需要遍历的文件路径
 * @param {string} _buildOutput  打包的输出目录
 */
function main(_pkgRoot, _buildOutput, _tsConfigFilePath) {
  pkgRoot = _pkgRoot;
  buildOutput = _buildOutput;
  tsConfigFilePath = _tsConfigFilePath;

  build();
}

export default main;

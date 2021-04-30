// @ts-check
const fs = require("fs");
const path = require("path");
const rootPath = path.resolve(__dirname, "../packages");

const { matchRemover } = require("@bfchain/devkit");

matchRemover(
  rootPath,
  (file, fullpath, deep) =>
    deep === 2 && fs.statSync(fullpath).isDirectory() && file.includes("build"),
  2,
);

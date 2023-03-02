// @ts-check
const { bytecodeCompiler, bytecodeToCachedData } = require("./bytecodeHelper");
const { Script } = require("node:vm");
const fs = require("node:fs");
const path = require("node:path");

/**
 *
 * @param {string} inputFilepath
 * @param {string} outputFilepath
 * @returns
 */
const bytecodeCompilerFromFile = (inputFilepath, outputFilepath) => {
    const byteCode = bytecodeCompiler(fs.readFileSync(inputFilepath, "utf8"), path.basename(inputFilepath));
    outputFilepath && fs.writeFileSync(outputFilepath, byteCode);
    return byteCode;
};

exports.bytecodeCompilerFromFile = bytecodeCompilerFromFile;

if (require.main === module) {
    const args = process.argv.slice(process.argv.indexOf("--") + 1);
    console.log(process.argv, args);
    if (args[0].endsWith(".js")) {
        bytecodeCompilerFromFile(args[0], args[1]);
    } else {
        const cachedDataInfo = bytecodeToCachedData(fs.readFileSync(args[0]));
        const script = new Script(cachedDataInfo.dummyCode, { filename: "qaq", cachedData: cachedDataInfo.cachedData });
        console.log(script.cachedDataRejected);
        const wrappedModule = script.runInThisContext();
        wrappedModule();
    }
}

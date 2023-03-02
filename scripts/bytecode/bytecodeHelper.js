// @ts-check

const { Script } = require("node:vm");
const { setFlagsFromString } = require("node:v8");
setFlagsFromString("--no-lazy");
setFlagsFromString("--no-flush-bytecode");
const { wrap } = require("module");

/**
 * 将代码编译成字节码
 */
function bytecodeCompiler(sourceCode, filename) {
    /**包裹成cjs的模块代码 */
    const wrappedSourceCode = wrap(sourceCode);
    // console.log("string code size:", wrappedSourceCode.length);
    const script = new Script(wrappedSourceCode, { filename });

    /**
     *
     * @param {Script} script
     */
    const doCache = (script) => {
        const cachedData = script.createCachedData();
        return cachedData;
    };
    return doCache(script);
}

/**
 * 将字节码转义成可运行的 vm.Script.cachedData
 */
function bytecodeToCachedData(bytecode) {
    const sourceCodeLength = bytecode.readInt32LE(8);
    const dummyCode = `"${"\u200b".repeat(sourceCodeLength - 2)}"`;
    const preCachedData = bytecodeCompiler(`"fix"`);
    bytecode.set(preCachedData.slice(12, 16), 12);
    return {
        sourceCodeLength,
        dummyCode,
        cachedData: bytecode,
    };
}

exports.bytecodeCompiler = bytecodeCompiler;
exports.bytecodeToCachedData = bytecodeToCachedData;

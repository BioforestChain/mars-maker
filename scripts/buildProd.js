// @ts-check
const os = require("node:os");
const fs = require("node:fs");
const path = require("node:path");
const bytecode = require("./bytecode");
const childProcess = require("child_process");
const log = require("debug")("transaction-maker-server:build");
log.enabled = true;
const runPlatform = process.argv[2] || os.platform();
log(`run platform: ${runPlatform}`);

// @ts-ignore
// const esbuild = require("esbuild");
const baseDir = process.cwd();
const resultDir = "dist";
const resultFullDir = baseDir + "/" + resultDir;
const staticDir = resultFullDir + "/assets";
// $env:minify="false"
// const minify = process.env.minify === "false" ? false : true;
/**是否要编译出来给本地的node跑的
 * 这会影响bytecode的输出
 */
const forAll = process.argv.find((arg) => arg === "--for-all") ? true : "for_all" in process.env ? !!process.env.for_all : false;
const forNode = process.argv.find((arg) => arg === "--for-node") ? true : "for_node" in process.env ? !!process.env.for_node : false;
const platforms = forNode ? ["node"] : forAll ? ["win32", "linux"] : runPlatform === "win32" ? ["win32"] : ["linux"];

function initEsbuild() {
    const installEsbuild = () => {
        let installTimes = 0;
        while (installTimes < 3) {
            try {
                if (runPlatform === "win32") {
                    childProcess.execSync(`npm i -g esbuild`, {
                        stdio: ["inherit", "inherit", "pipe"],
                        cwd: __dirname,
                    });
                    log(`install esbuild success platform ${runPlatform}`);
                    break;
                }
                if (runPlatform === "linux") {
                    childProcess.execSync(`npm i -g esbuild-linux-64`, {
                        stdio: ["inherit", "inherit", "pipe"],
                        cwd: __dirname,
                    });
                    log(`install esbuild success platform ${runPlatform}`);
                    break;
                }
                log(`not support platform ${runPlatform}`);
                process.exit(0);
            } catch (e) {
                log(e);
                installTimes++;
                if (installTimes > 3) {
                    log(`install esbuild fail, please install by your self, platform ${runPlatform}`);
                }
            }
        }
    };
    let checkTimes = 0;
    while (checkTimes < 3) {
        try {
            const version = childProcess.execSync(`esbuild --version`);
            if (!version) {
                continue;
            }
            log(`esbuild ${version.toString()}`);
            break;
        } catch (e) {
            log(e);
            checkTimes++;
            if (e.message.includes("Command failed: esbuild --version")) {
                installEsbuild();
            }
        }
    }
}

/**
 * 创建文件夹
 *
 * @param {*} targetPath
 */
function initDir(targetPath) {
    if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath, { recursive: true });
    }
}

/**
 * 移除文件夹
 *
 * @param {*} targetPath
 */
function removeDir(targetPath) {
    if (!fs.existsSync(targetPath)) {
        return;
    }
    fs.rmSync(targetPath, { recursive: true });
}

/**
 * 拷贝文件夹
 *
 * @param {*} sourcePath
 * @param {*} targetPath
 * @param {*} prefix
 */
function copyDir(sourcePath, targetPath, prefix) {
    if (!fs.existsSync(sourcePath)) {
        throw new Error(`source path not exist: ${sourcePath}`);
    }
    initDir(targetPath);
    const files = fs.readdirSync(sourcePath);
    for (const file of files) {
        const curPath = sourcePath + "/" + file;
        const savePath = targetPath + "/" + file;
        if (fs.statSync(curPath).isDirectory()) {
            copyDir(curPath, savePath, prefix);
        } else {
            // 只拷贝指定后缀的文件
            if (prefix && !file.endsWith(prefix)) {
                continue;
            }
            fs.writeFileSync(savePath, fs.readFileSync(curPath));
        }
    }
}

/**
 * 拷贝创世信息
 *
 */
function copyGenesisInfosDir() {
    log(`start to copy genesisInfos ...`);
    copyDir(baseDir + "/node_modules/@bfchain/coretools-obtain-genesis-info/build/cjs/genesisInfos", staticDir + "/genesisInfos", ".json");
    log(`finish to copy genesisInfos ...`);
}

// 备份原有的 package.json
const packageJsonPath = path.resolve(baseDir, "package.json");
const packageJsonBackupPath = path.resolve(baseDir, "package_backup.json");
/**
 * 更改 package.json 内容
 *
 */
function changePackageJson() {
    log(`start to change package.json ...`);
    const defaultPackageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString());
    // 备份 packageJson
    fs.writeFileSync(packageJsonBackupPath, JSON.stringify(defaultPackageJson, null, 4));
    const content = JSON.parse(fs.readFileSync(packageJsonPath).toString());
    content.main = `${resultDir}/index.js`;
    content.bin = `${resultDir}/index.js`;
    content.pkg.scripts = [`${resultDir}/index.js`].sort();
    content.pkg.assets = ["!**/*.json", "**/*.jsb", `${resultDir}/bytorkerExecutor.js`, `${resultDir}/assets/genesisInfos/*.json`].sort();

    delete content.license;
    delete content.dependencies;
    delete content.devDependencies;
    delete content.optionalDependencies;
    fs.writeFileSync(packageJsonPath, JSON.stringify(content, null, 4));
    log(`finish to change package.json ...`);
}

/**
 * 恢复 package.json 内容
 *
 */
function restorePackageJson() {
    log(`start to restore package.json ...`);
    fs.writeFileSync(packageJsonPath, fs.readFileSync(packageJsonBackupPath));
    fs.unlinkSync(packageJsonBackupPath);
    log(`finish to restore package.json ...`);
}

const indexJsPath = path.resolve(baseDir, "index.js");
const indexJsBackupPath = path.resolve(baseDir, "index_backup.js");

function changeIndexJs() {
    log(`start to change index.js ...`);
    let defaultIndexJs = fs.readFileSync(indexJsPath).toString();
    // 备份 index.js
    fs.writeFileSync(indexJsBackupPath, defaultIndexJs);
    const targetString = "process.env.ENVIRONMENT_TYPE = ENVIRONMENT_TYPE.DEVELOPMENT";
    const replaceString = "process.env.ENVIRONMENT_TYPE = ENVIRONMENT_TYPE.PRODUCTION";
    if (defaultIndexJs.includes(targetString)) {
        defaultIndexJs = defaultIndexJs.replace(targetString, replaceString);
        fs.writeFileSync(indexJsPath, defaultIndexJs);
    }
    try {
        const str = childProcess.execSync("git log -1").toString();
        const title = "commit ";
        const commitHash = str.substr(title.length, str.indexOf("\n") - title.length);
        log(`commitHash: ${commitHash}`);
        if (defaultIndexJs.includes(`process.env["GITHASH"] = ""`)) {
            defaultIndexJs = defaultIndexJs.replace(`process.env["GITHASH"] = ""`, `process.env["GITHASH"] = "${commitHash}"`);
        }
        fs.writeFileSync(indexJsPath, defaultIndexJs);
    } catch (err) {
        console.warn(err);
    }
    log(`finish to change index.js ...`);
}

function restoreIndexJs() {
    log(`start to restore index.js ...`);
    fs.writeFileSync(indexJsPath, fs.readFileSync(indexJsBackupPath));
    fs.unlinkSync(indexJsBackupPath);
    log(`finish to restore index.js ...`);
}

/**
 * 初始化
 *
 */
function init() {
    log(`start to clear result dir ...`);
    removeDir(resultFullDir);
    initDir(resultFullDir);
    log(`finish to clear result dir ...`);
}

/**
 * ncc 编译源文件
 *
 */
function nccBuild(platform) {
    let esbuildPlatform = platform;
    try {
        require.resolve("esbuild/esbuild.exe");
        esbuildPlatform = "win32";
    } catch {
        esbuildPlatform = "linux";
    }

    const toWindow = (filePath) => {
        if (esbuildPlatform === "linux") {
            filePath = filePath.replace(/^(w+)\:\\\\/, (_, p) => `/mnt/${p.toLowerCase()}/`);
        } else {
            filePath = filePath.replace(/^\/mnt\/(\w+)\//, (_, p) => `${p.toUpperCase()}:/`);
        }
        console.log("filePath", filePath);
        return filePath;
    };
    // @ts-ignore
    const inputFileArgv = (inputfile) => path.resolve(__dirname, "../", inputfile);
    const outputFileArgv = (outfile) => path.resolve(resultFullDir, outfile);
    // const options = {
    //     // minifyWhitespace: minify,
    //     // minifyIdentifiers: minify,
    //     logLevel: "error",
    //     bundle: true,
    //     platform: "node",
    //     target: "node12",
    //     external: ["mongoose"],
    //     write: true,
    //     charset: "utf8",
    // };

    /**
     * 字节码编译器
     */
    const bytecodeCompiler =
        platform === "node"
            ? (input, output, unlinkInput = false) => {
                  bytecode.bytecodeCompilerFromFile(input, output);
                  if (unlinkInput) {
                      fs.unlinkSync(input);
                  }
              }
            : (() => {
                  /**
                   * @TODO 支持其它平台
                   *
                   */
                  let bytecodeRunnerExt = "";
                  let pkgTargetName = "node16-linux-x64";
                  switch (platform) {
                      case "win32":
                          bytecodeRunnerExt = ".exe";
                          pkgTargetName = "node16-win-x64";

                          break;
                      case "linux":
                          bytecodeRunnerExt = "";
                          pkgTargetName = "node16-linux-x64";
                          break;
                      case "darwin":
                          bytecodeRunnerExt = ".pkg";
                          pkgTargetName = "node16-mac-x64";

                          break;
                      default:
                          break;
                  }
                  const bytecodeRunnerFilename = path.resolve(resultFullDir, `./binary/bytecode${bytecodeRunnerExt}`);
                  if (fs.existsSync(bytecodeRunnerFilename) === false) {
                      log(`building bytecode generator ...`);
                      childProcess.execSync(`pkg -t ${pkgTargetName} -o ${bytecodeRunnerFilename} ./bytecode/bytecode.js`, {
                          stdio: ["inherit", "inherit", "pipe"],
                          cwd: __dirname,
                      });
                  }
                  return (input, output, unlinkInput = false) => {
                      childProcess.spawnSync(bytecodeRunnerFilename, ["--", input, output]);
                      if (unlinkInput) {
                          fs.unlinkSync(input);
                      }
                  };
              })();

    log(`start to build source code ...`);

    const esbuildBuild = (outputFile, inputFile) => {
        try {
            childProcess.execSync(
                `esbuild --bundle --log-level=error --platform=node --target=node16 --external:mongoose --external:wrtc --external:node:* --charset=utf8 --outfile=${outputFile} ${inputFile}`,
                {
                    stdio: ["inherit", "inherit", "pipe"],
                    cwd: __dirname,
                }
            );
        } catch (e) {
            console.log(e);
        }
    };

    // esbuildBuild(toWindow(outputFileArgv("bytorkerExecutor.js")), toWindow(inputFileArgv("build/src/helpers/bytorkerExecutor.js")));
    // // await esbuild.build({
    // //     entryPoints: [inputFileArgv("build/src/helpers/bytorkerExecutor.js")],
    // //     outfile: outputFileArgv("bytorkerExecutor.js"),
    // //     ...options,
    // // });
    // log("successed build bytorkerExecutor.js");

    esbuildBuild(toWindow(outputFileArgv("index.js")), toWindow(inputFileArgv("index.js")));
    // await esbuild.build({
    //     entryPoints: [inputFileArgv("index.js")],
    //     outfile: outputFileArgv("index.js"),
    //     ...options,
    // });
    log("successed build index.js");

    log(`finish to build source code ...`);
}

/**
 * pkg 打包成二进制文件
 *
 */
function pkg(platform) {
    if (platform === "node") {
        return;
    }
    const pkgTargets = process.argv.find((arg) => arg.startsWith("-t="));
    if (pkgTargets) {
        //优先根据命令行参数决定包的平台
        childProcess.execSync(`pkg package.json -t ${pkgTargets.slice(3)} --options "max_old_space_size=8172,no_deprecation"`, {
            stdio: ["inherit", "inherit", "pipe"],
        });
        return;
    }
    switch (platform) {
        case "linux":
            childProcess.execSync('pkg package.json -t node16-linux-x64 --options "max_old_space_size=8172,no_deprecation"', {
                stdio: ["inherit", "inherit", "pipe"],
            });
            break;
        case "darwin":
            childProcess.execSync('pkg package.json -t node16-mac-x64 --options "max_old_space_size=8172,no_deprecation"', {
                stdio: ["inherit", "inherit", "pipe"],
            });
            break;
        case "win32":
            childProcess.execSync('pkg package.json -t node16-win-x64 --options "max_old_space_size=8172,no_deprecation"', {
                stdio: ["inherit", "inherit", "pipe"],
            });
            break;
        default:
            break;
    }
}

(async () => {
    try {
        // 初始化
        init();

        // 初始化编译环境
        initEsbuild();

        // 拷贝资源文件
        // 拷贝创世信息
        copyGenesisInfosDir();

        try {
            // 改写 index.js
            changeIndexJs();

            // 改写 package.json
            changePackageJson();

            for (const platform of platforms) {
                // 编译源码
                console.log(`platform: ${platform}`);
                nccBuild(platform);

                // 打包二进制文件
                pkg(platform);
            }
        } catch (error) {
            log(error);
        } finally {
            // 还原 index.json
            restoreIndexJs();

            // 还原 package.json
            restorePackageJson();
        }
    } catch (error) {
        log(error);
    }
})();

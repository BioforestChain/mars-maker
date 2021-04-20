const fs = require("fs");

/**
 * 移除文件夹
 *
 * @param {*} targetPath
 */
function removeDir(targetPath) {
    if (!fs.existsSync(targetPath)) {
        return;
    }
    if (fs.statSync(targetPath).isDirectory()) {
        const files = fs.readdirSync(targetPath);
        for (const file of files) {
            const curPath = targetPath + "/" + file;
            if (fs.statSync(curPath).isDirectory()) {
                // 递归获取文件夹
                removeDir(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        }
        fs.rmdirSync(targetPath);
    } else {
        fs.unlinkSync(targetPath);
    }
}

removeDir(process.cwd() + "/build");

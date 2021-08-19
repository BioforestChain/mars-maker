// @ts-check
const fs = require("fs");
const path = require("path");
const rootpath = path.resolve(__dirname, "../packages");

const dependencies = {
    "@bfchain/coretools": "~1.11.6",
    "@bfchain/license": "~3.2.2",
    "@bfchain/protobuf": "~4.1.9",
    "@bfchain/util": "~4.12.15",
};

function package() {
    const files = fs.readdirSync(rootpath);
    for (const file of files) {
        if (file === "@types") {
            continue;
        }
        const filepath = `${rootpath}/${file}/package.json`;
        const package = JSON.parse(fs.readFileSync(filepath).toString());
        for (const pkg in dependencies) {
            if (package.dependencies && package.dependencies[pkg]) {
                package.dependencies[pkg] = dependencies[pkg];
            }
        }
        fs.writeFileSync(filepath, JSON.stringify(package, null, 2));
    }
}

package();

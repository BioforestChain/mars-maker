// @ts-check
process.env["VERSION"] = "v1.0.9";
process.env["CORE_VERSION"] = "";
process.env["GITHASH"] = "";

const { bootstrap } = require("./build/src");

(async () => {
    try {
        await bootstrap();
    } catch (error) {
        console.log(error);
    }
})();

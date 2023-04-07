// @ts-check
process.env["VERSION"] = "v1.0.9";
process.env["CORE_VERSION"] = "";
process.env["GITHASH"] = "";

const { Server } = require("./build/src");

(async () => {
    try {
        const server = new Server();

        server.runServer();
    } catch (error) {
        console.log(error);
    }
})();

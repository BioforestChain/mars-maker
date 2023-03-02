// @ts-check

const { Server } = require("./build/src");

const ENVIRONMENT_TYPE = {
    DEVELOPMENT: "DEVELOPMENT",
    PRODUCTION: "PRODUCTION",
};
process.env.ENVIRONMENT_TYPE = ENVIRONMENT_TYPE.DEVELOPMENT;

(async () => {
    try {
        const server = new Server();

        server.runServer();
    } catch (error) {
        console.log(error);
    }
})();

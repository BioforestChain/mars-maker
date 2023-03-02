// @ts-check

const { Server } = require("./build/src");

(async () => {
    try {
        const server = new Server();

        server.runServer();
    } catch (error) {
        console.log(error);
    }
})();

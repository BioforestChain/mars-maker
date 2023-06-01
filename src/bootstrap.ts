import { Server } from "./server";

(async () => {
    const server = new Server();
    try {
        server.logger.info(`worker ${process.env["name"]} run with pid ${process.pid}`);
        await server.runServer();
    } catch (error) {
        server.logger.error(error);
    }
})();

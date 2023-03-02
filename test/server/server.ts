import { Server } from "../../src";

(async () => {
    try {
        const config: TransactionMaker.Server.ConfigOptions = {};

        const server = new Server(config);

        server.runServer();
    } catch (error) {
        console.log(error);
    }
})();

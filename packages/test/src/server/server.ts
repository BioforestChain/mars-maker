import { Server } from "@bfmeta/transaction-maker-server";
import { BLOCK_CHAIN_NET_WORK_TYPE } from "@bfmeta/transaction-maker-core";

(async () => {
    try {
        const config: TransactionMaker.Server.ConfigOptions = {
            // port: 8888,
            // chainNodeIps: ["127.0.0.1"],
            // genesisInfoConfig: {
            //     isGenesisBlockProvidedExternally: false,
            //     networkType: BLOCK_CHAIN_NET_WORK_TYPE.TESTNET,
            //     chainName: "bfmetatest",
            //     chainAssetType: "BFMTEST",
            //     blockPerRound: 57,
            //     forgeInterval: 10,
            // },
        };

        const server = new Server(config);

        server.runServer();
    } catch (error) {
        console.log(error);
    }
})();

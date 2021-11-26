import * as path from "path";
import { Sdk } from "@bfchain/pc-sdk";

// const config: BFChainPcSdk.ConfigOptions = {
//     apiConfig: {
//         ip: "127.0.0.1",
//         port: 19003,
//         requestTimeOut: 10000,
//         requestProtocol: "websocket" as any,
//     },
//     transactionServerPort: 9999,
//     transactionConfig: {
//         genesisInfoConfig: {
//             isGenesisBlockProvidedExternally: true,
//             networkType: "testnet" as any,
//             chainAssetType: "BFT",
//             blockPerRound: 57,
//             forgeInterval: 10,
//             genesisBlockRootPath: path.join(process.cwd(), "genesisInfos"),
//         },
//         lang: "en" as any,
//     },
// };

const config: BFChainPcSdk.ConfigOptions = {
    // configRootPath: path.join(process.cwd(), "qq"),
};

const sdk = new Sdk(config);

sdk.runTransactionServer();

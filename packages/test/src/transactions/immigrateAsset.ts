// import { Api } from "@bfmeta/transaction-maker-api";

// async function generateMigrateCertificate(recipientId: string, toChainInfo: BFChainCore.CrossChain.ChainBaseInfo) {
//     const sdk2 = new Sdk({
//         transactionServerPort: 8888,
//         transactionConfig: {
//             genesisInfoConfig: {
//                 isGenesisBlockProvidedExternally: true,
//                 chainAssetType: "FIN",
//                 blockPerRound: 60,
//                 forgeInterval: 9,
//             },
//         },
//     });

//     sdk2.runTransactionServer();

//     let result1 = await sdk2.api.transaction.generateMigrateCertificate({
//         senderSecret: "qqq",
//         recipientId,
//         toChainInfo,
//         assetPrealnum: "10000",
//     });

//     if (!result1.success) {
//         throw result1;
//     }

//     const result2 = await sdk2.api.transaction.fromAuthSignatureMigrateCertificate({
//         authSecret: "www",
//         migrateCertificate: result1.result,
//     });

//     if (!result2.success) {
//         throw result2;
//     }

//     return result2.result;
// }

// (async () => {
//     try {
//         const argv: TransactionMaker.Transaction.EmigrateAssetTransactionParams = {
//             secret: "scan pass carpet coral pumpkin spell present decrease veteran text flower pioneer top speak jaguar wreck ask always hazard good know gift uncle frost",
//             fee: "1000",
//             applyBlockHeight: 50,
//             remark: { message: "create immigrateAsset" },
//             accountLastRoundInfo: {
//                 txCount: 0,
//                 equity: "8888888888888",
//             },
//             recipientId: "cLrUCNAWPyPH96bqqC3JQXZ3CtsvvXmNj1",
//             migrateCertificate: {} as any,
//         };

//         const genesisSecret =
//             "nose install correct solar side latin focus churn mask nominee differ mosquito claw awake glass rare pond clump draw rent fiction muscle razor bacon";

//         const fromMagic = "6N6TI";

//         const migrateCertificate = await generateMigrateCertificate(argv.recipientId, {
//             magic: fromMagic,
//             chainName: "bfchain",
//             genesisBlockSignature:
//                 "1d0fa1a66fafbf02b29662d95deb0bd7ec5a801e92c6bbdb50d5bbfac14e7bfec761ce5d9293789f08649e064e1ec687a0712c84b9e298ba4ef032513a3a2f08",
//         });

//         const api = new Api();

//         const result2 = await api.transaction.toAuthSignatureMigrateCertificate({
//             authSecret: genesisSecret,
//             migrateCertificate,
//         });

//         if (!result2.success) {
//             throw result2;
//         }

//         console.log(result2.result);

//         argv.migrateCertificate = result2.result;
//         argv.fromMagic = "PSSS5";

//         const result = await api.transaction.generateImmigrateAsset(argv);

//         console.log(result);
//     } catch (e: any) {
//         console.log(e);
//     }
// })();

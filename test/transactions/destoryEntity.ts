import { BFMetaTrMaker } from "@bfmeta/transaction-maker-api";

(async () => {
    try {
        const argv: TransactionMaker.Transaction.DestoryEntityTransactionParams = {
            secret: "boost scorpion peanut output undo useful trash burden custom party click offer leisure magnet obscure drop gather blind predict walk since strike thumb minimum",
            fee: "1000",
            applyBlockHeight: 10,
            remark: { message: "create destoryEntity" },
            recipientId: "cLrUCNAWPyPH96bqqC3JQXZ3CtsvvXmNj1",
            accountLastRoundInfo: {
                txCount: 0,
                equity: "8888888888888",
            },
            entityInfo: {
                transactionSignature:
                    "20cf789847f6b06652b55b475ab77ffee989c812b5ed89b26048fdd80409c5f8e01630408858f7c530f54f2bb9df1dc7a47c5faef77ce6f84cd52e99c2f44605",
                entityId: "skyrim_dragonborn",
                entityFactoryApplicant: "cCET2Sxt2LPDhx44wxJ9uhkpviKNrSacvE",
                entityFactoryPossessor: "cLrUCNAWPyPH96bqqC3JQXZ3CtsvvXmNj1",
                entityFactory: {
                    factoryId: "skyrim",
                    entityPrealnum: "1",
                    entityFrozenAssetPrealnum: "10000",
                    purchaseAssetPrealnum: "10000",
                },
            },
        };

        const bfmetaTrMaker = new BFMetaTrMaker();

        const result = await bfmetaTrMaker.transaction.generateDestoryEntity(argv);

        console.log(result);
    } catch (e: any) {
        console.log(e);
    }
})();

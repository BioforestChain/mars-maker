import { Sdk } from "@bfchain/pc-sdk";

(async () => {
    try {
        const argv: BFChainPcSdk.Transaction.IssueEntityTransactionParams = {
            secret: "upgrade jump sugar congress glare expect other firm morning donate motor pride minute frame amount chimney wood gallery twelve barely dose blame convince enhance",
            fee: "1000",
            applyBlockHeight: 10,
            remark: { message: "create issueEntity" },
            recipientId: "cLrUCNAWPyPH96bqqC3JQXZ3CtsvvXmNj1",
            accountLastRoundInfo: {
                txCount: 0,
                equity: "8888888888888",
            },
            entityInfo: {
                entityId: "dragonborn",
                entityFactoryPossessor: "cLrUCNAWPyPH96bqqC3JQXZ3CtsvvXmNj1",
                entityFactory: {
                    factoryId: "skyrim",
                    entityPrealnum: "1",
                    entityFrozenAssetPrealnum: "10000",
                    purchaseAssetPrealnum: "10000",
                },
            },
        };

        const sdk = new Sdk();

        const result = await sdk.api.transaction.sendIssueEntity(argv);

        console.log(result);
    } catch (e) {
        console.log(e);
    }
})();

import { Api } from "@bfmeta/transaction-maker-api";

(async () => {
    try {
        const argv: TransactionMaker.Transaction.IssueEntityTransactionParams = {
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

        const api = new Api();

        const result = await api.transaction.generateIssueEntity(argv);

        console.log(result);
    } catch (e: any) {
        console.log(e);
    }
})();

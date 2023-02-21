import { Sdk } from "@bfchain/pc-sdk";

(async () => {
    try {
        const argv: BFMetaPcSdk.Transaction.IssueEntityFactoryTransactionParams = {
            secret: "scan pass carpet coral pumpkin spell present decrease veteran text flower pioneer top speak jaguar wreck ask always hazard good know gift uncle frost",
            fee: "1000",
            applyBlockHeight: 10,
            remark: { message: "create issueEntityFactory" },
            recipientId: "cLrUCNAWPyPH96bqqC3JQXZ3CtsvvXmNj1",
            accountLastRoundInfo: {
                txCount: 0,
                equity: "8888888888888",
            },
            factoryInfo: {
                factoryId: "skyrim",
                entityPrealnum: "1",
                entityFrozenAssetPrealnum: "10000",
                purchaseAssetPrealnum: "10000",
            },
            numberOfEffectiveBlocks: 100,
        };

        const sdk = new Sdk();

        const result = await sdk.api.transaction.sendIssueEntityFactory(argv);

        console.log(result);
    } catch (e: any) {
        console.log(e);
    }
})();

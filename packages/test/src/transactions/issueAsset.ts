import { Api } from "@bfmeta/transaction-maker-api";

(async () => {
    try {
        const argv: TransactionMaker.Transaction.IssueAssetTransactionParams = {
            secret: "very found ice guilt what inform arm relief reopen talent traffic drill flash inner donate salad vote scout ghost desk alter later cycle suffer",
            fee: "1000",
            applyBlockHeight: 10,
            remark: { message: "create issueAsset" },
            recipientId: "cLrUCNAWPyPH96bqqC3JQXZ3CtsvvXmNj1",
            accountLastRoundInfo: {
                txCount: 0,
                equity: "8888888888888",
            },
            assetInfo: {
                assetType: "HYLQ",
                expectedIssuedAssets: "99999",
            },
        };

        const api = new Api();

        const result = await api.transaction.generateIssueAsset(argv);

        console.log(result);
    } catch (e: any) {
        console.log(e);
    }
})();

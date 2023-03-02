import { BFMetaTrMaker } from "@bfmeta/transaction-maker-api";

(async () => {
    try {
        const argv: TransactionMaker.Transaction.TransferAssetTransactionParams = {
            secret: "nose install correct solar side latin focus churn mask nominee differ mosquito claw awake glass rare pond clump draw rent fiction muscle razor bacon",
            // secondSecretInfo: {
            //     useOld: false,
            //     secondSecret: "i am the future",
            // },
            fee: "1000",
            applyBlockHeight: 1,
            remark: { message: "create transferAsset" },
            accountLastRoundInfo: {
                txCount: 0,
                equity: "8888888888888",
            },
            assetInfo: {
                assetType: "BFT",
                amount: "10000",
            },
            recipientId: "cCET2Sxt2LPDhx44wxJ9uhkpviKNrSacvE",
        };

        const bfmetaTrMaker = new BFMetaTrMaker();

        const result = await bfmetaTrMaker.transaction.generateTransferAsset(argv);

        if (result.success) {
            console.log(result.result.asset.transferAsset);
        }
        // console.log(result);
    } catch (e: any) {
        console.log(e);
    }
})();

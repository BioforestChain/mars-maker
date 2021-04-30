import type {} from "@bfchain/coretools";
import { Sdk } from "@bfchain/pc-sdk-core";

(async () => {
    try {
        const argv: BFChainPcSdk.Transaction.TransferAssetTransactionParams = {
            secret: "nose install correct solar side latin focus churn mask nominee differ mosquito claw awake glass rare pond clump draw rent fiction muscle razor bacon",
            fee: "1000",
            applyBlockHeight: 1,
            remark: { message: "create acceptVote" },
            accountLastRoundInfo: {
                txCount: 0,
                equity: "8888888888888",
            },
            assetType: "BFT",
            amount: "10000",
            recipientId: "cCET2Sxt2LPDhx44wxJ9uhkpviKNrSacvE",
        };

        const sdk = new Sdk();

        const result = await sdk.api.transaction.sendTransferAsset(argv);

        console.log(result);

        const xx = await sdk.api.basic.getLastBlock();

        console.log(xx);
    } catch (e) {
        console.log(e);
    }
})();

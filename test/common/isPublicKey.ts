import { BFMetaTrMaker } from "@bfmeta/transaction-maker-api";

(async () => {
    try {
        const argv: TransactionMaker.Common.VerifyPublicKeyParams = {
            publicKey: "66147aafdeeb0f6f1fa6019fc8e9218b834a658712fbee756db9330b7ddc0d40",
        };

        const bfmetaTrMaker = new BFMetaTrMaker();

        const result = await bfmetaTrMaker.common.verifyPublicKey(argv);

        console.log(result);
    } catch (e: any) {
        console.log(e);
    }
})();

import { BFMetaTrMaker } from "@bfmeta/transaction-maker-api";

(async () => {
    try {
        const argv: TransactionMaker.Common.GenerateAddressBySecretParams = {
            secret: "qqq",
        };

        const bfmetaTrMaker = new BFMetaTrMaker();

        const result = await bfmetaTrMaker.common.generateAddressBySecret(argv);

        console.log(result);
    } catch (e: any) {
        console.log(e);
    }
})();

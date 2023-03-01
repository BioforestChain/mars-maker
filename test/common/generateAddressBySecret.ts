import { Api } from "@bfmeta/transaction-maker-api";

(async () => {
    try {
        const argv: TransactionMaker.Common.GenerateAddressBySecretParams = {
            secret: "qqq",
        };

        const api = new Api();

        const result = await api.common.generateAddressBySecret(argv);

        console.log(result);
    } catch (e: any) {
        console.log(e);
    }
})();

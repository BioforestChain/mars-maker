import { Api } from "@bfmeta/transaction-maker-api";

(async () => {
    try {
        const argv: TransactionMaker.Common.GenerateAccountParams = {
            secret: "qqq",
            secondSecret: "www",
        };

        const api = new Api();

        const result = await api.common.generateAccount(argv);

        console.log(result);
    } catch (e: any) {
        console.log(e);
    }
})();

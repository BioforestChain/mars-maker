import { Sdk } from "@bfchain/pc-sdk";

(async () => {
    try {
        const argv: BFMetaPcSdk.Common.GenerateAccountParams = {
            secret: "qqq",
            secondSecret: "www",
        };

        const sdk = new Sdk();

        const result = await sdk.api.transaction.generateAccount(argv);

        console.log(result);
    } catch (e) {
        console.log(e);
    }
})();

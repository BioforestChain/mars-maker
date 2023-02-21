import { Sdk } from "@bfchain/pc-sdk";

(async () => {
    try {
        const argv: BFMetaPcSdk.Common.GenerateAddressBySecretParams = {
            secret: "qqq",
        };

        const sdk = new Sdk();

        const result = await sdk.api.transaction.generateAddressBySecret(argv);

        console.log(result);
    } catch (e: any) {
        console.log(e);
    }
})();

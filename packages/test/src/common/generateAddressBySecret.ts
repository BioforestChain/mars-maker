import { Sdk } from "@bfchain/pc-sdk";

(async () => {
    try {
        const argv: BFChainPcSdk.Common.GenerateAddressBySecretParams = {
            secret: "qqq",
        };

        const sdk = new Sdk();

        const result = await sdk.api.transaction.generateAddressBySecret(argv);

        console.log(result);
    } catch (e) {
        console.log(e);
    }
})();

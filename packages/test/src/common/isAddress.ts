import { Sdk } from "@bfchain/pc-sdk";

(async () => {
    try {
        const argv: BFMetaPcSdk.Common.VerifyAddressParams = {
            address: "cEAXDkaEJgWKMM61KYz2dYU1RfuxbB8Ma",
        };

        const sdk = new Sdk();

        const result = await sdk.api.transaction.verifyAddress(argv);

        console.log(result);
    } catch (e) {
        console.log(e);
    }
})();

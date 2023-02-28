import { Api } from "@bfmeta/transaction-maker-api";

(async () => {
    try {
        const argv: TransactionMaker.Common.VerifyAddressParams = {
            address: "cEAXDkaEJgWKMM61KYz2dYU1RfuxbB8Ma",
        };

        const api = new Api();

        const result = await api.common.verifyAddress(argv);

        console.log(result);
    } catch (e: any) {
        console.log(e);
    }
})();

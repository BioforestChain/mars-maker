import { BFMetaTrMaker } from "@bfmeta/transaction-maker-api";

(async () => {
    try {
        const argv: TransactionMaker.Common.VerifyAddressParams = {
            address: "cEAXDkaEJgWKMM61KYz2dYU1RfuxbB8Ma",
        };

        const bfmetaTrMaker = new BFMetaTrMaker();

        const result = await bfmetaTrMaker.common.verifyAddress(argv);

        console.log(result);
    } catch (e: any) {
        console.log(e);
    }
})();

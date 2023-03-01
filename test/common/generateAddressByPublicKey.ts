import { Api } from "@bfmeta/transaction-maker-api";

(async () => {
    try {
        const argv: TransactionMaker.Common.GenerateAddressByPublicKeyParams = {
            publicKey: "3dce30d2dfa426e3b749e2fc1915322cac7c95398e81e0e0dbfdc9ffd3bd7d0e",
        };

        const api = new Api();

        const result = await api.common.generateAddressByPublicKey(argv);

        console.log(result);
    } catch (e: any) {
        console.log(e);
    }
})();

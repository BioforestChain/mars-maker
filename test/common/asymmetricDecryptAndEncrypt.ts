import { Api } from "@bfmeta/transaction-maker-api";

(async () => {
    try {
        const api = new Api();

        const k1 = await api.common.generateKeypair({ secret: "qqq" });
        const k2 = await api.common.generateKeypair({ secret: "www" });

        if (!k1.success) {
            throw new Error("QAQ");
        }

        if (!k2.success) {
            throw new Error("QAQ");
        }

        const argv1: TransactionMaker.Common.AsymmetricEncryptParams = {
            msg: Buffer.from("QwreT").toString("hex"),
            encryptSK: k1.result.keypair.secretKey,
            decryptPK: k2.result.keypair.publicKey,
        };

        const result1 = await api.common.asymmetricEncrypt(argv1);

        if (!result1.success) {
            throw new Error("QAQ");
        }

        const argv2: TransactionMaker.Common.AsymmetricDecryptParams = {
            encryptedMessage: result1.result.encryptedMessage,
            encryptPK: k1.result.keypair.publicKey,
            decryptSK: k2.result.keypair.secretKey,
            nonce: result1.result.nonce,
        };

        const result2 = await api.common.asymmetricDecrypt(argv2);

        if (!result2.success) {
            throw new Error("QAQ");
        }
        if (typeof result2.result === "boolean") {
            throw new Error("QAQ");
        }

        console.log(Buffer.from(result2.result, "hex").toString());
    } catch (e: any) {
        console.log(e);
    }
})();

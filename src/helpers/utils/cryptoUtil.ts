import * as crypto from "crypto";
import { parseHexToArrayBuffer } from "@bfchain/util";
import { keypairHelper } from "@bfchain/core-crypto";

class CryptoUtil {
    md5Crypto(data: string) {
        const hash = crypto.createHash("md5");
        hash.update(data);
        return hash.digest("hex");
    }

    encryptPassword(password: string): string {
        return crypto
            .createHash("sha256")
            .update(password)
            .digest("hex");
    }

    /**
     * 非对称签名
     * @param message
     * @param organization
     */
    detachedSign(message: string, address: string, publicKey: string, secretKey: string) {
        const hash = new Uint8Array(Buffer.from(message, "base64"));
        const signBuffer = keypairHelper.detached_sign(hash, parseHexToArrayBuffer(secretKey));
        const signature = signBuffer.toString("hex");
        return JSON.stringify({ address, publicKey, signature });
    }

    /**
     * 非对称验签
     * @param message
     * @param publicKey
     * @param signature
     */
    detachedVerify(message: string, publicKey: string, signature: string) {
        const hash = new Uint8Array(Buffer.from(message, "base64"));
        const verify = keypairHelper.detached_verify(hash, parseHexToArrayBuffer(signature), parseHexToArrayBuffer(publicKey));
        return verify;
    }
}

export const cryptoUtil = new CryptoUtil();

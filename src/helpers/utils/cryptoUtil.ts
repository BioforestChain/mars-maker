import * as crypto from "crypto";

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
}

export const cryptoUtil = new CryptoUtil();

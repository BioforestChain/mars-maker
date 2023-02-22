import { Injectable, getHexFromArrayBuffer, parseHexToArrayBuffer } from "@bfchain/util";
import { COMMON_API_PATH } from "@bfmeta/transaction-maker-core";
import { CommonFactory } from "./_commonFactory";

@Injectable()
export class AsymmetricDecryptFactory extends CommonFactory<TransactionMaker.Common.AsymmetricDecrypt> {
    readonly EXEC_API_PATH = COMMON_API_PATH.ASYMMETRIC_DECRYPT;

    async exec(request: TransactionMaker.Common.AsymmetricDecryptParams) {
        const result = await this.bfchainCore.asymmetricHelper.asymmetricDecrypt(
            parseHexToArrayBuffer(request.encryptedMessage),
            parseHexToArrayBuffer(request.encryptPK),
            parseHexToArrayBuffer(request.decryptSK),
            parseHexToArrayBuffer(request.nonce)
        );

        if (typeof result === "boolean") {
            return result;
        }

        return getHexFromArrayBuffer(result);
    }
}

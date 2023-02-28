import { Injectable, getHexFromArrayBuffer, parseHexToArrayBuffer } from "@bfchain/util";
import { COMMON_API_PATH } from "@bfmeta/transaction-maker-core";
import { CommonFactory } from "./_commonFactory";

@Injectable()
export class AsymmetricEncryptFactory extends CommonFactory<TransactionMaker.Common.AsymmetricEncrypt> {
    readonly EXEC_API_PATH = COMMON_API_PATH.ASYMMETRIC_ENCRYPT;

    async exec(request: TransactionMaker.Common.AsymmetricEncryptParams) {
        const result = await this.bfchainCore.asymmetricHelper.asymmetricEncrypt(
            parseHexToArrayBuffer(request.msg),
            parseHexToArrayBuffer(request.decryptPK),
            parseHexToArrayBuffer(request.encryptSK)
        );

        return {
            nonce: getHexFromArrayBuffer(result.nonce),
            encryptedMessage: getHexFromArrayBuffer(result.encryptedMessage),
        };
    }
}

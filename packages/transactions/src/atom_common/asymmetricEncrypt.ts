import { Injectable, getHexFromArrayBuffer, parseHexToArrayBuffer } from "@bfchain/util";
import { COMMON_API_PATH } from "@bfchain/pc-sdk-api-constants";
import { CommonFactory } from "./_commonFactory";

@Injectable()
export class AsymmetricEncryptFactory extends CommonFactory<BFChainPcSdk.Common.AsymmetricEncrypt> {
    readonly EXEC_API_PATH = COMMON_API_PATH.ASYMMETRIC_ENCRYPT;

    async exec(request: BFChainPcSdk.Common.AsymmetricEncryptParams) {
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

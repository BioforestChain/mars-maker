import { Injectable, getHexFromArrayBuffer, parseHexToArrayBuffer } from "@bfchain/util";
import { COMMON_API_PATH } from "@bfchain/pc-sdk-api-constants";
import { CommonFactory } from "./_commonFactory";

@Injectable()
export class AsymmetricDecryptFactory extends CommonFactory<BFChainPcSdk.Common.AsymmetricDecrypt> {
    readonly EXEC_API_PATH = COMMON_API_PATH.ASYMMETRIC_DECRYPT;

    async exec(request: BFChainPcSdk.Common.AsymmetricDecryptParams) {
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

import { Injectable, getHexFromArrayBuffer } from "@bfchain/util";
import { COMMON_API_PATH } from "@bfchain/pc-sdk-api-constants";
import { CommonFactory } from "./_commonFactory";

@Injectable()
export class AsymmetricDecryptFactory extends CommonFactory<BFChainPcSdk.Common.AsymmetricDecrypt> {
    readonly EXEC_API_PATH = COMMON_API_PATH.GENERATE_ACCOUNT;

    async exec(request: BFChainPcSdk.Common.AsymmetricDecryptParams) {
        return this.bfchainCore.asymmetricHelper.asymmetricDecrypt(request.encryptedMessage, request.encryptPK, request.decryptSK, request.nonce);
    }
}

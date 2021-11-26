import { Injectable, getHexFromArrayBuffer } from "@bfchain/util";
import { COMMON_API_PATH } from "@bfchain/pc-sdk-api-constants";
import { CommonFactory } from "./_commonFactory";

@Injectable()
export class AsymmetricEncryptFactory extends CommonFactory<BFChainPcSdk.Common.AsymmetricEncrypt> {
    readonly EXEC_API_PATH = COMMON_API_PATH.ASYMMETRIC_ENCRYPT;

    async exec(request: BFChainPcSdk.Common.AsymmetricEncryptParams) {
        return this.bfchainCore.asymmetricHelper.asymmetricEncrypt(request.msg, request.decryptPK, request.encryptSK);
    }
}

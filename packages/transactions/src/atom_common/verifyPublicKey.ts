import { Injectable } from "@bfchain/util";
import { COMMON_API_PATH } from "@bfchain/pc-sdk-api-constants";
import { CommonFactory } from "./_commonFactory";

@Injectable()
export class VerifyPublicKeyFactory extends CommonFactory<boolean> {
    readonly EXEC_API_PATH = COMMON_API_PATH.VERIFY_PUBLICKEY;

    async exec(request: BFChainPcSdk.Common.VerifyPublicKeyParams) {
        const isPublicKey = this.bfchainCore.baseHelper.isValidPublicKey(request.publicKey);
        return isPublicKey;
    }
}

import { CommonApi } from "./_commonApi";
import { COMMON_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class AsymmetricDecryptApi extends CommonApi<BFChainPcSdk.Common.AsymmetricDecrypt> {
    readonly EXEC_API_PATH = COMMON_API_PATH.ASYMMETRIC_DECRYPT;

    async sendPostRequest(argv: BFChainPcSdk.Common.AsymmetricDecryptParams) {
        return super.sendPostRequest(argv);
    }
}

import { CommonApi } from "./_commonApi";
import { COMMON_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class AsymmetricEncryptApi extends CommonApi<BFMetaPcSdk.Common.AsymmetricEncrypt> {
    readonly EXEC_API_PATH = COMMON_API_PATH.ASYMMETRIC_ENCRYPT;

    async sendPostRequest(argv: BFMetaPcSdk.Common.AsymmetricEncryptParams) {
        return super.sendPostRequest(argv);
    }
}

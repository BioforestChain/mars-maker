import { CommonApi } from "./_commonApi";
import { COMMON_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class GenerateCiphertextSignatureApi extends CommonApi<string> {
    readonly EXEC_API_PATH = COMMON_API_PATH.GENERATE_CIPHERTEXT_SIGNATURE;

    async sendPostRequest(argv: BFChainPcSdk.Common.GenerateCiphertextSignatureParams) {
        return super.sendPostRequest(argv);
    }
}

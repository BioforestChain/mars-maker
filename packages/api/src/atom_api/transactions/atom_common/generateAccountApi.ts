import { CommonApi } from "./_commonApi";
import { COMMON_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class GenerateAccountApi extends CommonApi<BFChainPcSdk.Common.AccountInfo> {
    readonly EXEC_API_PATH = COMMON_API_PATH.GENERATE_ACCOUNT;

    async sendPostRequest(argv: BFChainPcSdk.Common.GenerateAccountParams) {
        return super.sendPostRequest(argv);
    }
}

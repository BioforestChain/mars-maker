import { CommonApi } from "./_commonApi";
import { COMMON_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class GenerateAccountApi extends CommonApi<BFMetaPcSdk.Common.AccountInfo> {
    readonly EXEC_API_PATH = COMMON_API_PATH.GENERATE_ACCOUNT;

    async sendPostRequest(argv: BFMetaPcSdk.Common.GenerateAccountParams) {
        return super.sendPostRequest(argv);
    }
}

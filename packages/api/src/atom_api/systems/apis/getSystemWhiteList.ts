import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class GetSystemWhiteListApi extends SystemPostApi<BFChainPcSdk.System.GetSystemWhiteListResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_GET_SYSTEM_WHITELIST;

    async sendPostRequest(argv: BFChainPcSdk.System.GetSystemWhiteListParams) {
        return await super.sendPostRequest(argv);
    }
}

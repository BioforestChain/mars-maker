import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class SetSystemWhiteListApi extends SystemPostApi<BFChainPcSdk.System.SetSystemWhiteListResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_SET_SYSTEM_WHITELIST;

    async sendPostRequest(argv: BFChainPcSdk.System.SetSystemWhiteListParams) {
        return await super.sendPostRequest(argv);
    }
}

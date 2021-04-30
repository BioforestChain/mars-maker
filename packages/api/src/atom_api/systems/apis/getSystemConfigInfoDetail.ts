import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class GetSystemConfigInfoDetailApi extends SystemPostApi<BFChainPcSdk.System.GetSystemConfigInfoDetailResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_GET_SYSTEM_CONFIG_INFO_DETAIL;

    async sendPostRequest(argv: BFChainPcSdk.System.GetSystemConfigInfoDetailParams) {
        return await super.sendPostRequest(argv);
    }
}

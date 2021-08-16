import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GetSystemWhiteListApi extends SystemPostApi<BFChainPcSdk.System.GetSystemWhiteListResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_GET_SYSTEM_WHITELIST;
    sendPostRequest(
        argv: BFChainPcSdk.System.GetSystemWhiteListParams
    ): Promise<BFChainPcSdk.System.SystemApiReturn<BFChainPcSdk.System.GetSystemWhiteListResult>>;
}

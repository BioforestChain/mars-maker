import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GetSystemWhiteListApi extends SystemPostApi<BFMetaPcSdk.System.GetSystemWhiteListResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_GET_SYSTEM_WHITELIST;
    sendPostRequest(argv: BFMetaPcSdk.System.GetSystemWhiteListParams): Promise<BFMetaPcSdk.System.SystemApiReturn<BFMetaPcSdk.System.GetSystemWhiteListResult>>;
}

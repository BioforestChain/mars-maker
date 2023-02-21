import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class SetSystemWhiteListApi extends SystemPostApi<BFMetaPcSdk.System.SetSystemWhiteListResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_SET_SYSTEM_WHITELIST;
    sendPostRequest(argv: BFMetaPcSdk.System.SetSystemWhiteListParams): Promise<BFMetaPcSdk.System.SystemApiReturn<BFMetaPcSdk.System.SetSystemWhiteListResult>>;
}

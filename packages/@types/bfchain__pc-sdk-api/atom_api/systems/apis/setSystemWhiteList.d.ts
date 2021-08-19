import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class SetSystemWhiteListApi extends SystemPostApi<BFChainPcSdk.System.SetSystemWhiteListResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_SET_SYSTEM_WHITELIST;
    sendPostRequest(argv: BFChainPcSdk.System.SetSystemWhiteListParams): Promise<BFChainPcSdk.System.SystemApiReturn<BFChainPcSdk.System.SetSystemWhiteListResult>>;
}

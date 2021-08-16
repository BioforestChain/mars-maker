import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GetSystemLoggerListApi extends SystemPostApi<BFChainPcSdk.System.GetSystemLoggerListResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_GET_SYSTEM_LOGGER_LIST;
    sendPostRequest(
        argv: BFChainPcSdk.System.GetSystemLoggerListParams
    ): Promise<BFChainPcSdk.System.SystemApiReturn<BFChainPcSdk.System.GetSystemLoggerListResult>>;
}

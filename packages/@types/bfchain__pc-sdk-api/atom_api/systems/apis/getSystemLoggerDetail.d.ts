import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GetSystemLoggerDetailApi extends SystemPostApi<BFMetaPcSdk.System.GetSystemLoggerDetailResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_GET_SYSTEM_LOGGER_DETAIL;
    sendPostRequest(argv: BFMetaPcSdk.System.GetSystemLoggerDetailParams): Promise<BFMetaPcSdk.System.SystemApiReturn<BFMetaPcSdk.System.GetSystemLoggerDetailResult>>;
}

import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GetSystemLoggerListApi extends SystemPostApi<BFMetaPcSdk.System.GetSystemLoggerListResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_GET_SYSTEM_LOGGER_LIST;
    sendPostRequest(argv: BFMetaPcSdk.System.GetSystemLoggerListParams): Promise<BFMetaPcSdk.System.SystemApiReturn<BFMetaPcSdk.System.GetSystemLoggerListResult>>;
}

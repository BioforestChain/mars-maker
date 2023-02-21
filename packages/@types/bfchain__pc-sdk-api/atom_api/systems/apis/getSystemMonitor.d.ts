import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GetSystemMonitorApi extends SystemPostApi<BFMetaPcSdk.System.GetSystemMonitorResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_GET_SYSTEM_MONITOR;
    sendPostRequest(argv: BFMetaPcSdk.System.GetSystemMonitorParams): Promise<BFMetaPcSdk.System.SystemApiReturn<BFMetaPcSdk.System.GetSystemMonitorResult>>;
}

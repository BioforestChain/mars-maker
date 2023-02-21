import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GetProcessMemoryApi extends SystemPostApi<BFMetaPcSdk.System.GetProcessMemoryResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_GET_PROCESS_MEMORY;
    sendPostRequest(argv: BFMetaPcSdk.System.GetProcessMemoryParams): Promise<BFMetaPcSdk.System.SystemApiReturn<BFMetaPcSdk.System.GetProcessMemoryResult>>;
}

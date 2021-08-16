import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GetProcessMemoryApi extends SystemPostApi<BFChainPcSdk.System.GetProcessMemoryResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_GET_PROCESS_MEMORY;
    sendPostRequest(argv: BFChainPcSdk.System.GetProcessMemoryParams): Promise<BFChainPcSdk.System.SystemApiReturn<BFChainPcSdk.System.GetProcessMemoryResult>>;
}

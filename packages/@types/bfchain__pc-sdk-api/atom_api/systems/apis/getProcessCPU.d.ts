import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GetProcessCPUApi extends SystemPostApi<BFMetaPcSdk.System.GetProcessCPUResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_GET_PROCESS_CPU;
    sendPostRequest(argv: BFMetaPcSdk.System.GetProcessCPUParams): Promise<BFMetaPcSdk.System.SystemApiReturn<BFMetaPcSdk.System.GetProcessCPUResult>>;
}

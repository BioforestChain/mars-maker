import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class SystemProcessApi extends SystemPostApi<BFMetaPcSdk.System.SystemProcessResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_PROCESS;
    sendPostRequest(argv: BFMetaPcSdk.System.SystemProcessParams): Promise<BFMetaPcSdk.System.SystemApiReturn<BFMetaPcSdk.System.SystemProcessResult>>;
}

import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class SystemStatusApi extends SystemPostApi<BFMetaPcSdk.System.SystemStatusResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_STATUS;
    sendPostRequest(argv: BFMetaPcSdk.System.SystemStatusParams): Promise<BFMetaPcSdk.System.SystemApiReturn<BFMetaPcSdk.System.SystemStatusResult>>;
}

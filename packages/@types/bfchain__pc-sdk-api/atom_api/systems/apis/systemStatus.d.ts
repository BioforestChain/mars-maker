import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class SystemStatusApi extends SystemPostApi<BFChainPcSdk.System.SystemStatusResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_STATUS;
    sendPostRequest(argv: BFChainPcSdk.System.SystemStatusParams): Promise<BFChainPcSdk.System.SystemApiReturn<BFChainPcSdk.System.SystemStatusResult>>;
}

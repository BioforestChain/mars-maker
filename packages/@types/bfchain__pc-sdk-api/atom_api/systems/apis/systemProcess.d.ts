import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class SystemProcessApi extends SystemPostApi<BFChainPcSdk.System.SystemProcessResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_PROCESS;
    sendPostRequest(argv: BFChainPcSdk.System.SystemProcessParams): Promise<BFChainPcSdk.System.SystemApiReturn<BFChainPcSdk.System.SystemProcessResult>>;
}

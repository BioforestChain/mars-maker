import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class SafetyCloseApi extends SystemPostApi<BFChainPcSdk.System.SafetyCloseResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_SAFETY_CLOSE;
    sendPostRequest(argv: BFChainPcSdk.System.SafetyCloseParams): Promise<BFChainPcSdk.System.SystemApiReturn<BFChainPcSdk.System.SafetyCloseResult>>;
}

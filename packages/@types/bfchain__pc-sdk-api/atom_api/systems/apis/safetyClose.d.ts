import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class SafetyCloseApi extends SystemPostApi<BFMetaPcSdk.System.SafetyCloseResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_SAFETY_CLOSE;
    sendPostRequest(argv: BFMetaPcSdk.System.SafetyCloseParams): Promise<BFMetaPcSdk.System.SystemApiReturn<BFMetaPcSdk.System.SafetyCloseResult>>;
}

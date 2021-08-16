import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GetRuntimeStateApi extends SystemPostApi<BFChainPcSdk.System.GetRuntimeStateResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_GET_RUNTIME_STATE;
    sendPostRequest(argv: BFChainPcSdk.System.GetRuntimeStateParams): Promise<BFChainPcSdk.System.SystemApiReturn<BFChainPcSdk.System.GetRuntimeStateResult>>;
}

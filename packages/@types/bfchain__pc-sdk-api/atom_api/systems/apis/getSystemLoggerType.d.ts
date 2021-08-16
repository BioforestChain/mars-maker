import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GetSystemLoggerTypeApi extends SystemPostApi<BFChainPcSdk.System.GetSystemLoggerTypeResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_GET_SYSTEM_LOGGER_TYPE;
    sendPostRequest(
        argv: BFChainPcSdk.System.GetSystemLoggerTypeParams
    ): Promise<BFChainPcSdk.System.SystemApiReturn<BFChainPcSdk.System.GetSystemLoggerTypeResult>>;
}

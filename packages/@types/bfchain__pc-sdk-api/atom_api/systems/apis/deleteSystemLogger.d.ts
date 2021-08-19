import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class DeleteSystemLoggerApi extends SystemPostApi<BFChainPcSdk.System.DeleteSystemLoggerResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_DELETE_SYSTEM_LOGGER;
    sendPostRequest(argv: BFChainPcSdk.System.DeleteSystemLoggerParams): Promise<BFChainPcSdk.System.SystemApiReturn<BFChainPcSdk.System.DeleteSystemLoggerResult>>;
}

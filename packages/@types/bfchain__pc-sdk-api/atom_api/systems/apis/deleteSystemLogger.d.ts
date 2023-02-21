import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class DeleteSystemLoggerApi extends SystemPostApi<BFMetaPcSdk.System.DeleteSystemLoggerResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_DELETE_SYSTEM_LOGGER;
    sendPostRequest(argv: BFMetaPcSdk.System.DeleteSystemLoggerParams): Promise<BFMetaPcSdk.System.SystemApiReturn<BFMetaPcSdk.System.DeleteSystemLoggerResult>>;
}

import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class DeleteSystemWhiteListApi extends SystemPostApi<BFMetaPcSdk.System.DeleteSystemWhiteListResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_DELETE_SYSTEM_WHITELIST;
    sendPostRequest(argv: BFMetaPcSdk.System.DeleteSystemWhiteListParams): Promise<BFMetaPcSdk.System.SystemApiReturn<BFMetaPcSdk.System.DeleteSystemWhiteListResult>>;
}

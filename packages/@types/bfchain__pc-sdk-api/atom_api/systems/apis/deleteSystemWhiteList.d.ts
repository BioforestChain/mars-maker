import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class DeleteSystemWhiteListApi extends SystemPostApi<BFChainPcSdk.System.DeleteSystemWhiteListResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_DELETE_SYSTEM_WHITELIST;
    sendPostRequest(argv: BFChainPcSdk.System.DeleteSystemWhiteListParams): Promise<BFChainPcSdk.System.SystemApiReturn<BFChainPcSdk.System.DeleteSystemWhiteListResult>>;
}

import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class DeleteSystemAdminApi extends SystemPostApi<BFChainPcSdk.System.DeleteSystemAdminResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_DELETE_SYSTEM_ADMIN;
    sendPostRequest(
        argv: BFChainPcSdk.System.DeleteSystemAdminParams
    ): Promise<BFChainPcSdk.System.SystemApiReturn<BFChainPcSdk.System.DeleteSystemAdminResult>>;
}

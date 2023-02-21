import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class DeleteSystemAdminApi extends SystemPostApi<BFMetaPcSdk.System.DeleteSystemAdminResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_DELETE_SYSTEM_ADMIN;
    sendPostRequest(argv: BFMetaPcSdk.System.DeleteSystemAdminParams): Promise<BFMetaPcSdk.System.SystemApiReturn<BFMetaPcSdk.System.DeleteSystemAdminResult>>;
}

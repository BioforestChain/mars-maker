import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class AddSystemAdminApi extends SystemPostApi<BFMetaPcSdk.System.AddSystemAdminResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_ADD_SYSTEM_ADMIN;
    sendPostRequest(argv: BFMetaPcSdk.System.AddSystemAdminParams): Promise<BFMetaPcSdk.System.SystemApiReturn<BFMetaPcSdk.System.AddSystemAdminResult>>;
}

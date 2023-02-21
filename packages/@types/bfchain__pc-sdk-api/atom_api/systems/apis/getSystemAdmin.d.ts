import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GetSystemAdminApi extends SystemPostApi<BFMetaPcSdk.System.GetSystemAdminResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_GET_SYSTEM_ADMIN;
    sendPostRequest(argv: BFMetaPcSdk.System.GetSystemAdminParams): Promise<BFMetaPcSdk.System.SystemApiReturn<BFMetaPcSdk.System.GetSystemAdminResult>>;
}

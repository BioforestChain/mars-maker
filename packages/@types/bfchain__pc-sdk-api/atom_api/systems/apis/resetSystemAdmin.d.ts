import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class ResetSystemAdminApi extends SystemPostApi<BFMetaPcSdk.System.ResetSystemAdminResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_RESET_SYSTEM_ADMIN;
    sendPostRequest(argv: BFMetaPcSdk.System.ResetSystemAdminParams): Promise<BFMetaPcSdk.System.SystemApiReturn<BFMetaPcSdk.System.ResetSystemAdminResult>>;
}

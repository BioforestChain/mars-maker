import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class VerifySystemAdminApi extends SystemPostApi<BFChainPcSdk.System.VerifySystemAdminResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_VERIFY_SYSTEM_ADMIN;
    sendPostRequest(argv: BFChainPcSdk.System.VerifySystemAdminParams): Promise<BFChainPcSdk.System.SystemApiReturn<BFChainPcSdk.System.VerifySystemAdminResult>>;
}

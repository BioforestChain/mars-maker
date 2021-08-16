import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GetSystemAdminApi extends SystemPostApi<BFChainPcSdk.System.GetSystemAdminResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_GET_SYSTEM_ADMIN;
    sendPostRequest(argv: BFChainPcSdk.System.GetSystemAdminParams): Promise<BFChainPcSdk.System.SystemApiReturn<BFChainPcSdk.System.GetSystemAdminResult>>;
}

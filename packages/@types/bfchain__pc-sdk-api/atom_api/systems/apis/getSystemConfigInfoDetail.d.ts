import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GetSystemConfigInfoDetailApi extends SystemPostApi<BFChainPcSdk.System.GetSystemConfigInfoDetailResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_GET_SYSTEM_CONFIG_INFO_DETAIL;
    sendPostRequest(
        argv: BFChainPcSdk.System.GetSystemConfigInfoDetailParams
    ): Promise<BFChainPcSdk.System.SystemApiReturn<BFChainPcSdk.System.GetSystemConfigInfoDetailResult>>;
}

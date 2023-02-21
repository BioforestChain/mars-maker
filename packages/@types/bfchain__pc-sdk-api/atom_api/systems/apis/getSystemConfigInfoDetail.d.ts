import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GetSystemConfigInfoDetailApi extends SystemPostApi<BFMetaPcSdk.System.GetSystemConfigInfoDetailResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_GET_SYSTEM_CONFIG_INFO_DETAIL;
    sendPostRequest(argv: BFMetaPcSdk.System.GetSystemConfigInfoDetailParams): Promise<BFMetaPcSdk.System.SystemApiReturn<BFMetaPcSdk.System.GetSystemConfigInfoDetailResult>>;
}

import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GetSystemDelegateApi extends SystemPostApi<BFMetaPcSdk.System.GetSystemDelegateResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_GET_SYSTEM_DELEGATE;
    sendPostRequest(argv: BFMetaPcSdk.System.GetSystemDelegateParams): Promise<BFMetaPcSdk.System.SystemApiReturn<BFMetaPcSdk.System.GetSystemDelegateResult>>;
}

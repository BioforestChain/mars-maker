import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class BindingAccountApi extends SystemPostApi<BFMetaPcSdk.System.BindingAccountResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_BINDING_ACCOUNT;
    sendPostRequest(argv: BFMetaPcSdk.System.BindingAccountParams): Promise<BFMetaPcSdk.System.SystemApiReturn<BFMetaPcSdk.System.BindingAccountResult>>;
}

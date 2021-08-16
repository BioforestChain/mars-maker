import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class BindingAccountApi extends SystemPostApi<BFChainPcSdk.System.BindingAccountResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_BINDING_ACCOUNT;
    sendPostRequest(argv: BFChainPcSdk.System.BindingAccountParams): Promise<BFChainPcSdk.System.SystemApiReturn<BFChainPcSdk.System.BindingAccountResult>>;
}

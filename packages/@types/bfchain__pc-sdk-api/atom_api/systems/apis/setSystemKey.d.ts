import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class SetSystemKeyApi extends SystemPostApi<BFChainPcSdk.System.SetSystemKeyResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_SET_SYSTEM_KEY;
    sendPostRequest(argv: BFChainPcSdk.System.SetSystemKeyParams): Promise<BFChainPcSdk.System.SystemApiReturn<BFChainPcSdk.System.SetSystemKeyResult>>;
}

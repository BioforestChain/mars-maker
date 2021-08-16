import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class SetSystemConfigApi extends SystemPostApi<BFChainPcSdk.System.SetSystemConfigResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_SET_SYSTEM_CONFIG;
    sendPostRequest(argv: BFChainPcSdk.System.SetSystemConfigParams): Promise<BFChainPcSdk.System.SystemApiReturn<BFChainPcSdk.System.SetSystemConfigResult>>;
}

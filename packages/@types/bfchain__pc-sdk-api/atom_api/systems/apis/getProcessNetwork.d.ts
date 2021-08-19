import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GetProcessNetworkApi extends SystemPostApi<BFChainPcSdk.System.GetProcessNetworkResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_GET_PROCESS_NETWORK;
    sendPostRequest(argv: BFChainPcSdk.System.GetProcessNetworkParams): Promise<BFChainPcSdk.System.SystemApiReturn<BFChainPcSdk.System.GetProcessNetworkResult>>;
}

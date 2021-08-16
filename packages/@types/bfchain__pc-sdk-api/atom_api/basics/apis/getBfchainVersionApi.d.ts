import { BasicGetApi } from "./_basicGetApi";
import { BASIC_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GetBfchainVersionApi extends BasicGetApi<BFChainPcSdk.Basic.GetBfchainVersionResult> {
    readonly REQUEST_API_PATH = BASIC_API_PATH.BASIC_GET_BFCHAIN_VERSION;
    sendGetRequest(): Promise<BFChainPcSdk.Basic.BasicApiReturn<BFChainPcSdk.Basic.GetBfchainVersionResult>>;
}

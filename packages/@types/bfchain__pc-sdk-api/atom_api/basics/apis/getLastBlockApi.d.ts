import { BasicGetApi } from "./_basicGetApi";
import { BASIC_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GetLastBlockApi extends BasicGetApi<BFChainPcSdk.Basic.GetLastBlockResult> {
    readonly REQUEST_API_PATH = BASIC_API_PATH.BASIC_GET_LAST_BLOCK;
    sendGetRequest(): Promise<BFChainPcSdk.Basic.BasicApiReturn<BFChainPcSdk.Basic.GetLastBlockResult>>;
}

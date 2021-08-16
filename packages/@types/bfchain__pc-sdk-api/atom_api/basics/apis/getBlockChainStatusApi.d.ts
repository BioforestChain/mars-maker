import { BasicGetApi } from "./_basicGetApi";
import { BASIC_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GetBlockChainStatusApi extends BasicGetApi<BFChainPcSdk.Basic.GetBlockChainStatusResult> {
    readonly REQUEST_API_PATH = BASIC_API_PATH.BASIC_GET_BLOCK_CHAIN_STATUS;
    sendGetRequest(): Promise<BFChainPcSdk.Basic.BasicApiReturn<BFChainPcSdk.Basic.GetBlockChainStatusResult>>;
}

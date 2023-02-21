import { BasicGetApi } from "./_basicGetApi";
import { BASIC_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GetBlockChainStatusApi extends BasicGetApi<BFMetaPcSdk.Basic.GetBlockChainStatusResult> {
    readonly REQUEST_API_PATH = BASIC_API_PATH.BASIC_GET_BLOCK_CHAIN_STATUS;
    sendGetRequest(): Promise<BFMetaPcSdk.Basic.BasicApiReturn<BFMetaPcSdk.Basic.GetBlockChainStatusResult>>;
}

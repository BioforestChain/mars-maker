import { BasicGetApi } from "./_basicGetApi";
import { BASIC_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GetLastBlockApi extends BasicGetApi<BFMetaPcSdk.Basic.GetLastBlockResult> {
    readonly REQUEST_API_PATH = BASIC_API_PATH.BASIC_GET_LAST_BLOCK;
    sendGetRequest(): Promise<BFMetaPcSdk.Basic.BasicApiReturn<BFMetaPcSdk.Basic.GetLastBlockResult>>;
}

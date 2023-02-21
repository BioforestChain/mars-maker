import { BasicPostApi } from "./_basicPostApi";
import { BASIC_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GetBlockApi extends BasicPostApi<BFMetaPcSdk.Basic.GetBlockResult> {
    readonly REQUEST_API_PATH = BASIC_API_PATH.BASIC_GET_BLOCK;
    sendPostRequest(argv: BFMetaPcSdk.Basic.GetBlockParams): Promise<BFMetaPcSdk.Basic.BasicApiReturn<BFMetaPcSdk.Basic.GetBlockResult>>;
}

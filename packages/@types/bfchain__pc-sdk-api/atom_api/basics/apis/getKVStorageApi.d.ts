import { BasicPostApi } from "./_basicPostApi";
import { BASIC_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GetKVStorageApi extends BasicPostApi<BFMetaPcSdk.Basic.GetKVStorageResult> {
    readonly REQUEST_API_PATH = BASIC_API_PATH.GET_KVSTORAGE;
    sendPostRequest(argv: BFMetaPcSdk.Basic.GetKVStorageParams): Promise<BFMetaPcSdk.Basic.BasicApiReturn<BFMetaPcSdk.Basic.GetKVStorageResult>>;
}

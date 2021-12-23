import { BasicPostApi } from "./_basicPostApi";
import { BASIC_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GetKVStorageApi extends BasicPostApi<BFChainPcSdk.Basic.GetKVStorageResult> {
    readonly REQUEST_API_PATH = BASIC_API_PATH.GET_KVSTORAGE;
    sendPostRequest(argv: BFChainPcSdk.Basic.GetKVStorageParams): Promise<BFChainPcSdk.Basic.BasicApiReturn<BFChainPcSdk.Basic.GetKVStorageResult>>;
}

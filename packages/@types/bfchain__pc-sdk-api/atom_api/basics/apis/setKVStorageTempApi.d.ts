import { BasicPostApi } from "./_basicPostApi";
import { BASIC_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class SetKVStorageTempApi extends BasicPostApi<BFChainPcSdk.Basic.SetKVStorageTempResult> {
    readonly REQUEST_API_PATH = BASIC_API_PATH.SET_KVSTORAGE_TEMP;
    sendPostRequest(argv: BFChainPcSdk.Basic.SetKVStorageTempParams): Promise<BFChainPcSdk.Basic.BasicApiReturn<BFChainPcSdk.Basic.SetKVStorageTempResult>>;
}

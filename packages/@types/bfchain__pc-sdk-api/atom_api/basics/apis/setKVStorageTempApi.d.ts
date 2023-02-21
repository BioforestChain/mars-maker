import { BasicPostApi } from "./_basicPostApi";
import { BASIC_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class SetKVStorageTempApi extends BasicPostApi<BFMetaPcSdk.Basic.SetKVStorageTempResult> {
    readonly REQUEST_API_PATH = BASIC_API_PATH.SET_KVSTORAGE_TEMP;
    sendPostRequest(argv: BFMetaPcSdk.Basic.SetKVStorageTempParams): Promise<BFMetaPcSdk.Basic.BasicApiReturn<BFMetaPcSdk.Basic.SetKVStorageTempResult>>;
}

import { BasicPostApi } from "./_basicPostApi";
import { BASIC_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class SetKVStorageTempApi extends BasicPostApi<BFMetaPcSdk.Basic.SetKVStorageTempResult> {
    readonly REQUEST_API_PATH = BASIC_API_PATH.SET_KVSTORAGE_TEMP;

    async sendPostRequest(argv: BFMetaPcSdk.Basic.SetKVStorageTempParams) {
        return await super.sendPostRequest(argv);
    }
}

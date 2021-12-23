import { BasicPostApi } from "./_basicPostApi";
import { BASIC_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class GetKVStorageApi extends BasicPostApi<BFChainPcSdk.Basic.GetKVStorageResult> {
    readonly REQUEST_API_PATH = BASIC_API_PATH.GET_KVSTORAGE;

    async sendPostRequest(argv: BFChainPcSdk.Basic.GetKVStorageParams) {
        return await super.sendPostRequest(argv);
    }
}

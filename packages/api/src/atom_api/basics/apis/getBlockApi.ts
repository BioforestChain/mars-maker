import { BasicPostApi } from "./_basicPostApi";
import { BASIC_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class GetBlockApi extends BasicPostApi<BFChainPcSdk.Basic.GetBlockResult> {
    readonly REQUEST_API_PATH = BASIC_API_PATH.BASIC_GET_BLOCK;

    async sendPostRequest(argv: BFChainPcSdk.Basic.GetBlockParams) {
        return await super.sendPostRequest(argv);
    }
}

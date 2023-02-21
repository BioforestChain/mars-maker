import { BasicPostApi } from "./_basicPostApi";
import { BASIC_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class GetBlockApi extends BasicPostApi<BFMetaPcSdk.Basic.GetBlockResult> {
    readonly REQUEST_API_PATH = BASIC_API_PATH.BASIC_GET_BLOCK;

    async sendPostRequest(argv: BFMetaPcSdk.Basic.GetBlockParams) {
        return await super.sendPostRequest(argv);
    }
}

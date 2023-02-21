import { BasicPostApi } from "./_basicPostApi";
import { BASIC_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class GetAccountPublicKeyApi extends BasicPostApi<BFMetaPcSdk.Basic.GetAccountPublicKeyResult> {
    readonly REQUEST_API_PATH = BASIC_API_PATH.BASIC_GET_ACCOUNT_PUBLICKEY;

    async sendPostRequest(argv: BFMetaPcSdk.Basic.GetAccountPublicKeyParams) {
        return await super.sendPostRequest(argv);
    }
}

import { BasicPostApi } from "./_basicPostApi";
import { BASIC_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class GetAccountLastTypeTransactionApi extends BasicPostApi<BFMetaPcSdk.Basic.GetAccountLastTypeTransactionResult> {
    readonly REQUEST_API_PATH = BASIC_API_PATH.BASIC_GET_ACCOUNT_LAST_TYPE_TRANSACTION;

    async sendPostRequest(argv: BFMetaPcSdk.Basic.GetAccountLastTypeTransactionParams) {
        return await super.sendPostRequest(argv);
    }
}

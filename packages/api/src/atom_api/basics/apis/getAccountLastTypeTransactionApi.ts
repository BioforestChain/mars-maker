import { BasicPostApi } from "./_basicPostApi";
import { BASIC_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class GetAccountLastTypeTransactionApi extends BasicPostApi<BFChainPcSdk.Basic.GetAccountLastTypeTransactionResult> {
    readonly REQUEST_API_PATH = BASIC_API_PATH.BASIC_GET_ACCOUNT_LAST_TYPE_TRANSACTION;

    async sendPostRequest(argv: BFChainPcSdk.Basic.GetAccountLastTypeTransactionParams) {
        return await super.sendPostRequest(argv);
    }
}

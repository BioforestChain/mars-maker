import { BasicPostApi } from "./_basicPostApi";
import { BASIC_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class GetAccountLastTransactionApi extends BasicPostApi<BFChainPcSdk.Basic.GetAccountLastTransactionResult> {
    readonly REQUEST_API_PATH = BASIC_API_PATH.BASIC_GET_ACCOUNT_LAST_TRANSACTION;

    async sendPostRequest(argv: BFChainPcSdk.Basic.GetAccountLastTransactionParams) {
        return await super.sendPostRequest(argv);
    }
}

import { CommonApi } from "./_commonApi";
import { COMMON_API_PATH } from "@bfmeta/transaction-maker-core";

export class GenerateAccountApi extends CommonApi<TransactionMaker.Common.AccountInfo> {
    readonly EXEC_API_PATH = COMMON_API_PATH.GENERATE_ACCOUNT;

    async sendPostRequest(argv: TransactionMaker.Common.GenerateAccountParams) {
        return super.sendPostRequest(argv);
    }
}

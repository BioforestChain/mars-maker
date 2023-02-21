import { BasicPostApi } from "./_basicPostApi";
import { BASIC_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class CreateAccountApi extends BasicPostApi<BFMetaPcSdk.Basic.CreateAccountResult> {
    readonly REQUEST_API_PATH = BASIC_API_PATH.BASIC_CREATE_ACCOUNT;

    async sendPostRequest(argv: BFMetaPcSdk.Basic.CreateAccountParams) {
        return await super.sendPostRequest(argv);
    }
}

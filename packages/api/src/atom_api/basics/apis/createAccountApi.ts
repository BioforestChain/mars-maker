import { BasicPostApi } from "./_basicPostApi";
import { BASIC_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class CreateAccountApi extends BasicPostApi<BFChainPcSdk.Basic.CreateAccountResult> {
    readonly REQUEST_API_PATH = BASIC_API_PATH.BASIC_CREATE_ACCOUNT;

    async sendPostRequest(argv: BFChainPcSdk.Basic.CreateAccountParams) {
        return await super.sendPostRequest(argv);
    }
}

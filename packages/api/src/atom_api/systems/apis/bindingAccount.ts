import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class BindingAccountApi extends SystemPostApi<BFMetaPcSdk.System.BindingAccountResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_BINDING_ACCOUNT;

    async sendPostRequest(argv: BFMetaPcSdk.System.BindingAccountParams) {
        return await super.sendPostRequest(argv);
    }
}

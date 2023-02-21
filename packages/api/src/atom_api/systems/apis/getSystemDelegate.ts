import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class GetSystemDelegateApi extends SystemPostApi<BFMetaPcSdk.System.GetSystemDelegateResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_GET_SYSTEM_DELEGATE;

    async sendPostRequest(argv: BFMetaPcSdk.System.GetSystemDelegateParams) {
        return await super.sendPostRequest(argv);
    }
}

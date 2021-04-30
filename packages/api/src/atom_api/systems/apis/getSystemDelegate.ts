import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class GetSystemDelegateApi extends SystemPostApi<BFChainPcSdk.System.GetSystemDelegateResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_GET_SYSTEM_DELEGATE;

    async sendPostRequest(argv: BFChainPcSdk.System.GetSystemDelegateParams) {
        return await super.sendPostRequest(argv);
    }
}

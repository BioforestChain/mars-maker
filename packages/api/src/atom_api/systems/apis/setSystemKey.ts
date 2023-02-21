import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class SetSystemKeyApi extends SystemPostApi<BFMetaPcSdk.System.SetSystemKeyResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_SET_SYSTEM_KEY;

    async sendPostRequest(argv: BFMetaPcSdk.System.SetSystemKeyParams) {
        return await super.sendPostRequest(argv);
    }
}

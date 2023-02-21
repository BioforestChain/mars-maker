import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class SetSystemConfigApi extends SystemPostApi<BFMetaPcSdk.System.SetSystemConfigResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_SET_SYSTEM_CONFIG;

    async sendPostRequest(argv: BFMetaPcSdk.System.SetSystemConfigParams) {
        return await super.sendPostRequest(argv);
    }
}

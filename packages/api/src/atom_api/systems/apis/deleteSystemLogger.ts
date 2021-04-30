import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class DeleteSystemLoggerApi extends SystemPostApi<BFChainPcSdk.System.DeleteSystemLoggerResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_DELETE_SYSTEM_LOGGER;

    async sendPostRequest(argv: BFChainPcSdk.System.DeleteSystemLoggerParams) {
        return await super.sendPostRequest(argv);
    }
}

import { BasicPostApi } from "./_basicPostApi";
import { BASIC_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class GenerateSecretApi extends BasicPostApi<BFChainPcSdk.Basic.GenerateSecretResult> {
    readonly REQUEST_API_PATH = BASIC_API_PATH.BASIC_GENERATE_SECRET;

    async sendPostRequest(argv: BFChainPcSdk.Basic.GenerateSecretParams) {
        return await super.sendPostRequest(argv);
    }
}

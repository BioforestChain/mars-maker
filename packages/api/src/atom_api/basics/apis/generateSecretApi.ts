import { BasicPostApi } from "./_basicPostApi";
import { BASIC_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class GenerateSecretApi extends BasicPostApi<BFMetaPcSdk.Basic.GenerateSecretResult> {
    readonly REQUEST_API_PATH = BASIC_API_PATH.BASIC_GENERATE_SECRET;

    async sendPostRequest(argv: BFMetaPcSdk.Basic.GenerateSecretParams) {
        return await super.sendPostRequest(argv);
    }
}

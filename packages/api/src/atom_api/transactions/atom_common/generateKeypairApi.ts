import { CommonApi } from "./_commonApi";
import { COMMON_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class GenerateKeypairApi extends CommonApi<BFMetaPcSdk.Common.Keypairs> {
    readonly EXEC_API_PATH = COMMON_API_PATH.GENERATE_KEYPAIR;

    async sendPostRequest(argv: BFMetaPcSdk.Common.GenerateKeypairParams) {
        return super.sendPostRequest(argv);
    }
}

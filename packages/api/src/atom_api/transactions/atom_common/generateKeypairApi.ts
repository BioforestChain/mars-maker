import { CommonApi } from "./_commonApi";
import { COMMON_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class GenerateKeypairApi extends CommonApi<BFChainPcSdk.Common.Keypairs> {
    readonly EXEC_API_PATH = COMMON_API_PATH.GENERATE_KEYPAIR;

    async sendPostRequest(argv: BFChainPcSdk.Common.GenerateKeypairParams) {
        return super.sendPostRequest(argv);
    }
}

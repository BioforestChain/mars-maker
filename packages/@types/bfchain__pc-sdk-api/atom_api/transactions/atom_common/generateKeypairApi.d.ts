import { CommonApi } from "./_commonApi";
import { COMMON_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GenerateKeypairApi extends CommonApi<BFMetaPcSdk.Common.Keypairs> {
    readonly EXEC_API_PATH = COMMON_API_PATH.GENERATE_KEYPAIR;
    sendPostRequest(argv: BFMetaPcSdk.Common.GenerateKeypairParams): Promise<BFMetaPcSdk.TransactionServer.CommonFailureReturn | BFMetaPcSdk.TransactionServer.CommonSuccessReturn<BFMetaPcSdk.Common.Keypairs>>;
}

import { CommonApi } from "./_commonApi";
import { COMMON_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class AsymmetricDecryptApi extends CommonApi<BFMetaPcSdk.Common.AsymmetricDecrypt> {
    readonly EXEC_API_PATH = COMMON_API_PATH.ASYMMETRIC_DECRYPT;
    sendPostRequest(argv: BFMetaPcSdk.Common.AsymmetricDecryptParams): Promise<BFMetaPcSdk.TransactionServer.CommonFailureReturn | BFMetaPcSdk.TransactionServer.CommonSuccessReturn<BFMetaPcSdk.Common.AsymmetricDecrypt>>;
}

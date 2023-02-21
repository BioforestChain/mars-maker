import { CommonApi } from "./_commonApi";
import { COMMON_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class AsymmetricEncryptApi extends CommonApi<BFMetaPcSdk.Common.AsymmetricEncrypt> {
    readonly EXEC_API_PATH = COMMON_API_PATH.ASYMMETRIC_ENCRYPT;
    sendPostRequest(argv: BFMetaPcSdk.Common.AsymmetricEncryptParams): Promise<BFMetaPcSdk.TransactionServer.CommonFailureReturn | BFMetaPcSdk.TransactionServer.CommonSuccessReturn<BFMetaPcSdk.Common.AsymmetricEncrypt>>;
}

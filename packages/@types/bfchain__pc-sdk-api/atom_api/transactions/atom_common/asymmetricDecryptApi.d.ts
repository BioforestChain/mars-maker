import { CommonApi } from "./_commonApi";
import { COMMON_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class AsymmetricDecryptApi extends CommonApi<BFChainPcSdk.Common.AsymmetricDecrypt> {
    readonly EXEC_API_PATH = COMMON_API_PATH.ASYMMETRIC_DECRYPT;
    sendPostRequest(argv: BFChainPcSdk.Common.AsymmetricDecryptParams): Promise<BFChainPcSdk.TransactionServer.CommonFailureReturn | BFChainPcSdk.TransactionServer.CommonSuccessReturn<BFChainPcSdk.Common.AsymmetricDecrypt>>;
}

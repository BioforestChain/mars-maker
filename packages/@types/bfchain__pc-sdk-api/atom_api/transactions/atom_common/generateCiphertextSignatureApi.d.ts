import { CommonApi } from "./_commonApi";
import { COMMON_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GenerateCiphertextSignatureApi extends CommonApi<string> {
    readonly EXEC_API_PATH = COMMON_API_PATH.GENERATE_CIPHERTEXT_SIGNATURE;
    sendPostRequest(argv: BFMetaPcSdk.Common.GenerateCiphertextSignatureParams): Promise<BFMetaPcSdk.TransactionServer.CommonFailureReturn | BFMetaPcSdk.TransactionServer.CommonSuccessReturn<string>>;
}

import { CommonApi } from "./_commonApi";
import { COMMON_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class VerifyAddressApi extends CommonApi<boolean> {
    readonly EXEC_API_PATH = COMMON_API_PATH.VERIFY_ADDRESS;
    sendPostRequest(argv: BFMetaPcSdk.Common.VerifyAddressParams): Promise<BFMetaPcSdk.TransactionServer.CommonFailureReturn | BFMetaPcSdk.TransactionServer.CommonSuccessReturn<boolean>>;
}

import { CommonApi } from "./_commonApi";
import { COMMON_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GenerateAccountApi extends CommonApi<BFChainPcSdk.Common.AccountInfo> {
    readonly EXEC_API_PATH = COMMON_API_PATH.GENERATE_ACCOUNT;
    sendPostRequest(argv: BFChainPcSdk.Common.GenerateAccountParams): Promise<BFChainPcSdk.TransactionServer.CommonFailureReturn | BFChainPcSdk.TransactionServer.CommonSuccessReturn<BFChainPcSdk.Common.AccountInfo>>;
}

import { CommonApi } from "./_commonApi";
import { COMMON_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GenerateAddressBySecretApi extends CommonApi<string> {
    readonly EXEC_API_PATH = COMMON_API_PATH.GENERATE_ADDRESS_BY_SECRET;
    sendPostRequest(argv: BFChainPcSdk.Common.GenerateAddressBySecretParams): Promise<BFChainPcSdk.TransactionServer.CommonFailureReturn | BFChainPcSdk.TransactionServer.CommonSuccessReturn<string>>;
}

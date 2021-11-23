import { CommonApi } from "./_commonApi";
import { COMMON_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GenerateAddressByPublicKeyApi extends CommonApi<string> {
    readonly EXEC_API_PATH = COMMON_API_PATH.GENERATE_ADDRESS_BY_PUBLICKEY;
    sendPostRequest(argv: BFChainPcSdk.Common.GenerateAddressByPublicKeyParams): Promise<BFChainPcSdk.TransactionServer.CommonFailureReturn | BFChainPcSdk.TransactionServer.CommonSuccessReturn<string>>;
}

import { BasicPostApi } from "./_basicPostApi";
import { BASIC_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GetAccountLastTransactionApi extends BasicPostApi<BFChainPcSdk.Basic.GetAccountLastTransactionResult> {
    readonly REQUEST_API_PATH = BASIC_API_PATH.BASIC_GET_ACCOUNT_LAST_TRANSACTION;
    sendPostRequest(argv: BFChainPcSdk.Basic.GetAccountLastTransactionParams): Promise<BFChainPcSdk.Basic.BasicApiReturn<BFChainPcSdk.Basic.GetAccountLastTransactionResult>>;
}

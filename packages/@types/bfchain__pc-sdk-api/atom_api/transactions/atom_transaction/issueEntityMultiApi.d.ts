import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class IssueEntityMultiApi extends TransactionApi<BFChainCore.IssueEntityMultiTransactionV1JSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ENTITY_MULTI;
    generateTransaction(argv: BFMetaPcSdk.Transaction.IssueEntityMultiTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.IssueEntityMultiAssetV1JSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastTransaction(transaction: BFChainCore.IssueEntityMultiTransactionV1JSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.IssueEntityMultiAssetV1JSON>, "recipientId"> & {
        recipientId: string;
    }>>;
}

import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class IssueEntityMultiApi extends TransactionApi<BFChainCore.IssueEntityMultiTransactionV1JSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ENTITY_MULTI;
    generateTransaction(argv: BFChainPcSdk.Transaction.IssueEntityMultiTransactionParams): Promise<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.IssueEntityMultiAssetV1JSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastTransaction(transaction: BFChainCore.IssueEntityMultiTransactionV1JSON): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.IssueEntityMultiAssetV1JSON>, "recipientId"> & {
        recipientId: string;
    }>>;
}

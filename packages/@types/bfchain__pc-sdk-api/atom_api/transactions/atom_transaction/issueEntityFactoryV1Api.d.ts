import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class IssueEntityFactoryV1Api extends TransactionApi<BFChainCore.IssueEntityFactoryTransactionV1JSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ENTITY_FACTORY_V1;
    generateTransaction(argv: BFMetaPcSdk.Transaction.IssueEntityFactoryTransactionV1Params): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.IssueEntityFactoryAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastTransaction(transaction: BFChainCore.IssueEntityFactoryTransactionV1JSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.IssueEntityFactoryAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
}

import type { BFChainCore } from "@bfchain/core";
export declare const TRANSACTION_FACTORY_MAP: Map<import("@bfchain/pc-sdk-api-constants").GENERATE_TRANSACTION_API_PATH, import("./atom_transaction/_transactionFactory").TransactionFactory<any>>;
export declare function TransactionFactory(bfchainCore: BFChainCore): void;

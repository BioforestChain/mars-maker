import type { BFChainCore } from "@bfchain/core";
import { EasyWeakMap } from "@bfchain/util";
export declare const TRANSACTION_FACTORY_MAP_WM: EasyWeakMap<BFChainCore, Map<import("@bfchain/pc-sdk-api-constants").GENERATE_TRANSACTION_API_PATH, import("./atom_transaction/_transactionFactory").TransactionFactory<any>>, BFChainCore>;
export declare function TransactionFactory(bfchainCore: BFChainCore): void;

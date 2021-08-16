import type { BFChainCore } from "@bfchain/core";
export declare function Router(bfchainCore: BFChainCore): void;
export declare function route(
    pathname: BFChainPcSdk.Transaction.GENERATE_TRANSACTION_API_PATH,
    params: BFChainPcSdk.Transaction.TransactionCommonParams
): Promise<BFChainCore.TransactionJSON<object>>;

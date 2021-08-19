import type { BFChainCore } from "@bfchain/core";
export declare function Router(bfchainCore: BFChainCore): void;
export declare function route(args: BFChainPcSdk.TransactionServer.RouterArgs): Promise<BFChainCore.TransactionJSON<object> | BFChainCore.CrossChain.MigrateCertificateJSON>;

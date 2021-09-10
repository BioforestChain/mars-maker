import type { BFChainCore } from "@bfchain/core";
export declare abstract class CommonFactory<T> {
    bfchainCore: BFChainCore;
    abstract readonly EXEC_API_PATH: BFChainPcSdk.Common.COMMON_API_PATH;
    constructor(bfchainCore: BFChainCore);
    abstract exec(request: BFChainPcSdk.Common.CommonParams): Promise<T>;
}

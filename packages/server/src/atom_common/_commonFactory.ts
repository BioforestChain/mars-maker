import type { BFChainCore } from "@bfchain/core";

export abstract class CommonFactory<T> {
    abstract readonly EXEC_API_PATH: TransactionMaker.Common.COMMON_API_PATH;

    constructor(public bfchainCore: BFChainCore) {}

    /**
     * 迁移凭证
     *
     * @param request
     */
    abstract exec(request: TransactionMaker.Common.CommonParams): Promise<T>;
}

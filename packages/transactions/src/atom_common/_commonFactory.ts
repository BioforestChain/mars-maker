import type { BFChainCore } from "@bfchain/core";

export abstract class CommonFactory<T> {
    abstract readonly EXEC_API_PATH: BFMetaPcSdk.Common.COMMON_API_PATH;

    constructor(public bfchainCore: BFChainCore) {}

    /**
     * 迁移凭证
     *
     * @param request
     */
    abstract exec(request: BFMetaPcSdk.Common.CommonParams): Promise<T>;
}

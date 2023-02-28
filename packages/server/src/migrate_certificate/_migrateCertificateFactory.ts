import type { BFChainCore } from "@bfchain/core";

export abstract class MigrateCertificateFactory {
    abstract readonly GENERATE_API_PATH: TransactionMaker.CrossChain.MIGRATE_CERTIFICATE_API_PATH;

    constructor(public bfchainCore: BFChainCore) {}

    /**
     * 迁移凭证
     *
     * @param request
     */
    abstract generate(request: TransactionMaker.CrossChain.MigrateCertificateArgs): Promise<BFChainCore.CrossChain.MigrateCertificateJSON>;
}

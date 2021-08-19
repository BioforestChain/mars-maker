import type { BFChainCore } from "@bfchain/core";

export abstract class MigrateCertificateFactory {
    abstract readonly GENERATE_API_PATH: BFChainPcSdk.CrossChain.MIGRATE_CERTIFICATE_API_PATH;

    constructor(public bfchainCore: BFChainCore) {}

    /**
     * 迁移凭证
     *
     * @param request
     */
    abstract generate(request: BFChainPcSdk.CrossChain.MigrateCertificateArgs): Promise<BFChainCore.CrossChain.MigrateCertificateJSON>;
}

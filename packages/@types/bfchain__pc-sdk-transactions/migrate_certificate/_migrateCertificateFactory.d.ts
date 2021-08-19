import type { BFChainCore } from "@bfchain/core";
export declare abstract class MigrateCertificateFactory {
    bfchainCore: BFChainCore;
    abstract readonly GENERATE_API_PATH: BFChainPcSdk.CrossChain.MIGRATE_CERTIFICATE_API_PATH;
    constructor(bfchainCore: BFChainCore);
    abstract generate(request: BFChainPcSdk.CrossChain.MigrateCertificateArgs): Promise<BFChainCore.CrossChain.MigrateCertificateJSON>;
}

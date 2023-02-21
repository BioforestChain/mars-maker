import type { BFChainCore } from "@bfchain/core";
export declare abstract class MigrateCertificateFactory {
    bfchainCore: BFChainCore;
    abstract readonly GENERATE_API_PATH: BFMetaPcSdk.CrossChain.MIGRATE_CERTIFICATE_API_PATH;
    constructor(bfchainCore: BFChainCore);
    abstract generate(request: BFMetaPcSdk.CrossChain.MigrateCertificateArgs): Promise<BFChainCore.CrossChain.MigrateCertificateJSON>;
}

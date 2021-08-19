import { MIGRATE_CERTIFICATE_API_PATH } from "@bfchain/pc-sdk-api-constants";
import { MigrateCertificateFactory } from "./_migrateCertificateFactory";
export declare class MigrateCertificateGenerateFactory extends MigrateCertificateFactory {
    readonly GENERATE_API_PATH = MIGRATE_CERTIFICATE_API_PATH.MIGRATE_CERTIFICATE_GENERATE;
    generate(request: BFChainCore.CrossChain.GenerateMigrateCertificateArgs): Promise<BFChainCore.CrossChain.MigrateCertificateJSON>;
}

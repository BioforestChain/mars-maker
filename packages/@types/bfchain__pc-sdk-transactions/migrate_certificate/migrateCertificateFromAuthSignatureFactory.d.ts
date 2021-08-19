import { MIGRATE_CERTIFICATE_API_PATH } from "@bfchain/pc-sdk-api-constants";
import { MigrateCertificateFactory } from "./_migrateCertificateFactory";
export declare class MigrateCertificateFromAuthSignatureFactory extends MigrateCertificateFactory {
    readonly GENERATE_API_PATH = MIGRATE_CERTIFICATE_API_PATH.MIGRATE_CERTIFICATE_FROM_AUTH_SIGNATURE;
    generate(request: BFChainCore.CrossChain.AuthSignMigrateCertificateArgs): Promise<BFChainCore.CrossChain.MigrateCertificateJSON>;
}

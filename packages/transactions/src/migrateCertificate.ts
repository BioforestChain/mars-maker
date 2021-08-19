import type { BFChainCore } from "@bfchain/core";
import { MigrateCertificateGenerateFactory, MigrateCertificateFromAuthSignatureFactory, MigrateCertificateToAuthSignatureFactory } from "./migrate_certificate";

export const MIGRATE_CERTIFICATE_FACTORY_MAP = new Map<
    BFChainPcSdk.CrossChain.MIGRATE_CERTIFICATE_API_PATH,
    BFChainPcSdk.CrossChain.MigrateCertificateFactory
>();

export function MigrateCertificateFactory(bfchainCore: BFChainCore) {
    const migrateCertificateGenerateFactory = new MigrateCertificateGenerateFactory(bfchainCore);
    const migrateCertificateFromAuthSignatureFactory = new MigrateCertificateFromAuthSignatureFactory(bfchainCore);
    const migrateCertificateToAuthSignatureFactory = new MigrateCertificateToAuthSignatureFactory(bfchainCore);

    MIGRATE_CERTIFICATE_FACTORY_MAP.set(migrateCertificateGenerateFactory.GENERATE_API_PATH, migrateCertificateGenerateFactory);
    MIGRATE_CERTIFICATE_FACTORY_MAP.set(migrateCertificateFromAuthSignatureFactory.GENERATE_API_PATH, migrateCertificateFromAuthSignatureFactory);
    MIGRATE_CERTIFICATE_FACTORY_MAP.set(migrateCertificateToAuthSignatureFactory.GENERATE_API_PATH, migrateCertificateToAuthSignatureFactory);

    Object.freeze(MIGRATE_CERTIFICATE_FACTORY_MAP);
}

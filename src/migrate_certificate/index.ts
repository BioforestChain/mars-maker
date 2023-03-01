import type { BFChainCore } from "@bfchain/core";

import { MigrateCertificateGenerateFactory } from "./migrateCertificateFactory";
import { MigrateCertificateFromAuthSignatureFactory } from "./migrateCertificateFromAuthSignatureFactory";
import { MigrateCertificateToAuthSignatureFactory } from "./migrateCertificatetoAuthSignatureFactory";

import { EasyWeakMap } from "@bfchain/util";
export const MIGRATE_CERTIFICATE_FACTORY_MAP_WM = EasyWeakMap.from<
    BFChainCore,
    Map<TransactionMaker.CrossChain.MIGRATE_CERTIFICATE_API_PATH, import("./_migrateCertificateFactory").MigrateCertificateFactory>
>({
    creater() {
        return new Map();
    },
});

export function MigrateCertificateFactory(bfchainCore: BFChainCore) {
    const MIGRATE_CERTIFICATE_FACTORY_MAP = MIGRATE_CERTIFICATE_FACTORY_MAP_WM.forceGet(bfchainCore);

    const migrateCertificateGenerateFactory = new MigrateCertificateGenerateFactory(bfchainCore);
    const migrateCertificateFromAuthSignatureFactory = new MigrateCertificateFromAuthSignatureFactory(bfchainCore);
    const migrateCertificateToAuthSignatureFactory = new MigrateCertificateToAuthSignatureFactory(bfchainCore);

    MIGRATE_CERTIFICATE_FACTORY_MAP.set(migrateCertificateGenerateFactory.GENERATE_API_PATH, migrateCertificateGenerateFactory);
    MIGRATE_CERTIFICATE_FACTORY_MAP.set(migrateCertificateFromAuthSignatureFactory.GENERATE_API_PATH, migrateCertificateFromAuthSignatureFactory);
    MIGRATE_CERTIFICATE_FACTORY_MAP.set(migrateCertificateToAuthSignatureFactory.GENERATE_API_PATH, migrateCertificateToAuthSignatureFactory);

    Object.freeze(MIGRATE_CERTIFICATE_FACTORY_MAP);
}

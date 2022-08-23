import type { BFChainCore } from "@bfchain/core";
import { EasyWeakMap } from "@bfchain/util";
export declare const MIGRATE_CERTIFICATE_FACTORY_MAP_WM: EasyWeakMap<BFChainCore, Map<import("@bfchain/pc-sdk-api-constants").MIGRATE_CERTIFICATE_API_PATH, import("./migrate_certificate/_migrateCertificateFactory").MigrateCertificateFactory>, BFChainCore>;
export declare function MigrateCertificateFactory(bfchainCore: BFChainCore): void;

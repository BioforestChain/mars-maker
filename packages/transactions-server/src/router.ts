import type { BFChainCore } from "@bfchain/core";
import {
    TRANSACTION_FACTORY_MAP_WM,
    TransactionFactory,
    MIGRATE_CERTIFICATE_FACTORY_MAP_WM,
    MigrateCertificateFactory,
    COMMON_FACTORY_MAP_WM,
    CommonFactory,
} from "@bfchain/pc-sdk-transactions";
import { SdkExceptionGenerator, API_ENDPOINT_NOT_FOUND } from "@bfchain/pc-sdk-exception";
const { ArgumentIllegalException } = SdkExceptionGenerator("Sdk", "Transactions-Server");

export function Router(bfchainCore: BFChainCore) {
    TransactionFactory(bfchainCore);
    MigrateCertificateFactory(bfchainCore);
    CommonFactory(bfchainCore);
}

export async function route(args: BFMetaPcSdk.TransactionServer.RouterArgs, bfchainCore: BFChainCore) {
    const TRANSACTION_FACTORY_MAP = TRANSACTION_FACTORY_MAP_WM.forceGet(bfchainCore);
    const txFactory = TRANSACTION_FACTORY_MAP.get((args as BFMetaPcSdk.TransactionServer.TransactionRouterArgs).pathname);
    if (txFactory) {
        return await txFactory.generateTransaction((args as BFMetaPcSdk.TransactionServer.TransactionRouterArgs).params);
    }
    const COMMON_FACTORY_MAP = COMMON_FACTORY_MAP_WM.forceGet(bfchainCore);
    const commonFactory = COMMON_FACTORY_MAP.get((args as BFMetaPcSdk.TransactionServer.CommonRouterArgs).pathname);
    if (commonFactory) {
        return await commonFactory.exec((args as BFMetaPcSdk.TransactionServer.CommonRouterArgs).params);
    }
    const MIGRATE_CERTIFICATE_FACTORY_MAP = MIGRATE_CERTIFICATE_FACTORY_MAP_WM.forceGet(bfchainCore);
    const migrateCertificateFactory = MIGRATE_CERTIFICATE_FACTORY_MAP.get((args as BFMetaPcSdk.TransactionServer.MigrateCertificateRouterArgs).pathname);
    if (migrateCertificateFactory) {
        return await migrateCertificateFactory.generate((args as BFMetaPcSdk.TransactionServer.MigrateCertificateRouterArgs).params);
    }
    throw new ArgumentIllegalException(API_ENDPOINT_NOT_FOUND, {
        target: "request",
        function: "route",
        description: `api ${args.pathname} not found`,
    });
}

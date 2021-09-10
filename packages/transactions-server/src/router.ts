import type { BFChainCore } from "@bfchain/core";
import {
    TRANSACTION_FACTORY_MAP,
    TransactionFactory,
    MIGRATE_CERTIFICATE_FACTORY_MAP,
    MigrateCertificateFactory,
    COMMON_FACTORY_MAP,
    CommonFactory,
} from "@bfchain/pc-sdk-transactions";
import { SdkExceptionGenerator, API_ENDPOINT_NOT_FOUND } from "@bfchain/pc-sdk-exception";
const { ArgumentIllegalException } = SdkExceptionGenerator("Sdk", "Transactions-Server");

export function Router(bfchainCore: BFChainCore) {
    TransactionFactory(bfchainCore);
    MigrateCertificateFactory(bfchainCore);
    CommonFactory(bfchainCore);
}

export async function route(args: BFChainPcSdk.TransactionServer.RouterArgs) {
    const txFactory = TRANSACTION_FACTORY_MAP.get((args as BFChainPcSdk.TransactionServer.TransactionRouterArgs).pathname);
    if (txFactory) {
        return await txFactory.generateTransaction((args as BFChainPcSdk.TransactionServer.TransactionRouterArgs).params);
    }
    const commonFactory = COMMON_FACTORY_MAP.get((args as BFChainPcSdk.TransactionServer.CommonRouterArgs).pathname);
    if (commonFactory) {
        return await commonFactory.exec((args as BFChainPcSdk.TransactionServer.CommonRouterArgs).params);
    }
    const migrateCertificateFactory = MIGRATE_CERTIFICATE_FACTORY_MAP.get((args as BFChainPcSdk.TransactionServer.MigrateCertificateRouterArgs).pathname);
    if (migrateCertificateFactory) {
        return await migrateCertificateFactory.generate((args as BFChainPcSdk.TransactionServer.MigrateCertificateRouterArgs).params);
    }
    throw new ArgumentIllegalException(API_ENDPOINT_NOT_FOUND, {
        target: "request",
        function: "route",
        description: `api ${args.pathname} not found`,
    });
}

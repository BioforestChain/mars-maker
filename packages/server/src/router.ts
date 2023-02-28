import type { BFChainCore } from "@bfchain/core";
import { COMMON_FACTORY_MAP_WM, CommonFactory } from "./atom_common";
import { TRANSACTION_FACTORY_MAP_WM, TransactionFactory } from "./atom_transaction";
import { MIGRATE_CERTIFICATE_FACTORY_MAP_WM, MigrateCertificateFactory } from "./migrate_certificate";
import { TransactionMakerExceptionGenerator, ERROR_LIST } from "./exception";
const { ArgumentIllegalException } = TransactionMakerExceptionGenerator("TransactionMaker", "Server");

export function Router(bfchainCore: BFChainCore) {
    TransactionFactory(bfchainCore);
    MigrateCertificateFactory(bfchainCore);
    CommonFactory(bfchainCore);
}

export async function route(args: TransactionMaker.Server.RouterArgs, bfchainCore: BFChainCore) {
    const TRANSACTION_FACTORY_MAP = TRANSACTION_FACTORY_MAP_WM.forceGet(bfchainCore);
    const txFactory = TRANSACTION_FACTORY_MAP.get((args as TransactionMaker.Server.TransactionRouterArgs).pathname);
    if (txFactory) {
        return await txFactory.generateTransaction((args as TransactionMaker.Server.TransactionRouterArgs).params);
    }
    const COMMON_FACTORY_MAP = COMMON_FACTORY_MAP_WM.forceGet(bfchainCore);
    const commonFactory = COMMON_FACTORY_MAP.get((args as TransactionMaker.Server.CommonRouterArgs).pathname);
    if (commonFactory) {
        return await commonFactory.exec((args as TransactionMaker.Server.CommonRouterArgs).params);
    }
    const MIGRATE_CERTIFICATE_FACTORY_MAP = MIGRATE_CERTIFICATE_FACTORY_MAP_WM.forceGet(bfchainCore);
    const migrateCertificateFactory = MIGRATE_CERTIFICATE_FACTORY_MAP.get((args as TransactionMaker.Server.MigrateCertificateRouterArgs).pathname);
    if (migrateCertificateFactory) {
        return await migrateCertificateFactory.generate((args as TransactionMaker.Server.MigrateCertificateRouterArgs).params);
    }
    throw new ArgumentIllegalException(ERROR_LIST.API_ENDPOINT_NOT_FOUND, {
        apiPath: args.pathname,
    });
}

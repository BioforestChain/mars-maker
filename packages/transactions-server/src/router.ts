import type { BFChainCore } from "@bfchain/core";
import { TRANSACTION_FACTORY_MAP, TransactionFactory } from "@bfchain/pc-sdk-transactions";
import { SdkExceptionGenerator, API_ENDPOINT_NOT_FOUND } from "@bfchain/pc-sdk-exception";
const { ArgumentIllegalException } = SdkExceptionGenerator("Sdk", "Transactions-Server");

export function Router(bfchainCore: BFChainCore) {
    TransactionFactory(bfchainCore);
}

export async function route(pathname: BFChainPcSdk.Transaction.GENERATE_TRANSACTION_API_PATH, params: BFChainPcSdk.Transaction.TransactionCommonParams) {
    const txFactory = TRANSACTION_FACTORY_MAP.get(pathname);
    if (!txFactory) {
        throw new ArgumentIllegalException(API_ENDPOINT_NOT_FOUND, {
            target: "request",
            function: "route",
            description: `api ${pathname} not found`,
        });
    }
    return await txFactory.generateTransaction(params);
}

import type { EmigrateAssetTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { myEmigrateAsset } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

@Injectable()
export class EmigrateAssetFactory extends TransactionFactory<EmigrateAssetTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_EMIGRATE_ASSET;

    async generateTransaction(request: BFMetaPcSdk.Transaction.EmigrateAssetTransactionParams) {
        this.verify(request);
        const bfchainCore = this.bfchainCore;
        const config = bfchainCore.config;
        const { chainName, magic, generatorPublicKey, signature } = config;
        const migrateCertificate = request.migrateCertificate;
        await bfchainCore.migrateCertificateHelper.verifyMigrateCertificate(migrateCertificate, {
            forceCheckFromAuthSignature: true,
            forceCheckFromChainInfo: true,
            fromChainBaseConfig: {
                chainName,
                magic,
                generatorPublicKey,
                genesisBlockSignature: signature,
                genesisDelegates: bfchainCore.transactionHelper.genesisDelegates(config),
            },
        });
        const tr = await myEmigrateAsset.generateEmigrateAsset(
            this.getTransactionBody(request),
            { migrateCertificate: JSON.stringify(request.migrateCertificate) },
            this.getAccountPowInfo(request),
            bfchainCore
        );
        return tr.toJSON();
    }
}

import type { ImmigrateAssetTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { myImmigrateAsset } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

@Injectable()
export class ImmigrateAssetFactory extends TransactionFactory<ImmigrateAssetTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_IMMIGRATE_ASSET;

    async generateTransaction(request: TransactionMaker.Transaction.ImmigrateAssetTransactionParams) {
        this.verify(request);
        const bfchainCore = this.bfchainCore;
        const config = bfchainCore.config;
        const { chainName, magic, generatorPublicKey, signature } = config;
        const migrateCertificate = request.migrateCertificate;
        await bfchainCore.migrateCertificateHelper.verifyMigrateCertificate(migrateCertificate, {
            forceCheckFromAuthSignature: true,
            forceCheckToAuthSignature: true,
            forceCheckToChainInfo: true,
            toChainBaseConfig: {
                chainName,
                magic,
                generatorPublicKey,
                genesisBlockSignature: signature,
                genesisDelegates: bfchainCore.transactionHelper.genesisDelegates(config),
            },
        });
        const tr = await myImmigrateAsset.generateImmigrateAsset(
            this.getTransactionBody(request),
            { migrateCertificate: JSON.stringify(migrateCertificate) },
            this.getAccountPowInfo(request),
            bfchainCore
        );
        return tr.toJSON();
    }
}

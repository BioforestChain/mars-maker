import type { DestoryEntityTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { _TransactionFactory } from "./_transactionFactory";
import { myDestoryEntity } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

@Injectable()
export class DestoryEntityFactory extends _TransactionFactory<DestoryEntityTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_DESTORY_ENTITY;

    async generateTransaction(request: TransactionMaker.Transaction.DestoryEntityTransactionParams) {
        this.verify(request);
        const { transactionSignature, entityId, entityFactoryApplicant, entityFactoryPossessor, entityFactory } = request.entityInfo;
        const { magic, chainName } = this.bfchainCore.config;
        const tr = await myDestoryEntity.generateDestoryEntity(
            this.getTransactionBody(request),
            {
                transactionSignature,
                sourceChainMagic: magic,
                sourceChainName: chainName,
                entityId,
                entityFactoryApplicant,
                entityFactoryPossessor,
                entityFactory: {
                    sourceChainMagic: entityFactory.sourceChainMagic || magic,
                    sourceChainName: entityFactory.sourceChainName || chainName,
                    factoryId: entityFactory.factoryId,
                    entityPrealnum: entityFactory.entityPrealnum,
                    entityFrozenAssetPrealnum: entityFactory.entityFrozenAssetPrealnum,
                    purchaseAssetPrealnum: entityFactory.purchaseAssetPrealnum,
                },
            },
            this.getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }
}

import type { IssueEntityTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { _TransactionFactory } from "./_transactionFactory";
import { myIssueEntityV1 } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

@Injectable()
export class IssueEntityFactory extends _TransactionFactory<IssueEntityTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ENTITY;

    async generateTransaction(request: TransactionMaker.Transaction.IssueEntityTransactionParams) {
        this.verify(request);
        const { entityId, entityFactoryPossessor, entityFactory, taxAssetPrealnum } = request.entityInfo;
        const { magic, chainName } = this.bfchainCore.config;
        const tr = await myIssueEntityV1.generateEntity(
            this.getTransactionBody(request),
            {
                sourceChainMagic: magic,
                sourceChainName: chainName,
                entityId: `${entityFactory.factoryId}_${entityId}`,
                taxAssetPrealnum: taxAssetPrealnum || "0",
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

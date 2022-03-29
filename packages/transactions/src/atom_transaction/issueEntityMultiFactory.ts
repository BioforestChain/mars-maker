import type { IssueEntityMultiTransactionV1 } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { myIssueEntityMultiV1 } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

@Injectable()
export class IssueEntityMultiFactory extends TransactionFactory<IssueEntityMultiTransactionV1> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ENTITY_MULTI;

    async generateTransaction(request: BFChainPcSdk.Transaction.IssueEntityMultiTransactionParams) {
        this.verify(request);
        const { entityStructList, entityFactoryPossessor, entityFactory } = request.entityInfo;
        const { magic, chainName } = this.bfchainCore.config;
        const tr = await myIssueEntityMultiV1.generateEntityMulti(
            this.getTransactionBody(request),
            {
                sourceChainMagic: magic,
                sourceChainName: chainName,
                entityStructList: entityStructList.map((item) => {
                    return {
                        entityId: `m_${entityFactory.factoryId}_${item.entityId}`,
                        taxAssetPrealnum: item.taxAssetPrealnum || "0",
                    };
                }),
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

import type { IssueEntityFactoryTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { myIssueEntityFactory } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

@Injectable()
export class IssueEntityFactoryFactory extends TransactionFactory<IssueEntityFactoryTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ENTITY_FACTORY;

    async generateTransaction(request: TransactionMaker.Transaction.IssueEntityFactoryTransactionParams) {
        this.verify(request);
        const factoryInfo = request.factoryInfo;
        const { magic, chainName } = this.bfchainCore.config;
        const tr = await myIssueEntityFactory.generateEntityFactory(
            this.getTransactionBody(request),
            {
                sourceChainMagic: magic,
                sourceChainName: chainName,
                ...factoryInfo,
            },
            this.getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }
}

import type { IssueEntityFactoryTransactionV1 } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { myIssueEntityFactoryV1 } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

@Injectable()
export class IssueEntityFactoryV1Factory extends TransactionFactory<IssueEntityFactoryTransactionV1> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ENTITY_FACTORY_V1;

    async generateTransaction(
        request: BFChainPcSdk.Transaction.IssueEntityFactoryTransactionV1Params
    ): Promise<BFChainCore.IssueEntityFactoryTransactionV1JSON> {
        this.verify(request);
        const factoryInfo = request.factoryInfo;
        const { magic, chainName } = this.bfchainCore.config;
        const tr = await myIssueEntityFactoryV1.generateEntityFactory(
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

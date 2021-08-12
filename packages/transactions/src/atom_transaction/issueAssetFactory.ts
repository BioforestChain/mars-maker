import type { IssueAssetTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { myIssueAsset } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

@Injectable()
export class IssueAssetFactory extends TransactionFactory<IssueAssetTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ASSET;

    async generateTransaction(request: BFChainPcSdk.Transaction.IssueAssetTransactionParams) {
        this.verify(request);
        const assetInfo = request.assetInfo;
        const { magic, chainName } = this.bfchainCore.config;
        const tr = await myIssueAsset.generateAsset(
            this.getTransactionBody(request),
            {
                sourceChainMagic: magic,
                sourceChainName: chainName,
                assetType: assetInfo.assetType,
                expectedIssuedAssets: assetInfo.expectedIssuedAssets,
            },
            this.getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }
}

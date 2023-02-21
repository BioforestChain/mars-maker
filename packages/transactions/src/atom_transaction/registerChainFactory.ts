import type { RegisterChainTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { myRegisterChain } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

@Injectable()
export class RegisterChainFactory extends TransactionFactory<RegisterChainTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_REGISTER_CHAIN;

    async generateTransaction(request: BFMetaPcSdk.Transaction.RegisterChainTransactionParams) {
        this.verify(request);
        const tr = await myRegisterChain.generateRegisterChain(
            this.getTransactionBody(request),
            this.getAccountPowInfo(request),
            request.genesisBlock,
            this.bfchainCore
        );
        return tr.toJSON();
    }
}

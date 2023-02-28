import type { RegisterChainTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { myRegisterChain } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

@Injectable()
export class RegisterChainFactory extends TransactionFactory<RegisterChainTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_REGISTER_CHAIN;

    async generateTransaction(request: TransactionMaker.Transaction.RegisterChainTransactionParams) {
        this.verify(request);
        const tr = await myRegisterChain.generateRegisterChain(
            this.getTransactionBody(request),
            this.getAccountPowInfo(request),
            this.bfchainCore.registerChainCertificateHelper.encode(request.registerCertificate as any),
            this.bfchainCore
        );
        return tr.toJSON();
    }
}

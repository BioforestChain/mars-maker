import { API_NAMESPACE, REQUEST_PROTOCOL, REQUEST_TYPE } from "@bfchain/pc-sdk-api-constants";

export abstract class TransactionApi<T extends BFChainCore.TransactionJSON> {
    private readonly __API_NAMESPACE = API_NAMESPACE.TRANSACTION;
    abstract readonly GENERATE_API_PATH: BFChainPcSdk.Transaction.GENERATE_TRANSACTION_API_PATH;

    constructor(protected networkHelper: BFChainPcSdk.NetworkHelper) {}

    async generateTransaction(argv: BFChainPcSdk.Transaction.TransactionCommonParams) {
        const apiPath = `${this.networkHelper.TRANSACTION_SERVER_URL_PREFIX}${this.GENERATE_API_PATH}`;
        try {
            const result = await this.networkHelper.createTransaction<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<T>>(apiPath, argv);
            return result;
        } catch (e) {
            const errorInfo: BFChainPcSdk.TransactionServer.GenerateTransactionFailureReturn = {
                success: false,
                error: {
                    code: "7001",
                    message: `request api ${apiPath} error`,
                    description: e.message,
                },
            };
            return errorInfo;
        }
    }

    async broadcastTransaction(transaction: T) {
        // FIXME: 兼容老燕辉设计的神奇的 api
        const apiPath = `${this.networkHelper.URL_PREFIX}${this.networkHelper.REQUEST_PROTOCOL === REQUEST_PROTOCOL.WEBSOCKET ? REQUEST_TYPE.POST + "/" : ""}${
            this.__API_NAMESPACE
        }`;
        try {
            const result = await this.networkHelper.sendPostRequest<BFChainPcSdk.Transaction.TransactionApiReturn<T>>(apiPath, transaction);
            return result;
        } catch (e) {
            const errorInfo: BFChainPcSdk.Transaction.TransactionApiFailureReturn = {
                success: false,
                error: {
                    code: "7001",
                    message: `request api ${apiPath} error`,
                    description: e.message,
                },
                minFee: transaction.fee,
            };
            return errorInfo;
        }
    }

    async sendTransaction(argv: BFChainPcSdk.Transaction.TransactionCommonParams) {
        const generateResult = await this.generateTransaction(argv);
        if (!generateResult.success) {
            // FIXME: 更好的写法
            return { ...generateResult, minFee: argv.fee };
        }
        const broadcastResult = await this.broadcastTransaction(generateResult.transaction);
        return broadcastResult;
    }
}

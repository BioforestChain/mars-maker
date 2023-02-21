export abstract class CommonApi<T> {
    abstract readonly EXEC_API_PATH: BFMetaPcSdk.Common.COMMON_API_PATH;

    constructor(protected networkHelper: BFMetaPcSdk.NetworkHelper) {}

    async sendPostRequest(argv: BFMetaPcSdk.Common.CommonParams) {
        const apiPath = `${this.networkHelper.TRANSACTION_SERVER_URL_PREFIX}${this.EXEC_API_PATH}`;
        try {
            const result = await this.networkHelper.createTransaction<BFMetaPcSdk.TransactionServer.CommonSuccessReturn<T>>(apiPath, argv);
            return result;
        } catch (e) {
            const errorInfo: BFMetaPcSdk.TransactionServer.CommonFailureReturn = {
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
}

declare namespace BFChainPcSdk {
    namespace TransactionServer {
        interface GenerateTransactionFailureReturn {
            success: false;
            error: {
                code: string;
                message: string;
                description?: string;
            };
        }
        interface GenerateTransactionSuccessReturn<T extends object> {
            success: true;
            transaction: T;
        }

        type GenerateTransactionReturn<T extends BFChainCore.TransactionJSON> = GenerateTransactionFailureReturn | GenerateTransactionSuccessReturn<T>;
    }
}

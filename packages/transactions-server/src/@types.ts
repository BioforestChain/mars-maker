declare namespace BFChainPcSdk {
    namespace TransactionServer {
        interface TransactionRouterArgs {
            pathname: BFChainPcSdk.Transaction.GENERATE_TRANSACTION_API_PATH;
            params: BFChainPcSdk.Transaction.TransactionCommonParams;
        }

        interface MigrateCertificateRouterArgs {
            pathname: BFChainPcSdk.CrossChain.MIGRATE_CERTIFICATE_API_PATH;
            params: BFChainPcSdk.CrossChain.MigrateCertificateArgs;
        }

        interface CommonRouterArgs {
            pathname: BFChainPcSdk.Common.COMMON_API_PATH;
            params: BFChainPcSdk.Common.CommonParams;
        }

        type RouterArgs = TransactionRouterArgs | MigrateCertificateRouterArgs | CommonRouterArgs;

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
            result: T;
        }

        type GenerateTransactionReturn<T extends BFChainCore.TransactionJSON> = GenerateTransactionFailureReturn | GenerateTransactionSuccessReturn<T>;

        type MigrateCertificateFailureReturn = GenerateTransactionFailureReturn;
        interface MigrateCertificateSuccessReturn {
            success: true;
            result: BFChainCore.CrossChain.MigrateCertificateJSON;
        }

        type MigrateCertificateReturn = MigrateCertificateFailureReturn | MigrateCertificateSuccessReturn;

        interface CommonFailureReturn {
            success: false;
            error: {
                code: string;
                message: string;
                description?: string;
            };
        }
        interface CommonSuccessReturn<T> {
            success: true;
            result: T;
        }

        type CommonReturn<T> = CommonFailureReturn | CommonSuccessReturn<T>;
    }
}

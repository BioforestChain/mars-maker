declare namespace BFMetaPcSdk {
    namespace TransactionServer {
        interface TransactionRouterArgs {
            pathname: BFMetaPcSdk.Transaction.GENERATE_TRANSACTION_API_PATH;
            params: BFMetaPcSdk.Transaction.TransactionCommonParams;
        }

        interface MigrateCertificateRouterArgs {
            pathname: BFMetaPcSdk.CrossChain.MIGRATE_CERTIFICATE_API_PATH;
            params: BFMetaPcSdk.CrossChain.MigrateCertificateArgs;
        }

        interface CommonRouterArgs {
            pathname: BFMetaPcSdk.Common.COMMON_API_PATH;
            params: BFMetaPcSdk.Common.CommonParams;
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

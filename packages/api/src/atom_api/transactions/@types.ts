declare namespace BFChainPcSdk {
    namespace Transaction {
        type TransactionApi = import("./apis/_transactionApi").TransactionApi<any>;
        type UsernameApi = import("./apis").UsernameApi;
        type SignatureApi = import("./apis").SignatureApi;
        type DelegateApi = import("./apis").DelegateApi;
        type AcceptVoteApi = import("./apis").AcceptVoteApi;
        type RejectVoteApi = import("./apis").RejectVoteApi;
        type VoteApi = import("./apis").VoteApi;

        type IssueAssetApi = import("./apis").IssueAssetApi;
        type TransferAssetApi = import("./apis").TransferAssetApi;
        type DestoryAssetApi = import("./apis").DestoryAssetApi;
        type GiftAssetApi = import("./apis").GiftAssetApi;
        type GrabAssetApi = import("./apis").GrabAssetApi;
        type TrustAssetApi = import("./apis").TrustAssetApi;
        type SignForAssetApi = import("./apis").SignForAssetApi;
        type ToExchangeAssetApi = import("./apis").ToExchangeAssetApi;
        type BeExchangeAssetApi = import("./apis").BeExchangeAssetApi;

        type DAppApi = import("./apis").DAppApi;
        type DAppPurchasingApi = import("./apis").DAppPurchasingApi;
        type MarkApi = import("./apis").MarkApi;
        type LocationNameApi = import("./apis").LocationNameApi;
        type SetLnsManagerApi = import("./apis").SetLnsManagerApi;
        type SetLnsRecordValueApi = import("./apis").SetLnsRecordValueApi;
        type ToExchangeSpecialAssetApi = import("./apis").ToExchangeSpecialAssetApi;
        type BeExchangeSpecialAssetApi = import("./apis").BeExchangeSpecialAssetApi;

        interface TransactionApiSuccessReturn<T extends object> extends ApiSuccessReturn {
            result: T;
            minFee: string;
        }
        interface TransactionApiFailureReturn extends ApiFailureReturn {
            minFee: string;
        }
        type TransactionApiReturn<T extends BFChainCore.TransactionJSON> = TransactionApiSuccessReturn<T> | TransactionApiFailureReturn;
    }
}

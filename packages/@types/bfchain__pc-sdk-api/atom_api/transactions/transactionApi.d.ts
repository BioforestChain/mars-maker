export declare class TransactionApi {
    private __networkHelper;
    private __TRANSACTION_API_MAP;
    private __MIGRATE_CERTIFICATE_API_MAP;
    private __COMMON_API_MAP;
    constructor(__networkHelper: BFMetaPcSdk.NetworkHelper);
    private __init;
    private __getTransactionApi;
    broadcastTransaction(argv: BFChainCore.TransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<BFChainCore.TransactionJSON<object>>>;
    generateUsername(argv: BFMetaPcSdk.Transaction.UsernameTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.UsernameAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    broadcastUsername(transaction: BFChainCore.UsernameTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.UsernameAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    sendUsername(argv: BFMetaPcSdk.Transaction.UsernameTransactionParams): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.UsernameAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    generateSignature(argv: BFMetaPcSdk.Transaction.SignatureTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.SignatureAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    broadcastSignature(transaction: BFChainCore.SignatureTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.SignatureAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    sendSignature(argv: BFMetaPcSdk.Transaction.SignatureTransactionParams): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.SignatureAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    generateDelegate(argv: BFMetaPcSdk.Transaction.DelegateTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.DelegateAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    broadcastDelegate(transaction: BFChainCore.DelegateTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.DelegateAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    sendDelegate(argv: BFMetaPcSdk.Transaction.DelegateTransactionParams): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.DelegateAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    generateAcceptVote(argv: BFMetaPcSdk.Transaction.AcceptVoteTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.AcceptVoteAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    broadcastAcceptVote(transaction: BFChainCore.AcceptVoteTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.AcceptVoteAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    sendAcceptVote(argv: BFMetaPcSdk.Transaction.AcceptVoteTransactionParams): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.AcceptVoteAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    generateRejectVote(argv: BFMetaPcSdk.Transaction.RejectVoteTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.RejectVoteAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    broadcastRejectVote(transaction: BFChainCore.RejectVoteTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.RejectVoteAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    sendRejectVote(argv: BFMetaPcSdk.Transaction.RejectVoteTransactionParams): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.RejectVoteAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    generateVote(argv: BFMetaPcSdk.Transaction.VoteTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.VoteAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastVote(transaction: BFChainCore.VoteTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.VoteAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendVote(argv: BFMetaPcSdk.Transaction.VoteTransactionParams): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.VoteAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateIssueAsset(argv: BFMetaPcSdk.Transaction.IssueAssetTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.IssueAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastIssueAsset(transaction: BFChainCore.IssueAssetTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.IssueAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendIssueAsset(argv: BFMetaPcSdk.Transaction.IssueAssetTransactionParams): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.IssueAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateTransferAsset(argv: BFMetaPcSdk.Transaction.TransferAssetTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.TransferAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastTransferAsset(transaction: BFChainCore.TransferAssetTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.TransferAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendTransferAsset(argv: BFMetaPcSdk.Transaction.TransferAssetTransactionParams): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.TransferAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateDestoryAsset(argv: BFMetaPcSdk.Transaction.DestoryAssetTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.DestoryAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastDestoryAsset(transaction: BFChainCore.DestoryAssetTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.DestoryAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendDestoryAsset(argv: BFMetaPcSdk.Transaction.DestoryAssetTransactionParams): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.DestoryAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateGiftAsset(argv: BFMetaPcSdk.Transaction.GiftAssetTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.GiftAssetAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    broadcastGiftAsset(transaction: BFChainCore.GiftAssetTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.GiftAssetAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    sendGiftAsset(argv: BFMetaPcSdk.Transaction.GiftAssetTransactionParams): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.GiftAssetAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    generateGrabAsset(argv: BFMetaPcSdk.Transaction.GrabAssetTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.GrabAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastGrabAsset(transaction: BFChainCore.GrabAssetTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.GrabAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendGrabAsset(argv: BFMetaPcSdk.Transaction.GrabAssetTransactionParams): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.GrabAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateTrustAsset(argv: BFMetaPcSdk.Transaction.TrustAssetTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.TrustAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastTrustAsset(transaction: BFChainCore.TrustAssetTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.TrustAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendTrustAsset(argv: BFMetaPcSdk.Transaction.TrustAssetTransactionParams): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.TrustAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateSignForAsset(argv: BFMetaPcSdk.Transaction.SignForAssetTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.SignForAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastSignForAsset(transaction: BFChainCore.SignForAssetTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.SignForAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendSignForAsset(argv: BFMetaPcSdk.Transaction.SignForAssetTransactionParams): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.SignForAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateToExchangeAsset(argv: BFMetaPcSdk.Transaction.ToExchangeAssetTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.ToExchangeAssetAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    broadcastToExchangeAsset(transaction: BFChainCore.ToExchangeAssetTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.ToExchangeAssetAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    sendToExchangeAsset(argv: BFMetaPcSdk.Transaction.ToExchangeAssetTransactionParams): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.ToExchangeAssetAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    generateBeExchangeAsset(argv: BFMetaPcSdk.Transaction.BeExchangeAssetTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.BeExchangeAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastBeExchangeAsset(transaction: BFChainCore.BeExchangeAssetTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.BeExchangeAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendBeExchangeAsset(argv: BFMetaPcSdk.Transaction.BeExchangeAssetTransactionParams): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.BeExchangeAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateDApp(argv: BFMetaPcSdk.Transaction.DAppTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.DAppAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastDApp(transaction: BFChainCore.DAppTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.DAppAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendDApp(argv: BFMetaPcSdk.Transaction.DAppTransactionParams): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.DAppAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateDAppPurchasing(argv: BFMetaPcSdk.Transaction.DAppPurchasingTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.DAppPurchasingAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastDAppPurchasing(transaction: BFChainCore.DAppPurchasingTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.DAppPurchasingAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendDAppPurchasing(argv: BFMetaPcSdk.Transaction.DAppPurchasingTransactionParams): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.DAppPurchasingAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateMark(argv: BFMetaPcSdk.Transaction.MarkTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.MarkAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastMark(transaction: BFChainCore.MarkTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.MarkAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendMark(argv: BFMetaPcSdk.Transaction.MarkTransactionParams): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.MarkAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateLocationName(argv: BFMetaPcSdk.Transaction.LocationNameTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.LocationNameAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastLocationName(transaction: BFChainCore.LocationNameTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.LocationNameAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendLocationName(argv: BFMetaPcSdk.Transaction.LocationNameTransactionParams): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.LocationNameAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateSetLnsManager(argv: BFMetaPcSdk.Transaction.SetLnsManagerTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.SetLnsManagerAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastSetLnsManager(transaction: BFChainCore.SetLnsManagerTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.SetLnsManagerAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendSetLnsManager(argv: BFMetaPcSdk.Transaction.SetLnsManagerTransactionParams): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.SetLnsManagerAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateSetLnsRecordValue(argv: BFMetaPcSdk.Transaction.SetLnsRecordValueTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.SetLnsRecordValueAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    broadcastSetLnsRecordValue(transaction: BFChainCore.SetLnsRecordValueTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.SetLnsRecordValueAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    sendSetLnsRecordValue(argv: BFMetaPcSdk.Transaction.SetLnsRecordValueTransactionParams): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.SetLnsRecordValueAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    generateToExchangeSpecialAsset(argv: BFMetaPcSdk.Transaction.ToExchangeSpecialAssetTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.ToExchangeSpecialAssetAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    broadcastToExchangeSpecialAsset(transaction: BFChainCore.ToExchangeSpecialAssetTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.ToExchangeSpecialAssetAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    sendToExchangeSpecialAsset(argv: BFMetaPcSdk.Transaction.ToExchangeSpecialAssetTransactionParams): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.ToExchangeSpecialAssetAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    generateBeExchangeSpecialAsset(argv: BFMetaPcSdk.Transaction.BeExchangeSpecialAssetTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.BeExchangeSpecialAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastBeExchangeSpecialAsset(transaction: BFChainCore.BeExchangeSpecialAssetTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.BeExchangeSpecialAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendBeExchangeSpecialAsset(argv: BFMetaPcSdk.Transaction.BeExchangeSpecialAssetTransactionParams): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.BeExchangeSpecialAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateIssueEntityFactory(argv: BFMetaPcSdk.Transaction.IssueEntityFactoryTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.IssueEntityFactoryAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastIssueEntityFactory(transaction: BFChainCore.IssueEntityFactoryTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.IssueEntityFactoryAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendIssueEntityFactory(argv: BFMetaPcSdk.Transaction.IssueEntityFactoryTransactionParams): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.IssueEntityFactoryAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateIssueEntityFactoryV1(argv: BFMetaPcSdk.Transaction.IssueEntityFactoryTransactionV1Params): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.IssueEntityFactoryAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastIssueEntityFactoryV1(transaction: BFChainCore.IssueEntityFactoryTransactionV1JSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.IssueEntityFactoryAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendIssueEntityFactoryV1(argv: BFMetaPcSdk.Transaction.IssueEntityFactoryTransactionV1Params): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.IssueEntityFactoryAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateIssueEntity(argv: BFMetaPcSdk.Transaction.IssueEntityTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.IssueEntityAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastIssueEntity(transaction: BFChainCore.IssueEntityTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.IssueEntityAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendIssueEntity(argv: BFMetaPcSdk.Transaction.IssueEntityTransactionParams): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.IssueEntityAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateDestoryEntity(argv: BFMetaPcSdk.Transaction.DestoryEntityTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.DestoryEntityAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastDestoryEntity(transaction: BFChainCore.DestoryEntityTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.DestoryEntityAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendDestoryEntity(argv: BFMetaPcSdk.Transaction.DestoryEntityTransactionParams): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.DestoryEntityAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateToExchangeAny(argv: BFMetaPcSdk.Transaction.ToExchangeAnyTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.ToExchangeAnyAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    broadcastToExchangeAny(transaction: BFChainCore.ToExchangeAnyTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.ToExchangeAnyAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    sendToExchangeAny(argv: BFMetaPcSdk.Transaction.ToExchangeAnyTransactionParams): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.ToExchangeAnyAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    generateBeExchangeAny(argv: BFMetaPcSdk.Transaction.BeExchangeAnyTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.BeExchangeAnyAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastBeExchangeAny(transaction: BFChainCore.BeExchangeAnyTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.BeExchangeAnyAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendBeExchangeAny(argv: BFMetaPcSdk.Transaction.BeExchangeAnyTransactionParams): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.BeExchangeAnyAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateTransferAny(argv: BFMetaPcSdk.Transaction.TransferAnyTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.TransferAnyAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastTransferAny(transaction: BFChainCore.TransferAnyTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.TransferAnyAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendTransferAny(argv: BFMetaPcSdk.Transaction.TransferAnyTransactionParams): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.TransferAnyAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateGiftAny(argv: BFMetaPcSdk.Transaction.GiftAnyTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.GiftAnyAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    broadcastGiftAny(transaction: BFChainCore.GiftAnyTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.GiftAnyAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    sendGiftAny(argv: BFMetaPcSdk.Transaction.GiftAnyTransactionParams): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.GiftAnyAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    generateGrabAny(argv: BFMetaPcSdk.Transaction.GrabAnyTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.GrabAnyAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastGrabAny(transaction: BFChainCore.GrabAnyTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.GrabAnyAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendGrabAny(argv: BFMetaPcSdk.Transaction.GrabAnyTransactionParams): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.GrabAnyAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateIssueEntityMulti(argv: BFMetaPcSdk.Transaction.IssueEntityMultiTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.IssueEntityMultiAssetV1JSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastIssueEntityMulti(transaction: BFChainCore.IssueEntityMultiTransactionV1JSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.IssueEntityMultiAssetV1JSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendIssueEntityMulti(argv: BFMetaPcSdk.Transaction.IssueEntityMultiTransactionParams): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.IssueEntityMultiAssetV1JSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateToExchangeAnyMulti(argv: BFMetaPcSdk.Transaction.ToExchangeAnyMultiTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.ToExchangeAnyMultiAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    broadcastToExchangeAnyMulti(transaction: BFChainCore.ToExchangeAnyMultiTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.ToExchangeAnyMultiAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    sendToExchangeAnyMulti(argv: BFMetaPcSdk.Transaction.ToExchangeAnyMultiTransactionParams): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.ToExchangeAnyMultiAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    generateBeExchangeAnyMulti(argv: BFMetaPcSdk.Transaction.BeExchangeAnyMultiTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.BeExchangeAnyMultiAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastBeExchangeAnyMulti(transaction: BFChainCore.BeExchangeAnyMultiTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.BeExchangeAnyMultiAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendBeExchangeAnyMulti(argv: BFMetaPcSdk.Transaction.BeExchangeAnyMultiTransactionParams): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.BeExchangeAnyMultiAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateRegisterChain(argv: BFMetaPcSdk.Transaction.RegisterChainTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.RegisterChainAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    broadcastRegisterChain(transaction: BFChainCore.RegisterChainTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.RegisterChainAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    sendRegisterChain(argv: BFMetaPcSdk.Transaction.RegisterChainTransactionParams): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.RegisterChainAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    generateEmigrateAsset(argv: BFMetaPcSdk.Transaction.EmigrateAssetTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.EmigrateAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastEmigrateAsset(transaction: BFChainCore.EmigrateAssetTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.EmigrateAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendEmigrateAsset(argv: BFMetaPcSdk.Transaction.EmigrateAssetTransactionParams): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.EmigrateAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateImmigrateAsset(argv: BFMetaPcSdk.Transaction.ImmigrateAssetTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.ImmigrateAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastImmigrateAsset(transaction: BFChainCore.ImmigrateAssetTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.ImmigrateAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendImmigrateAsset(argv: BFMetaPcSdk.Transaction.ImmigrateAssetTransactionParams): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.ImmigrateAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    private __getMigrateCertificateApi;
    generateMigrateCertificate(argv: BFMetaPcSdk.CrossChain.GenerateMigrateCertificateParams): Promise<BFMetaPcSdk.TransactionServer.MigrateCertificateReturn>;
    fromAuthSignatureMigrateCertificate(argv: BFChainCore.CrossChain.AuthSignMigrateCertificateArgs): Promise<BFMetaPcSdk.TransactionServer.MigrateCertificateReturn>;
    toAuthSignatureMigrateCertificate(argv: BFChainCore.CrossChain.AuthSignMigrateCertificateArgs): Promise<BFMetaPcSdk.TransactionServer.MigrateCertificateReturn>;
    private __getCommonApi;
    verifyAddress(argv: BFMetaPcSdk.Common.VerifyAddressParams): Promise<BFMetaPcSdk.TransactionServer.CommonFailureReturn | BFMetaPcSdk.TransactionServer.CommonSuccessReturn<boolean>>;
    verifyPublicKey(argv: BFMetaPcSdk.Common.VerifyPublicKeyParams): Promise<BFMetaPcSdk.TransactionServer.CommonFailureReturn | BFMetaPcSdk.TransactionServer.CommonSuccessReturn<boolean>>;
    generateAccount(argv: BFMetaPcSdk.Common.GenerateAccountParams): Promise<BFMetaPcSdk.TransactionServer.CommonFailureReturn | BFMetaPcSdk.TransactionServer.CommonSuccessReturn<BFMetaPcSdk.Common.AccountInfo>>;
    generateAddressBySecret(argv: BFMetaPcSdk.Common.GenerateAddressBySecretParams): Promise<BFMetaPcSdk.TransactionServer.CommonFailureReturn | BFMetaPcSdk.TransactionServer.CommonSuccessReturn<string>>;
    generateAddressByPublicKey(argv: BFMetaPcSdk.Common.GenerateAddressByPublicKeyParams): Promise<BFMetaPcSdk.TransactionServer.CommonFailureReturn | BFMetaPcSdk.TransactionServer.CommonSuccessReturn<string>>;
    generateKeypair(argv: BFMetaPcSdk.Common.GenerateKeypairParams): Promise<BFMetaPcSdk.TransactionServer.CommonFailureReturn | BFMetaPcSdk.TransactionServer.CommonSuccessReturn<BFMetaPcSdk.Common.Keypairs>>;
    asymmetricEncrypt(argv: BFMetaPcSdk.Common.AsymmetricEncryptParams): Promise<BFMetaPcSdk.TransactionServer.CommonFailureReturn | BFMetaPcSdk.TransactionServer.CommonSuccessReturn<BFMetaPcSdk.Common.AsymmetricEncrypt>>;
    asymmetricDecrypt(argv: BFMetaPcSdk.Common.AsymmetricDecryptParams): Promise<BFMetaPcSdk.TransactionServer.CommonFailureReturn | BFMetaPcSdk.TransactionServer.CommonSuccessReturn<BFMetaPcSdk.Common.AsymmetricDecrypt>>;
    calcTransactionMinFee(argv: BFMetaPcSdk.Common.CalcTransactionMinFeeParams): Promise<BFMetaPcSdk.TransactionServer.CommonFailureReturn | BFMetaPcSdk.TransactionServer.CommonSuccessReturn<BFMetaPcSdk.Common.TransactionMinFee>>;
    generateCiphertextSignature(argv: BFMetaPcSdk.Common.GenerateCiphertextSignatureParams): Promise<BFMetaPcSdk.TransactionServer.CommonFailureReturn | BFMetaPcSdk.TransactionServer.CommonSuccessReturn<string>>;
}

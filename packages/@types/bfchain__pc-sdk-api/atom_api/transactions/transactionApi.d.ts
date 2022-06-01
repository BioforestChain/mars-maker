export declare class TransactionApi {
    private __networkHelper;
    private __TRANSACTION_API_MAP;
    private __MIGRATE_CERTIFICATE_API_MAP;
    private __COMMON_API_MAP;
    constructor(__networkHelper: BFChainPcSdk.NetworkHelper);
    private __init;
    private __getTransactionApi;
    broadcastTransaction(argv: BFChainCore.TransactionJSON): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<BFChainCore.TransactionJSON<object>>>;
    generateUsername(argv: BFChainPcSdk.Transaction.UsernameTransactionParams): Promise<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.UsernameAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    broadcastUsername(transaction: BFChainCore.UsernameTransactionJSON): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.UsernameAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    sendUsername(argv: BFChainPcSdk.Transaction.UsernameTransactionParams): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.UsernameAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    generateSignature(argv: BFChainPcSdk.Transaction.SignatureTransactionParams): Promise<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.SignatureAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    broadcastSignature(transaction: BFChainCore.SignatureTransactionJSON): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.SignatureAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    sendSignature(argv: BFChainPcSdk.Transaction.SignatureTransactionParams): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.SignatureAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    generateDelegate(argv: BFChainPcSdk.Transaction.DelegateTransactionParams): Promise<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.DelegateAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    broadcastDelegate(transaction: BFChainCore.DelegateTransactionJSON): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.DelegateAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    sendDelegate(argv: BFChainPcSdk.Transaction.DelegateTransactionParams): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.DelegateAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    generateAcceptVote(argv: BFChainPcSdk.Transaction.AcceptVoteTransactionParams): Promise<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.AcceptVoteAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    broadcastAcceptVote(transaction: BFChainCore.AcceptVoteTransactionJSON): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.AcceptVoteAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    sendAcceptVote(argv: BFChainPcSdk.Transaction.AcceptVoteTransactionParams): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.AcceptVoteAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    generateRejectVote(argv: BFChainPcSdk.Transaction.RejectVoteTransactionParams): Promise<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.RejectVoteAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    broadcastRejectVote(transaction: BFChainCore.RejectVoteTransactionJSON): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.RejectVoteAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    sendRejectVote(argv: BFChainPcSdk.Transaction.RejectVoteTransactionParams): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.RejectVoteAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    generateVote(argv: BFChainPcSdk.Transaction.VoteTransactionParams): Promise<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.VoteAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastVote(transaction: BFChainCore.VoteTransactionJSON): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.VoteAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendVote(argv: BFChainPcSdk.Transaction.VoteTransactionParams): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.VoteAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateIssueAsset(argv: BFChainPcSdk.Transaction.IssueAssetTransactionParams): Promise<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.IssueAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastIssueAsset(transaction: BFChainCore.IssueAssetTransactionJSON): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.IssueAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendIssueAsset(argv: BFChainPcSdk.Transaction.IssueAssetTransactionParams): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.IssueAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateTransferAsset(argv: BFChainPcSdk.Transaction.TransferAssetTransactionParams): Promise<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.TransferAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastTransferAsset(transaction: BFChainCore.TransferAssetTransactionJSON): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.TransferAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendTransferAsset(argv: BFChainPcSdk.Transaction.TransferAssetTransactionParams): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.TransferAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateDestoryAsset(argv: BFChainPcSdk.Transaction.DestoryAssetTransactionParams): Promise<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.DestoryAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastDestoryAsset(transaction: BFChainCore.DestoryAssetTransactionJSON): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.DestoryAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendDestoryAsset(argv: BFChainPcSdk.Transaction.DestoryAssetTransactionParams): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.DestoryAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateGiftAsset(argv: BFChainPcSdk.Transaction.GiftAssetTransactionParams): Promise<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.GiftAssetAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    broadcastGiftAsset(transaction: BFChainCore.GiftAssetTransactionJSON): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.GiftAssetAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    sendGiftAsset(argv: BFChainPcSdk.Transaction.GiftAssetTransactionParams): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.GiftAssetAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    generateGrabAsset(argv: BFChainPcSdk.Transaction.GrabAssetTransactionParams): Promise<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.GrabAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastGrabAsset(transaction: BFChainCore.GrabAssetTransactionJSON): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.GrabAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendGrabAsset(argv: BFChainPcSdk.Transaction.GrabAssetTransactionParams): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.GrabAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateTrustAsset(argv: BFChainPcSdk.Transaction.TrustAssetTransactionParams): Promise<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.TrustAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastTrustAsset(transaction: BFChainCore.TrustAssetTransactionJSON): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.TrustAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendTrustAsset(argv: BFChainPcSdk.Transaction.TrustAssetTransactionParams): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.TrustAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateSignForAsset(argv: BFChainPcSdk.Transaction.SignForAssetTransactionParams): Promise<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.SignForAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastSignForAsset(transaction: BFChainCore.SignForAssetTransactionJSON): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.SignForAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendSignForAsset(argv: BFChainPcSdk.Transaction.SignForAssetTransactionParams): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.SignForAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateToExchangeAsset(argv: BFChainPcSdk.Transaction.ToExchangeAssetTransactionParams): Promise<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.ToExchangeAssetAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    broadcastToExchangeAsset(transaction: BFChainCore.ToExchangeAssetTransactionJSON): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.ToExchangeAssetAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    sendToExchangeAsset(argv: BFChainPcSdk.Transaction.ToExchangeAssetTransactionParams): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.ToExchangeAssetAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    generateBeExchangeAsset(argv: BFChainPcSdk.Transaction.BeExchangeAssetTransactionParams): Promise<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.BeExchangeAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastBeExchangeAsset(transaction: BFChainCore.BeExchangeAssetTransactionJSON): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.BeExchangeAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendBeExchangeAsset(argv: BFChainPcSdk.Transaction.BeExchangeAssetTransactionParams): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.BeExchangeAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateDApp(argv: BFChainPcSdk.Transaction.DAppTransactionParams): Promise<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.DAppAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastDApp(transaction: BFChainCore.DAppTransactionJSON): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.DAppAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendDApp(argv: BFChainPcSdk.Transaction.DAppTransactionParams): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.DAppAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateDAppPurchasing(argv: BFChainPcSdk.Transaction.DAppPurchasingTransactionParams): Promise<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.DAppPurchasingAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastDAppPurchasing(transaction: BFChainCore.DAppPurchasingTransactionJSON): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.DAppPurchasingAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendDAppPurchasing(argv: BFChainPcSdk.Transaction.DAppPurchasingTransactionParams): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.DAppPurchasingAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateMark(argv: BFChainPcSdk.Transaction.MarkTransactionParams): Promise<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.MarkAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastMark(transaction: BFChainCore.MarkTransactionJSON): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.MarkAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendMark(argv: BFChainPcSdk.Transaction.MarkTransactionParams): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.MarkAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateLocationName(argv: BFChainPcSdk.Transaction.LocationNameTransactionParams): Promise<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.LocationNameAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastLocationName(transaction: BFChainCore.LocationNameTransactionJSON): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.LocationNameAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendLocationName(argv: BFChainPcSdk.Transaction.LocationNameTransactionParams): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.LocationNameAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateSetLnsManager(argv: BFChainPcSdk.Transaction.SetLnsManagerTransactionParams): Promise<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.SetLnsManagerAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastSetLnsManager(transaction: BFChainCore.SetLnsManagerTransactionJSON): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.SetLnsManagerAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendSetLnsManager(argv: BFChainPcSdk.Transaction.SetLnsManagerTransactionParams): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.SetLnsManagerAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateSetLnsRecordValue(argv: BFChainPcSdk.Transaction.SetLnsRecordValueTransactionParams): Promise<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.SetLnsRecordValueAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    broadcastSetLnsRecordValue(transaction: BFChainCore.SetLnsRecordValueTransactionJSON): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.SetLnsRecordValueAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    sendSetLnsRecordValue(argv: BFChainPcSdk.Transaction.SetLnsRecordValueTransactionParams): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.SetLnsRecordValueAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    generateToExchangeSpecialAsset(argv: BFChainPcSdk.Transaction.ToExchangeSpecialAssetTransactionParams): Promise<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.ToExchangeSpecialAssetAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    broadcastToExchangeSpecialAsset(transaction: BFChainCore.ToExchangeSpecialAssetTransactionJSON): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.ToExchangeSpecialAssetAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    sendToExchangeSpecialAsset(argv: BFChainPcSdk.Transaction.ToExchangeSpecialAssetTransactionParams): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.ToExchangeSpecialAssetAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    generateBeExchangeSpecialAsset(argv: BFChainPcSdk.Transaction.BeExchangeSpecialAssetTransactionParams): Promise<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.BeExchangeSpecialAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastBeExchangeSpecialAsset(transaction: BFChainCore.BeExchangeSpecialAssetTransactionJSON): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.BeExchangeSpecialAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendBeExchangeSpecialAsset(argv: BFChainPcSdk.Transaction.BeExchangeSpecialAssetTransactionParams): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.BeExchangeSpecialAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateIssueEntityFactory(argv: BFChainPcSdk.Transaction.IssueEntityFactoryTransactionParams): Promise<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.IssueEntityFactoryAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastIssueEntityFactory(transaction: BFChainCore.IssueEntityFactoryTransactionJSON): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.IssueEntityFactoryAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendIssueEntityFactory(argv: BFChainPcSdk.Transaction.IssueEntityFactoryTransactionParams): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.IssueEntityFactoryAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateIssueEntity(argv: BFChainPcSdk.Transaction.IssueEntityTransactionParams): Promise<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.IssueEntityAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastIssueEntity(transaction: BFChainCore.IssueEntityTransactionJSON): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.IssueEntityAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendIssueEntity(argv: BFChainPcSdk.Transaction.IssueEntityTransactionParams): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.IssueEntityAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateDestoryEntity(argv: BFChainPcSdk.Transaction.DestoryEntityTransactionParams): Promise<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.DestoryEntityAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastDestoryEntity(transaction: BFChainCore.DestoryEntityTransactionJSON): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.DestoryEntityAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendDestoryEntity(argv: BFChainPcSdk.Transaction.DestoryEntityTransactionParams): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.DestoryEntityAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateToExchangeAny(argv: BFChainPcSdk.Transaction.ToExchangeAnyTransactionParams): Promise<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.ToExchangeAnyAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    broadcastToExchangeAny(transaction: BFChainCore.ToExchangeAnyTransactionJSON): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.ToExchangeAnyAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    sendToExchangeAny(argv: BFChainPcSdk.Transaction.ToExchangeAnyTransactionParams): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.ToExchangeAnyAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    generateBeExchangeAny(argv: BFChainPcSdk.Transaction.BeExchangeAnyTransactionParams): Promise<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.BeExchangeAnyAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastBeExchangeAny(transaction: BFChainCore.BeExchangeAnyTransactionJSON): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.BeExchangeAnyAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendBeExchangeAny(argv: BFChainPcSdk.Transaction.BeExchangeAnyTransactionParams): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.BeExchangeAnyAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateRegisterChain(argv: BFChainPcSdk.Transaction.RegisterChainTransactionParams): Promise<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.RegisterChainAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    broadcastRegisterChain(transaction: BFChainCore.RegisterChainTransactionJSON): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.RegisterChainAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    sendRegisterChain(argv: BFChainPcSdk.Transaction.RegisterChainTransactionParams): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.RegisterChainAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    generateEmigrateAsset(argv: BFChainPcSdk.Transaction.EmigrateAssetTransactionParams): Promise<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.EmigrateAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastEmigrateAsset(transaction: BFChainCore.EmigrateAssetTransactionJSON): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.EmigrateAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendEmigrateAsset(argv: BFChainPcSdk.Transaction.EmigrateAssetTransactionParams): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.EmigrateAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    generateImmigrateAsset(argv: BFChainPcSdk.Transaction.ImmigrateAssetTransactionParams): Promise<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.ImmigrateAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastImmigrateAsset(transaction: BFChainCore.ImmigrateAssetTransactionJSON): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.ImmigrateAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    sendImmigrateAsset(argv: BFChainPcSdk.Transaction.ImmigrateAssetTransactionParams): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.ImmigrateAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    private __getMigrateCertificateApi;
    generateMigrateCertificate(argv: BFChainPcSdk.CrossChain.GenerateMigrateCertificateParams): Promise<BFChainPcSdk.TransactionServer.MigrateCertificateReturn>;
    fromAuthSignatureMigrateCertificate(argv: BFChainCore.CrossChain.AuthSignMigrateCertificateArgs): Promise<BFChainPcSdk.TransactionServer.MigrateCertificateReturn>;
    toAuthSignatureMigrateCertificate(argv: BFChainCore.CrossChain.AuthSignMigrateCertificateArgs): Promise<BFChainPcSdk.TransactionServer.MigrateCertificateReturn>;
    private __getCommonApi;
    verifyAddress(argv: BFChainPcSdk.Common.VerifyAddressParams): Promise<BFChainPcSdk.TransactionServer.CommonFailureReturn | BFChainPcSdk.TransactionServer.CommonSuccessReturn<boolean>>;
    verifyPublicKey(argv: BFChainPcSdk.Common.VerifyPublicKeyParams): Promise<BFChainPcSdk.TransactionServer.CommonFailureReturn | BFChainPcSdk.TransactionServer.CommonSuccessReturn<boolean>>;
    generateAccount(argv: BFChainPcSdk.Common.GenerateAccountParams): Promise<BFChainPcSdk.TransactionServer.CommonFailureReturn | BFChainPcSdk.TransactionServer.CommonSuccessReturn<BFChainPcSdk.Common.AccountInfo>>;
    generateAddressBySecret(argv: BFChainPcSdk.Common.GenerateAddressBySecretParams): Promise<BFChainPcSdk.TransactionServer.CommonFailureReturn | BFChainPcSdk.TransactionServer.CommonSuccessReturn<string>>;
    generateAddressByPublicKey(argv: BFChainPcSdk.Common.GenerateAddressByPublicKeyParams): Promise<BFChainPcSdk.TransactionServer.CommonFailureReturn | BFChainPcSdk.TransactionServer.CommonSuccessReturn<string>>;
    generateKeypair(argv: BFChainPcSdk.Common.GenerateKeypairParams): Promise<BFChainPcSdk.TransactionServer.CommonFailureReturn | BFChainPcSdk.TransactionServer.CommonSuccessReturn<BFChainPcSdk.Common.Keypairs>>;
    asymmetricEncrypt(argv: BFChainPcSdk.Common.AsymmetricEncryptParams): Promise<BFChainPcSdk.TransactionServer.CommonFailureReturn | BFChainPcSdk.TransactionServer.CommonSuccessReturn<BFChainPcSdk.Common.AsymmetricEncrypt>>;
    asymmetricDecrypt(argv: BFChainPcSdk.Common.AsymmetricDecryptParams): Promise<BFChainPcSdk.TransactionServer.CommonFailureReturn | BFChainPcSdk.TransactionServer.CommonSuccessReturn<BFChainPcSdk.Common.AsymmetricDecrypt>>;
    calcTransactionMinFee(argv: BFChainPcSdk.Common.CalcTransactionMinFeeParams): Promise<BFChainPcSdk.TransactionServer.CommonFailureReturn | BFChainPcSdk.TransactionServer.CommonSuccessReturn<BFChainPcSdk.Common.TransactionMinFee>>;
    generateCiphertextSignature(argv: BFChainPcSdk.Common.GenerateCiphertextSignatureParams): Promise<BFChainPcSdk.TransactionServer.CommonFailureReturn | BFChainPcSdk.TransactionServer.CommonSuccessReturn<string>>;
}

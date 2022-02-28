import type { BFChainCore } from "@bfchain/core";
import { TransactionVerifyHelper } from "@bfchain/pc-sdk-helper-transaction-verify";
import {
    UsernameFactory,
    SignatureFactory,
    DelegateFactory,
    AcceptVoteFactory,
    RejectVoteFactory,
    VoteFactory,
    IssueAssetFactory,
    TransferAssetFactory,
    DestoryAssetFactory,
    GiftAssetFactory,
    GrabAssetFactory,
    TrustAssetFactory,
    SignForAssetFactory,
    ToExchangeAssetFactory,
    BeExchangeAssetFactory,
    DAppFactory,
    DAppPurchasingFactory,
    MarkFactory,
    LocationNameFactory,
    SetLnsManagerFactory,
    SetLnsRecordValueFactory,
    ToExchangeSpecialAssetFactory,
    BeExchangeSpecialAssetFactory,
    IssueEntityFactoryFactory,
    IssueEntityFactoryV1Factory,
    IssueEntityFactory,
    DestoryEntityFactory,
    TransferAnyFactory,
    GiftAnyFactory,
    GrabAnyFactory,
    ToExchangeAnyFactory,
    BeExchangeAnyFactory,
    RegisterChainFactory,
    EmigrateAssetFactory,
    ImmigrateAssetFactory,
} from "./atom_transaction";
import { EasyWeakMap } from "@bfchain/util";
export const TRANSACTION_FACTORY_MAP_WM = EasyWeakMap.from<
    BFChainCore,
    Map<BFChainPcSdk.Transaction.GENERATE_TRANSACTION_API_PATH, BFChainPcSdk.Transaction.TransactionFactory<any>>
>({
    creater() {
        return new Map();
    },
});

export function TransactionFactory(bfchainCore: BFChainCore) {
    const transactionVerifyHelper = new TransactionVerifyHelper();
    const TRANSACTION_FACTORY_MAP = TRANSACTION_FACTORY_MAP_WM.forceGet(bfchainCore);

    const usernameFactory = new UsernameFactory(bfchainCore, transactionVerifyHelper);
    const signatureFactory = new SignatureFactory(bfchainCore, transactionVerifyHelper);
    const delegateFactory = new DelegateFactory(bfchainCore, transactionVerifyHelper);
    const acceptVoteFactory = new AcceptVoteFactory(bfchainCore, transactionVerifyHelper);
    const rejectVoteFactory = new RejectVoteFactory(bfchainCore, transactionVerifyHelper);
    const voteFactory = new VoteFactory(bfchainCore, transactionVerifyHelper);
    TRANSACTION_FACTORY_MAP.set(usernameFactory.GENERATE_API_PATH, usernameFactory);
    TRANSACTION_FACTORY_MAP.set(signatureFactory.GENERATE_API_PATH, signatureFactory);
    TRANSACTION_FACTORY_MAP.set(delegateFactory.GENERATE_API_PATH, delegateFactory);
    TRANSACTION_FACTORY_MAP.set(acceptVoteFactory.GENERATE_API_PATH, acceptVoteFactory);
    TRANSACTION_FACTORY_MAP.set(rejectVoteFactory.GENERATE_API_PATH, rejectVoteFactory);
    TRANSACTION_FACTORY_MAP.set(voteFactory.GENERATE_API_PATH, voteFactory);

    const issueAssetFactory = new IssueAssetFactory(bfchainCore, transactionVerifyHelper);
    const transferAssetFactory = new TransferAssetFactory(bfchainCore, transactionVerifyHelper);
    const destoryAssetFactory = new DestoryAssetFactory(bfchainCore, transactionVerifyHelper);
    const giftAssetFactory = new GiftAssetFactory(bfchainCore, transactionVerifyHelper);
    const grabAssetFactory = new GrabAssetFactory(bfchainCore, transactionVerifyHelper);
    const trustAssetFactory = new TrustAssetFactory(bfchainCore, transactionVerifyHelper);
    const signForAssetFactory = new SignForAssetFactory(bfchainCore, transactionVerifyHelper);
    const toExchangeAssetFactory = new ToExchangeAssetFactory(bfchainCore, transactionVerifyHelper);
    const beExchangeAssetFactory = new BeExchangeAssetFactory(bfchainCore, transactionVerifyHelper);
    TRANSACTION_FACTORY_MAP.set(issueAssetFactory.GENERATE_API_PATH, issueAssetFactory);
    TRANSACTION_FACTORY_MAP.set(transferAssetFactory.GENERATE_API_PATH, transferAssetFactory);
    TRANSACTION_FACTORY_MAP.set(destoryAssetFactory.GENERATE_API_PATH, destoryAssetFactory);
    TRANSACTION_FACTORY_MAP.set(giftAssetFactory.GENERATE_API_PATH, giftAssetFactory);
    TRANSACTION_FACTORY_MAP.set(grabAssetFactory.GENERATE_API_PATH, grabAssetFactory);
    TRANSACTION_FACTORY_MAP.set(trustAssetFactory.GENERATE_API_PATH, trustAssetFactory);
    TRANSACTION_FACTORY_MAP.set(signForAssetFactory.GENERATE_API_PATH, signForAssetFactory);
    TRANSACTION_FACTORY_MAP.set(toExchangeAssetFactory.GENERATE_API_PATH, toExchangeAssetFactory);
    TRANSACTION_FACTORY_MAP.set(beExchangeAssetFactory.GENERATE_API_PATH, beExchangeAssetFactory);

    const dappFactory = new DAppFactory(bfchainCore, transactionVerifyHelper);
    const dappPurchasingFactory = new DAppPurchasingFactory(bfchainCore, transactionVerifyHelper);
    const markFactory = new MarkFactory(bfchainCore, transactionVerifyHelper);
    const locationNameFactory = new LocationNameFactory(bfchainCore, transactionVerifyHelper);
    const setLnsManagerFactory = new SetLnsManagerFactory(bfchainCore, transactionVerifyHelper);
    const setLnsRecordValueFactory = new SetLnsRecordValueFactory(bfchainCore, transactionVerifyHelper);
    const toExchangeSpecialAssetFactory = new ToExchangeSpecialAssetFactory(bfchainCore, transactionVerifyHelper);
    const beExchangeSpecialAssetFactory = new BeExchangeSpecialAssetFactory(bfchainCore, transactionVerifyHelper);
    TRANSACTION_FACTORY_MAP.set(dappFactory.GENERATE_API_PATH, dappFactory);
    TRANSACTION_FACTORY_MAP.set(dappPurchasingFactory.GENERATE_API_PATH, dappPurchasingFactory);
    TRANSACTION_FACTORY_MAP.set(markFactory.GENERATE_API_PATH, markFactory);
    TRANSACTION_FACTORY_MAP.set(locationNameFactory.GENERATE_API_PATH, locationNameFactory);
    TRANSACTION_FACTORY_MAP.set(setLnsManagerFactory.GENERATE_API_PATH, setLnsManagerFactory);
    TRANSACTION_FACTORY_MAP.set(setLnsRecordValueFactory.GENERATE_API_PATH, setLnsRecordValueFactory);
    TRANSACTION_FACTORY_MAP.set(toExchangeSpecialAssetFactory.GENERATE_API_PATH, toExchangeSpecialAssetFactory);
    TRANSACTION_FACTORY_MAP.set(beExchangeSpecialAssetFactory.GENERATE_API_PATH, beExchangeSpecialAssetFactory);

    const issueEntityFactoryFactory = new IssueEntityFactoryFactory(bfchainCore, transactionVerifyHelper);
    const issueEntityFactoryV1Factory = new IssueEntityFactoryV1Factory(bfchainCore, transactionVerifyHelper);
    const issueEntityFactory = new IssueEntityFactory(bfchainCore, transactionVerifyHelper);
    const destoryEntityFactory = new DestoryEntityFactory(bfchainCore, transactionVerifyHelper);
    TRANSACTION_FACTORY_MAP.set(issueEntityFactoryFactory.GENERATE_API_PATH, issueEntityFactoryFactory);
    TRANSACTION_FACTORY_MAP.set(issueEntityFactoryV1Factory.GENERATE_API_PATH, issueEntityFactoryV1Factory);
    TRANSACTION_FACTORY_MAP.set(issueEntityFactory.GENERATE_API_PATH, issueEntityFactory);
    TRANSACTION_FACTORY_MAP.set(destoryEntityFactory.GENERATE_API_PATH, destoryEntityFactory);

    const toExchangeAnyFactory = new ToExchangeAnyFactory(bfchainCore, transactionVerifyHelper);
    const beExchangeAnyFactory = new BeExchangeAnyFactory(bfchainCore, transactionVerifyHelper);
    const transferAnyFactory = new TransferAnyFactory(bfchainCore, transactionVerifyHelper);
    const giftAnyFactory = new GiftAnyFactory(bfchainCore, transactionVerifyHelper);
    const grabAnyFactory = new GrabAnyFactory(bfchainCore, transactionVerifyHelper);
    TRANSACTION_FACTORY_MAP.set(toExchangeAnyFactory.GENERATE_API_PATH, toExchangeAnyFactory);
    TRANSACTION_FACTORY_MAP.set(beExchangeAnyFactory.GENERATE_API_PATH, beExchangeAnyFactory);
    TRANSACTION_FACTORY_MAP.set(transferAnyFactory.GENERATE_API_PATH, transferAnyFactory);
    TRANSACTION_FACTORY_MAP.set(giftAnyFactory.GENERATE_API_PATH, giftAnyFactory);
    TRANSACTION_FACTORY_MAP.set(grabAnyFactory.GENERATE_API_PATH, grabAnyFactory);

    const registerChainFactory = new RegisterChainFactory(bfchainCore, transactionVerifyHelper);
    const emigrateAssetFactory = new EmigrateAssetFactory(bfchainCore, transactionVerifyHelper);
    const immigrateAssetFactory = new ImmigrateAssetFactory(bfchainCore, transactionVerifyHelper);
    TRANSACTION_FACTORY_MAP.set(registerChainFactory.GENERATE_API_PATH, registerChainFactory);
    TRANSACTION_FACTORY_MAP.set(emigrateAssetFactory.GENERATE_API_PATH, emigrateAssetFactory);
    TRANSACTION_FACTORY_MAP.set(immigrateAssetFactory.GENERATE_API_PATH, immigrateAssetFactory);

    Object.freeze(TRANSACTION_FACTORY_MAP);
}

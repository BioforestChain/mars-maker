import type { BFChainCore } from "@bfchain/core";
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
} from "./atom_transaction";

export const TRANSACTION_FACTORY_MAP = new Map<BFChainPcSdk.Transaction.GENERATE_TRANSACTION_API_PATH, BFChainPcSdk.Transaction.TransactionFactory<any>>();

export function TransactionFactory(bfchainCore: BFChainCore) {
    const usernameFactory = new UsernameFactory(bfchainCore);
    const signatureFactory = new SignatureFactory(bfchainCore);
    const delegateFactory = new DelegateFactory(bfchainCore);
    const acceptVoteFactory = new AcceptVoteFactory(bfchainCore);
    const rejectVoteFactory = new RejectVoteFactory(bfchainCore);
    const voteFactory = new VoteFactory(bfchainCore);
    TRANSACTION_FACTORY_MAP.set(usernameFactory.GENERATE_API_PATH, usernameFactory);
    TRANSACTION_FACTORY_MAP.set(signatureFactory.GENERATE_API_PATH, signatureFactory);
    TRANSACTION_FACTORY_MAP.set(delegateFactory.GENERATE_API_PATH, delegateFactory);
    TRANSACTION_FACTORY_MAP.set(acceptVoteFactory.GENERATE_API_PATH, acceptVoteFactory);
    TRANSACTION_FACTORY_MAP.set(rejectVoteFactory.GENERATE_API_PATH, rejectVoteFactory);
    TRANSACTION_FACTORY_MAP.set(voteFactory.GENERATE_API_PATH, voteFactory);

    const issueAssetFactory = new IssueAssetFactory(bfchainCore);
    const transferAssetFactory = new TransferAssetFactory(bfchainCore);
    const destoryAssetFactory = new DestoryAssetFactory(bfchainCore);
    const giftAssetFactory = new GiftAssetFactory(bfchainCore);
    const grabAssetFactory = new GrabAssetFactory(bfchainCore);
    const trustAssetFactory = new TrustAssetFactory(bfchainCore);
    const signForAssetFactory = new SignForAssetFactory(bfchainCore);
    const toExchangeAssetFactory = new ToExchangeAssetFactory(bfchainCore);
    const beExchangeAssetFactory = new BeExchangeAssetFactory(bfchainCore);
    TRANSACTION_FACTORY_MAP.set(issueAssetFactory.GENERATE_API_PATH, issueAssetFactory);
    TRANSACTION_FACTORY_MAP.set(transferAssetFactory.GENERATE_API_PATH, transferAssetFactory);
    TRANSACTION_FACTORY_MAP.set(destoryAssetFactory.GENERATE_API_PATH, destoryAssetFactory);
    TRANSACTION_FACTORY_MAP.set(giftAssetFactory.GENERATE_API_PATH, giftAssetFactory);
    TRANSACTION_FACTORY_MAP.set(grabAssetFactory.GENERATE_API_PATH, grabAssetFactory);
    TRANSACTION_FACTORY_MAP.set(trustAssetFactory.GENERATE_API_PATH, trustAssetFactory);
    TRANSACTION_FACTORY_MAP.set(signForAssetFactory.GENERATE_API_PATH, signForAssetFactory);
    TRANSACTION_FACTORY_MAP.set(toExchangeAssetFactory.GENERATE_API_PATH, toExchangeAssetFactory);
    TRANSACTION_FACTORY_MAP.set(beExchangeAssetFactory.GENERATE_API_PATH, beExchangeAssetFactory);

    const dappFactory = new DAppFactory(bfchainCore);
    const dappPurchasingFactory = new DAppPurchasingFactory(bfchainCore);
    const markFactory = new MarkFactory(bfchainCore);
    const locationNameFactory = new LocationNameFactory(bfchainCore);
    const setLnsManagerFactory = new SetLnsManagerFactory(bfchainCore);
    const setLnsRecordValueFactory = new SetLnsRecordValueFactory(bfchainCore);
    const toExchangeSpecialAssetFactory = new ToExchangeSpecialAssetFactory(bfchainCore);
    const beExchangeSpecialAssetFactory = new BeExchangeSpecialAssetFactory(bfchainCore);
    TRANSACTION_FACTORY_MAP.set(dappFactory.GENERATE_API_PATH, dappFactory);
    TRANSACTION_FACTORY_MAP.set(dappPurchasingFactory.GENERATE_API_PATH, dappPurchasingFactory);
    TRANSACTION_FACTORY_MAP.set(markFactory.GENERATE_API_PATH, markFactory);
    TRANSACTION_FACTORY_MAP.set(locationNameFactory.GENERATE_API_PATH, locationNameFactory);
    TRANSACTION_FACTORY_MAP.set(setLnsManagerFactory.GENERATE_API_PATH, setLnsManagerFactory);
    TRANSACTION_FACTORY_MAP.set(setLnsRecordValueFactory.GENERATE_API_PATH, setLnsRecordValueFactory);
    TRANSACTION_FACTORY_MAP.set(toExchangeSpecialAssetFactory.GENERATE_API_PATH, toExchangeSpecialAssetFactory);
    TRANSACTION_FACTORY_MAP.set(beExchangeSpecialAssetFactory.GENERATE_API_PATH, beExchangeSpecialAssetFactory);

    Object.freeze(TRANSACTION_FACTORY_MAP);
}

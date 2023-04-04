import type { BFChainCore } from "@bfchain/core";

import { UsernameFactory } from "./usernameFactory";
import { SignatureFactory } from "./signatureFactory";
import { DelegateFactory } from "./delegateFactory";
import { AcceptVoteFactory } from "./acceptVoteFactory";
import { RejectVoteFactory } from "./rejectVoteFactory";
import { VoteFactory } from "./voteFactory";

import { IssueAssetFactory } from "./issueAssetFactory";
import { TransferAssetFactory } from "./transferAssetFactory";
import { DestoryAssetFactory } from "./destoryAssetFactory";
import { GiftAssetFactory } from "./giftAssetFactory";
import { GrabAssetFactory } from "./grabAssetFactory";
import { TrustAssetFactory } from "./trustAssetFactory";
import { SignForAssetFactory } from "./signForAssetFactory";
import { ToExchangeAssetFactory } from "./toExchangeAssetFactory";
import { BeExchangeAssetFactory } from "./beExchangeAssetFactory";

import { DAppFactory } from "./dappFactory";
import { DAppPurchasingFactory } from "./dappPurchasingFactory";
import { MarkFactory } from "./markFactory";
import { LocationNameFactory } from "./locationNameFactory";
import { SetLnsManagerFactory } from "./setLnsManagerFactory";
import { SetLnsRecordValueFactory } from "./setLnsRecordValueFactory";
import { ToExchangeSpecialAssetFactory } from "./toExchangeSpecialAssetFactory";
import { BeExchangeSpecialAssetFactory } from "./beExchangeSpecialAssetFactory";

import { IssueEntityFactoryFactory } from "./issueEntityFactoryFactory";
import { IssueEntityFactoryV1Factory } from "./issueEntityFactoryV1Factory";
import { IssueEntityFactory } from "./issueEntityFactory";
import { DestoryEntityFactory } from "./destoryEntityFactory";

import { TransferAnyFactory } from "./transferAnyFactory";
import { GiftAnyFactory } from "./giftAnyFactory";
import { GrabAnyFactory } from "./grabAnyFactory";

import { ToExchangeAnyFactory } from "./toExchangeAnyFactory";
import { BeExchangeAnyFactory } from "./beExchangeAnyFactory";

import { IssueEntityMultiFactory } from "./issueEntityMultiFactory";

import { ToExchangeAnyMultiFactory } from "./toExchangeAnyMultiFactory";
import { BeExchangeAnyMultiFactory } from "./beExchangeAnyMultiFactory";

import { ToExchangeAnyMultiAllFactory } from "./toExchangeAnyMultiAllFactory";
import { BeExchangeAnyMultiAllFactory } from "./beExchangeAnyMultiAllFactory";

import { RegisterChainFactory } from "./registerChainFactory";
import { EmigrateAssetFactory } from "./emigrateAssetFactory";
import { ImmigrateAssetFactory } from "./immigrateAssetFactory";

import { EasyWeakMap } from "@bfchain/util";
import { Verifier } from "../schema";

export const TRANSACTION_FACTORY_MAP_WM = EasyWeakMap.from<
    BFChainCore,
    Map<TransactionMaker.Transaction.GENERATE_TRANSACTION_API_PATH, import("./_transactionFactory").TransactionFactory<any>>
>({
    creater() {
        return new Map();
    },
});

export function TransactionFactory(bfchainCore: BFChainCore) {
    const verifier = new Verifier();
    const TRANSACTION_FACTORY_MAP = TRANSACTION_FACTORY_MAP_WM.forceGet(bfchainCore);

    const usernameFactory = new UsernameFactory(bfchainCore, verifier);
    const signatureFactory = new SignatureFactory(bfchainCore, verifier);
    const delegateFactory = new DelegateFactory(bfchainCore, verifier);
    const acceptVoteFactory = new AcceptVoteFactory(bfchainCore, verifier);
    const rejectVoteFactory = new RejectVoteFactory(bfchainCore, verifier);
    const voteFactory = new VoteFactory(bfchainCore, verifier);
    TRANSACTION_FACTORY_MAP.set(usernameFactory.GENERATE_API_PATH, usernameFactory);
    TRANSACTION_FACTORY_MAP.set(signatureFactory.GENERATE_API_PATH, signatureFactory);
    TRANSACTION_FACTORY_MAP.set(delegateFactory.GENERATE_API_PATH, delegateFactory);
    TRANSACTION_FACTORY_MAP.set(acceptVoteFactory.GENERATE_API_PATH, acceptVoteFactory);
    TRANSACTION_FACTORY_MAP.set(rejectVoteFactory.GENERATE_API_PATH, rejectVoteFactory);
    TRANSACTION_FACTORY_MAP.set(voteFactory.GENERATE_API_PATH, voteFactory);

    const issueAssetFactory = new IssueAssetFactory(bfchainCore, verifier);
    const transferAssetFactory = new TransferAssetFactory(bfchainCore, verifier);
    const destoryAssetFactory = new DestoryAssetFactory(bfchainCore, verifier);
    const giftAssetFactory = new GiftAssetFactory(bfchainCore, verifier);
    const grabAssetFactory = new GrabAssetFactory(bfchainCore, verifier);
    const trustAssetFactory = new TrustAssetFactory(bfchainCore, verifier);
    const signForAssetFactory = new SignForAssetFactory(bfchainCore, verifier);
    const toExchangeAssetFactory = new ToExchangeAssetFactory(bfchainCore, verifier);
    const beExchangeAssetFactory = new BeExchangeAssetFactory(bfchainCore, verifier);
    TRANSACTION_FACTORY_MAP.set(issueAssetFactory.GENERATE_API_PATH, issueAssetFactory);
    TRANSACTION_FACTORY_MAP.set(transferAssetFactory.GENERATE_API_PATH, transferAssetFactory);
    TRANSACTION_FACTORY_MAP.set(destoryAssetFactory.GENERATE_API_PATH, destoryAssetFactory);
    TRANSACTION_FACTORY_MAP.set(giftAssetFactory.GENERATE_API_PATH, giftAssetFactory);
    TRANSACTION_FACTORY_MAP.set(grabAssetFactory.GENERATE_API_PATH, grabAssetFactory);
    TRANSACTION_FACTORY_MAP.set(trustAssetFactory.GENERATE_API_PATH, trustAssetFactory);
    TRANSACTION_FACTORY_MAP.set(signForAssetFactory.GENERATE_API_PATH, signForAssetFactory);
    TRANSACTION_FACTORY_MAP.set(toExchangeAssetFactory.GENERATE_API_PATH, toExchangeAssetFactory);
    TRANSACTION_FACTORY_MAP.set(beExchangeAssetFactory.GENERATE_API_PATH, beExchangeAssetFactory);

    const dappFactory = new DAppFactory(bfchainCore, verifier);
    const dappPurchasingFactory = new DAppPurchasingFactory(bfchainCore, verifier);
    const markFactory = new MarkFactory(bfchainCore, verifier);
    const locationNameFactory = new LocationNameFactory(bfchainCore, verifier);
    const setLnsManagerFactory = new SetLnsManagerFactory(bfchainCore, verifier);
    const setLnsRecordValueFactory = new SetLnsRecordValueFactory(bfchainCore, verifier);
    const toExchangeSpecialAssetFactory = new ToExchangeSpecialAssetFactory(bfchainCore, verifier);
    const beExchangeSpecialAssetFactory = new BeExchangeSpecialAssetFactory(bfchainCore, verifier);
    TRANSACTION_FACTORY_MAP.set(dappFactory.GENERATE_API_PATH, dappFactory);
    TRANSACTION_FACTORY_MAP.set(dappPurchasingFactory.GENERATE_API_PATH, dappPurchasingFactory);
    TRANSACTION_FACTORY_MAP.set(markFactory.GENERATE_API_PATH, markFactory);
    TRANSACTION_FACTORY_MAP.set(locationNameFactory.GENERATE_API_PATH, locationNameFactory);
    TRANSACTION_FACTORY_MAP.set(setLnsManagerFactory.GENERATE_API_PATH, setLnsManagerFactory);
    TRANSACTION_FACTORY_MAP.set(setLnsRecordValueFactory.GENERATE_API_PATH, setLnsRecordValueFactory);
    TRANSACTION_FACTORY_MAP.set(toExchangeSpecialAssetFactory.GENERATE_API_PATH, toExchangeSpecialAssetFactory);
    TRANSACTION_FACTORY_MAP.set(beExchangeSpecialAssetFactory.GENERATE_API_PATH, beExchangeSpecialAssetFactory);

    const issueEntityFactoryFactory = new IssueEntityFactoryFactory(bfchainCore, verifier);
    const issueEntityFactoryV1Factory = new IssueEntityFactoryV1Factory(bfchainCore, verifier);
    const issueEntityFactory = new IssueEntityFactory(bfchainCore, verifier);
    const destoryEntityFactory = new DestoryEntityFactory(bfchainCore, verifier);
    TRANSACTION_FACTORY_MAP.set(issueEntityFactoryFactory.GENERATE_API_PATH, issueEntityFactoryFactory);
    TRANSACTION_FACTORY_MAP.set(issueEntityFactoryV1Factory.GENERATE_API_PATH, issueEntityFactoryV1Factory);
    TRANSACTION_FACTORY_MAP.set(issueEntityFactory.GENERATE_API_PATH, issueEntityFactory);
    TRANSACTION_FACTORY_MAP.set(destoryEntityFactory.GENERATE_API_PATH, destoryEntityFactory);

    const toExchangeAnyFactory = new ToExchangeAnyFactory(bfchainCore, verifier);
    const beExchangeAnyFactory = new BeExchangeAnyFactory(bfchainCore, verifier);
    const transferAnyFactory = new TransferAnyFactory(bfchainCore, verifier);
    const giftAnyFactory = new GiftAnyFactory(bfchainCore, verifier);
    const grabAnyFactory = new GrabAnyFactory(bfchainCore, verifier);
    TRANSACTION_FACTORY_MAP.set(toExchangeAnyFactory.GENERATE_API_PATH, toExchangeAnyFactory);
    TRANSACTION_FACTORY_MAP.set(beExchangeAnyFactory.GENERATE_API_PATH, beExchangeAnyFactory);
    TRANSACTION_FACTORY_MAP.set(transferAnyFactory.GENERATE_API_PATH, transferAnyFactory);
    TRANSACTION_FACTORY_MAP.set(giftAnyFactory.GENERATE_API_PATH, giftAnyFactory);
    TRANSACTION_FACTORY_MAP.set(grabAnyFactory.GENERATE_API_PATH, grabAnyFactory);

    const issueEntityMultiFactory = new IssueEntityMultiFactory(bfchainCore, verifier);
    TRANSACTION_FACTORY_MAP.set(issueEntityMultiFactory.GENERATE_API_PATH, issueEntityMultiFactory);

    const toExchangeAnyMultiFactory = new ToExchangeAnyMultiFactory(bfchainCore, verifier);
    const beExchangeAnyMultiFactory = new BeExchangeAnyMultiFactory(bfchainCore, verifier);
    TRANSACTION_FACTORY_MAP.set(toExchangeAnyMultiFactory.GENERATE_API_PATH, toExchangeAnyMultiFactory);
    TRANSACTION_FACTORY_MAP.set(beExchangeAnyMultiFactory.GENERATE_API_PATH, beExchangeAnyMultiFactory);

    const toExchangeAnyMultiAllFactory = new ToExchangeAnyMultiAllFactory(bfchainCore, verifier);
    const beExchangeAnyMultiAllFactory = new BeExchangeAnyMultiAllFactory(bfchainCore, verifier);
    TRANSACTION_FACTORY_MAP.set(toExchangeAnyMultiAllFactory.GENERATE_API_PATH, toExchangeAnyMultiAllFactory);
    TRANSACTION_FACTORY_MAP.set(beExchangeAnyMultiAllFactory.GENERATE_API_PATH, beExchangeAnyMultiAllFactory);

    const registerChainFactory = new RegisterChainFactory(bfchainCore, verifier);
    const emigrateAssetFactory = new EmigrateAssetFactory(bfchainCore, verifier);
    const immigrateAssetFactory = new ImmigrateAssetFactory(bfchainCore, verifier);
    TRANSACTION_FACTORY_MAP.set(registerChainFactory.GENERATE_API_PATH, registerChainFactory);
    TRANSACTION_FACTORY_MAP.set(emigrateAssetFactory.GENERATE_API_PATH, emigrateAssetFactory);
    TRANSACTION_FACTORY_MAP.set(immigrateAssetFactory.GENERATE_API_PATH, immigrateAssetFactory);

    Object.freeze(TRANSACTION_FACTORY_MAP);
}

declare namespace BFChainPcSdk {
    namespace Transaction {
        type TransactionFactory<T extends BFChainCore.Transaction> = import("./atom_transaction/_transactionFactory").TransactionFactory<T>;
        type TransactionFactoryConstructor<T extends BFChainCore.Transaction = any> = new (...args: any[]) => TransactionFactory<T>;
        interface TransactionCommonParams {
            secret: string;
            secondSecretInfo?: BFChainCoreTools.SecondSecretInfo;
            recipientId?: string;
            rangeType?: number;
            range?: string[];
            fee: string;
            applyBlockHeight: number;
            remark?: {
                [key: string]: string;
            };
            dappid?: string;
            lns?: string;
            sourceIP?: string;
            fromMagic?: string;
            toMagic?: string;
            numberOfEffectiveBlocks?: number;
            accountLastRoundInfo?: {
                txCount: number;
                equity: string;
            };
        }
        type TransactionCommonParamsWithRecipientId = TransactionCommonParams & {
            recipientId: string;
        };
        type TransactionCommonParamsWithoutRecipientId = Omit<TransactionCommonParams, "recipientId">;
        interface UsernameTransactionParams extends TransactionCommonParamsWithoutRecipientId {
            alias: string;
        }
        interface SignatureTransactionParams extends TransactionCommonParamsWithoutRecipientId {
            newSecondSecretInfo: BFChainCoreTools.SecondSecretInfo;
        }
        interface DelegateTransactionParams extends TransactionCommonParamsWithoutRecipientId {}
        interface AcceptVoteTransactionParams extends TransactionCommonParamsWithoutRecipientId {}
        interface RejectVoteTransactionParams extends TransactionCommonParamsWithoutRecipientId {}
        interface VoteTransactionParams extends TransactionCommonParamsWithRecipientId {
            equity: string;
        }
        interface IssueAssetTransactionParams extends TransactionCommonParamsWithRecipientId {
            assetInfo: {
                assetType: string;
                expectedIssuedAssets: string;
            };
        }
        interface TransferAssetTransactionParams extends TransactionCommonParamsWithRecipientId {
            assetInfo: {
                sourceChainMagic?: string;
                sourceChainName?: string;
                assetType?: string;
                amount: string;
            };
        }
        interface DestoryAssetTransactionParams extends TransactionCommonParamsWithRecipientId {
            assetInfo: {
                assetType: string;
                amount: string;
            };
        }
        interface GiftAssetTransactionParams extends TransactionCommonParams {
            assetInfo: {
                sourceChainMagic?: string;
                sourceChainName?: string;
                assetType?: string;
                amount: string;
            };
            totalGrabableTimes: number;
            giftDistributionRule: BFChainCore.GIFT_DISTRIBUTION_RULE;
            numberOfBeginUnfrozenBlocks?: number;
            ciphertexts?: string[];
        }
        interface GrabAssetTransactionParams extends TransactionCommonParamsWithRecipientId {
            blockSignature: string;
            transactionSignature: string;
            giftAsset: BFChainCore.GiftAssetJSON;
            ciphertext?: string;
        }
        interface TrustAssetTransactionParams extends TransactionCommonParamsWithRecipientId {
            assetInfo: {
                sourceChainMagic?: string;
                sourceChainName?: string;
                assetType?: string;
                amount: string;
            };
            numberOfSignFor: number;
            trustees: string[];
        }
        interface SignForAssetTransactionParams extends TransactionCommonParamsWithRecipientId {
            transactionSignature: string;
            trustSenderId: string;
            trustAsset: BFChainCore.TrustAssetJSON;
        }
        interface ToExchangeAssetTransactionParams extends TransactionCommonParamsWithoutRecipientId {
            toExchangeInfo: {
                toExchangeSource?: string;
                toExchangeChainName?: string;
                toExchangeAsset: string;
                toExchangeNumber: string;
            };
            beExchangeInfo: {
                beExchangeSource?: string;
                beExchangeChainName?: string;
                beExchangeAsset: string;
            };
            exchangeRate: {
                prevWeight: string;
                nextWeight: string;
            };
            ciphertexts?: string[];
        }
        interface BeExchangeAssetTransactionParams extends TransactionCommonParamsWithRecipientId {
            transactionSignature: string;
            toExchangeNumber: string;
            exchangeAsset: BFChainCore.ToExchangeAssetJSON;
            ciphertext?: string;
        }
        interface DAppTransactionParams extends TransactionCommonParamsWithRecipientId {
            dappInfo: {
                newDappid: string;
                type: BFChainCore.DAPP_TYPE;
                purchanseAsset?: string;
            };
        }
        interface DAppPurchasingTransactionParams extends TransactionCommonParamsWithRecipientId {
            dappInfo: {
                dappid: string;
                type: BFChainCore.DAPP_TYPE;
                purchanseAsset?: string;
            };
        }
        interface MarkTransactionParams extends TransactionCommonParamsWithRecipientId {
            dappInfo: {
                dappid: string;
                type: BFChainCore.DAPP_TYPE;
                purchanseAsset?: string;
            };
            content: string;
            action: string;
        }
        interface LocationNameTransactionParams extends TransactionCommonParamsWithRecipientId {
            name: string;
            operationType: BFChainCore.LOCATION_NAME_OPERATION_TYPE;
        }
        interface SetLnsManagerTransactionParams extends TransactionCommonParamsWithRecipientId {
            name: string;
        }
        interface SetLnsRecordValueTransactionParams extends TransactionCommonParamsWithoutRecipientId {
            name: string;
            operationType: BFChainCore.RECORD_OPERATION_TYPE;
            addRecord?: BFChainCore.LocationNameRecordJSON;
            deleteRecord?: BFChainCore.LocationNameRecordJSON;
        }
        interface ToExchangeSpecialAssetTransactionParams extends TransactionCommonParamsWithoutRecipientId {
            toExchangeInfo: {
                toExchangeSource?: string;
                toExchangeChainName?: string;
                toExchangeAsset: string;
            };
            beExchangeInfo: {
                beExchangeSource?: string;
                beExchangeChainName?: string;
                beExchangeAsset: string;
            };
            exchangeNumber: string;
            exchangeAssetType: number;
            exchangeDirection: number;
            ciphertexts?: string[];
        }
        interface BeExchangeSpecialAssetTransactionParams extends TransactionCommonParamsWithRecipientId {
            transactionSignature: string;
            exchangeSpecialAsset: BFChainCore.ToExchangeSpecialAssetJSON;
            ciphertext?: string;
        }
    }
}

import { EXCHANGE_DIRECTION, SPECIAL_ASSET_TYPE } from "@bfchain/core";
import { Sdk } from "@bfchain/pc-sdk";

(async () => {
    try {
        const argv: BFMetaPcSdk.Transaction.ToExchangeSpecialAssetTransactionParams = {
            // secret: "boost scorpion peanut output undo useful trash burden custom party click offer leisure magnet obscure drop gather blind predict walk since strike thumb minimum",
            secret: "upgrade jump sugar congress glare expect other firm morning donate motor pride minute frame amount chimney wood gallery twelve barely dose blame convince enhance",
            fee: "1000",
            applyBlockHeight: 50,
            remark: { message: "create toExchangeSpecialAsset" },
            accountLastRoundInfo: {
                txCount: 0,
                equity: "8888888888888",
            },
            toExchangeInfo: {
                toExchangeAsset: "hylq.bfchain",
            },
            beExchangeInfo: {
                beExchangeAsset: "BFT",
            },
            exchangeNumber: "66666",
            exchangeAssetType: SPECIAL_ASSET_TYPE.LOCATION_NAME,
            exchangeDirection: EXCHANGE_DIRECTION.ASSET_FROM_SENDER,
        };

        const sdk = new Sdk();

        const result = await sdk.api.transaction.sendToExchangeSpecialAsset(argv);

        console.log(result);
    } catch (e) {
        console.log(e);
    }
})();

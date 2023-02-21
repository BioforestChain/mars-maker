import * as fs from "fs";
import * as path from "path";
import { Sdk } from "@bfchain/pc-sdk";

(async () => {
    try {
        const genesisBlock = fs.readFileSync(path.join(process.cwd(), "genesisInfos/ccc-genesisBlock-testnet-hex.txt")).toString();

        const argv: BFMetaPcSdk.Transaction.RegisterChainTransactionParams = {
            secret: "upgrade jump sugar congress glare expect other firm morning donate motor pride minute frame amount chimney wood gallery twelve barely dose blame convince enhance",
            fee: "1000",
            applyBlockHeight: 15,
            remark: { message: "create registerChain" },
            accountLastRoundInfo: {
                txCount: 0,
                equity: "8888888888888",
            },
            genesisBlock,
        };

        const sdk = new Sdk();

        const result = await sdk.api.transaction.generateRegisterChain(argv);

        console.log(result);
    } catch (e) {
        console.log(e);
    }
})();

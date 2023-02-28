import { Api } from "@bfmeta/transaction-maker-api";

(async () => {
    try {
        const argv: TransactionMaker.Transaction.EmigrateAssetTransactionParams = {
            secret: "scan pass carpet coral pumpkin spell present decrease veteran text flower pioneer top speak jaguar wreck ask always hazard good know gift uncle frost",
            fee: "1000",
            applyBlockHeight: 50,
            remark: { message: "create emigrateAsset" },
            accountLastRoundInfo: {
                txCount: 0,
                equity: "8888888888888",
            },
            recipientId: "cLrUCNAWPyPH96bqqC3JQXZ3CtsvvXmNj1",
            migrateCertificate: {} as any,
        };

        const genesisSecret =
            "nose install correct solar side latin focus churn mask nominee differ mosquito claw awake glass rare pond clump draw rent fiction muscle razor bacon";

        const api = new Api();

        const toMagic = "PSSS5";

        let result1 = await api.migrateCertificateApi.generateMigrateCertificate({
            senderSecret: argv.secret,
            recipientId: argv.recipientId,
            toChainInfo: {
                chainName: "finchain",
                magic: toMagic,
                genesisBlockSignature:
                    "10e327bad24e85444a15877d47c653b37de5fa4a6268c89bd0b438d2ed437207a3f3e089919b3f7799ac101c8d26fb00d087979ceb697c4aa4fa0c608757b10e",
            },
            assetPrealnum: "10000",
        });

        if (!result1.success) {
            throw result1;
        }

        const result2 = await api.migrateCertificateApi.fromAuthSignatureMigrateCertificate({
            authSecret: genesisSecret,
            migrateCertificate: result1.result,
        });

        if (!result2.success) {
            throw result2;
        }

        argv.migrateCertificate = result2.result;
        argv.toMagic = toMagic;

        const result = await api.transaction.generateEmigrateAsset(argv);

        console.log(result);
    } catch (e: any) {
        console.log(e);
    }
})();

import { Injectable } from "@bfchain/util";
import { MIGRATE_CERTIFICATE_API_PATH } from "@bfmeta/transaction-maker-core";
import { MigrateCertificateFactory } from "./_migrateCertificateFactory";

@Injectable()
export class MigrateCertificateFromAuthSignatureFactory extends MigrateCertificateFactory {
    readonly GENERATE_API_PATH = MIGRATE_CERTIFICATE_API_PATH.MIGRATE_CERTIFICATE_FROM_AUTH_SIGNATURE;

    async generate(request: BFChainCore.CrossChain.AuthSignMigrateCertificateArgs) {
        const bfchainCore = this.bfchainCore;
        const config = bfchainCore.config;
        const { chainName, magic, generatorPublicKey, signature } = config;
        const migrateCertificateHelper = bfchainCore.migrateCertificateHelper;
        let migrateCertificate = request.migrateCertificate;
        await migrateCertificateHelper.verifyMigrateCertificate(migrateCertificate, {
            forceCheckFromChainInfo: true,
            fromChainBaseConfig: {
                chainName,
                magic,
                generatorPublicKey,
                genesisBlockSignature: signature,
                genesisDelegates: bfchainCore.transactionHelper.genesisDelegates(config),
            },
        });

        migrateCertificate = await bfchainCore.migrateCertificateHelper.fromAuthSignMigrateCertificate(request);
        return migrateCertificate;
    }
}

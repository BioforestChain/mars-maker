import { Injectable } from "@bfchain/util";
import { MIGRATE_CERTIFICATE_API_PATH } from "@bfchain/pc-sdk-api-constants";
import { MigrateCertificateFactory } from "./_migrateCertificateFactory";

@Injectable()
export class MigrateCertificateGenerateFactory extends MigrateCertificateFactory {
    readonly GENERATE_API_PATH = MIGRATE_CERTIFICATE_API_PATH.MIGRATE_CERTIFICATE_GENERATE;

    async generate(request: BFChainCore.CrossChain.GenerateMigrateCertificateArgs) {
        const migrateCertificate = await this.bfchainCore.migrateCertificateHelper.generateMigrateCertificate(request);
        return migrateCertificate;
    }
}

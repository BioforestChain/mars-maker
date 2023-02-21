import { MigrateCertificateApi } from "./_migrateCertificateApi";
import { MIGRATE_CERTIFICATE_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class FromAuthSignatureMigrateCertificateApi extends MigrateCertificateApi {
    readonly GENERATE_API_PATH = MIGRATE_CERTIFICATE_API_PATH.MIGRATE_CERTIFICATE_FROM_AUTH_SIGNATURE;
    sendPostRequest(argv: BFChainCore.CrossChain.AuthSignMigrateCertificateArgs): Promise<BFMetaPcSdk.TransactionServer.MigrateCertificateReturn>;
}

import { MigrateCertificateApi } from "./_migrateCertificateApi";
import { MIGRATE_CERTIFICATE_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class ToAuthSignatureMigrateCertificateApi extends MigrateCertificateApi {
    readonly GENERATE_API_PATH = MIGRATE_CERTIFICATE_API_PATH.MIGRATE_CERTIFICATE_TO_AUTH_SIGNATURE;
    sendPostRequest(argv: BFChainCore.CrossChain.AuthSignMigrateCertificateArgs): Promise<BFChainPcSdk.TransactionServer.MigrateCertificateReturn>;
}

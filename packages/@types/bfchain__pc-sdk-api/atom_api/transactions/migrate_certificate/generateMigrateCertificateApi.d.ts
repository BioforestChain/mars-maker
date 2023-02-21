import { MigrateCertificateApi } from "./_migrateCertificateApi";
import { MIGRATE_CERTIFICATE_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GenerateMigrateCertificateApi extends MigrateCertificateApi {
    readonly GENERATE_API_PATH = MIGRATE_CERTIFICATE_API_PATH.MIGRATE_CERTIFICATE_GENERATE;
    sendPostRequest(argv: BFMetaPcSdk.CrossChain.GenerateMigrateCertificateParams): Promise<BFMetaPcSdk.TransactionServer.MigrateCertificateReturn>;
}

export abstract class MigrateCertificateApi {
    abstract readonly GENERATE_API_PATH: BFMetaPcSdk.CrossChain.MIGRATE_CERTIFICATE_API_PATH;

    constructor(protected networkHelper: BFMetaPcSdk.NetworkHelper) {}
}

export declare abstract class MigrateCertificateApi {
    protected networkHelper: BFMetaPcSdk.NetworkHelper;
    abstract readonly GENERATE_API_PATH: BFMetaPcSdk.CrossChain.MIGRATE_CERTIFICATE_API_PATH;
    constructor(networkHelper: BFMetaPcSdk.NetworkHelper);
}

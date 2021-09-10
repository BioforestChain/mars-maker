export declare abstract class MigrateCertificateApi {
    protected networkHelper: BFChainPcSdk.NetworkHelper;
    abstract readonly GENERATE_API_PATH: BFChainPcSdk.CrossChain.MIGRATE_CERTIFICATE_API_PATH;
    constructor(networkHelper: BFChainPcSdk.NetworkHelper);
}

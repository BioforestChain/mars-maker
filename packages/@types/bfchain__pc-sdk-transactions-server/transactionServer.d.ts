export declare class TransactionServer {
    private __isRunning;
    private __bfchainCore;
    private __port;
    private __hasBody;
    private __isJson;
    private __onRequest;
    getTransactionServerPort(configRootPath?: string): number;
    timeCorrecting(timeOffset: number): void;
    runTransactionServer(port?: number, configOptions?: BFChainPcSdk.TransactionConfigOptions, genesisBlockJson?: BFChainCore.GenesisBlockJSON): Promise<void>;
}

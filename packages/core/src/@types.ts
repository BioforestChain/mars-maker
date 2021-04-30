declare namespace BFChainPcSdk {
    interface Config {
        /**api 配置信息 */
        apiConfig: ApiConfig;
        /**交易服务端口号, 默认值 8888 */
        transactionServerPort: number;
        /**交易配置信息 */
        transactionConfig: TransactionConfig;
    }

    type ConfigOptions = AllPartial<Config>;
}

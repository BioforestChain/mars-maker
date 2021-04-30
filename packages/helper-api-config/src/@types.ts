declare namespace BFChainPcSdk {
    interface ApiConfig {
        /**节点 ip, 默认值 127.0.0.1 */
        ip: string;
        /**节点端口号, 默认值 9003 */
        port: number;
        /**请求超时时间，单位 ms，默认 10000 */
        requestTimeOut: number;
        /**请求协议, http || websocket, 默认值 websocket */
        requestProtocol: BFChainPcSdk.REQUEST_PROTOCOL;
    }

    type ApiConfigOptions = Partial<ApiConfig>;
}

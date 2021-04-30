# BFChain-SDK

## Installation - 安装

`$ npm install @bfchain/pc-sdk-core`

### Requrements - 必要条件

-   npm

-   typescript

## Docs & Community - 文档 & 社区

<!-- 这里写我们的社区及文档的地址 -->

## Usage - 用法

```ts
import { Sdk } from "@bfchain/pc-sdk-core";

// 也可以再运行目录下建 config/config.json 填入以下内容，new 的时候就不用传参

const config: BFChainPcSdk.Config = {
    "//ip": "节点 ip, 默认值 127.0.0.1",
    ip: "127.0.0.1",
    "//port": "节点端口号, 默认值 9003",
    port: 19003,
    "//requestTimeOut": "请求超时时间, 单位 ms, 默认 10000",
    requestTimeOut: 10000,
    "//requestProtocol": "请求协议, http || websocket, 默认值 websocket",
    requestProtocol: "websocket",

    "//transactionServerPort": "交易服务端口号, 默认值 8888",
    transactionServerPort: 8888,
    "//isGenesisBlockProvidedExternally": "创世块是否由外部提供, 默认在 genesisInfos 目录, 默认值 false",
    isGenesisBlockProvidedExternally: false,
    "//networkType": "网络类型: testnet || mainnet, 默认值 mainnet",
    networkType: "testnet",
    "//chainAssetType": "区块链链权益名, 默认值 BFT",
    chainAssetType: "BFT",
    "//blockPerRound": "每轮的区块数量, 默认值 57",
    blockPerRound: 57,
    "//forgeInterval": "锻造区块的时间间隔, 默认值 128",
    forgeInterval: 10,
    "//lang": "密码类型: cn 汉语 || jp 日语 || sp 西班牙语 || it 意大利语 || fr 法语 || en 英语, 默认值 en",
    lang: "en",
};

const sdk = new Sdk(config);

// 运行生成交易的 http 服务器
await sdk.runTransactionServer();

// 调用创建交易的接口
const acceptVoteTransaction = await sdk.api.transaction.generateAcceptVote(argv);

// 调用广播交易的接口
const result = await sdk.api.transaction.broadcastAcceptVote(acceptVoteTransaction);

// 调用创建并广播交易的接口
const result = await sdk.api.transaction.sendAcceptVote(argv);

// 调用查询区块的接口
const result = await sdk.api.basic.getLastBlock();
```

## Changelog - 更新日志

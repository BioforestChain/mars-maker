# BFChain-SDK

## Installation - 安装

`$ npm install @bfchain/pc-sdk`

### Requrements - 必要条件

-   npm

-   typescript
## Docs & Community - 文档 & 社区
<!-- 这里写我们的社区及文档的地址 -->
## Usage - 用法

```ts
import { BFChainPC_SDK } from "@bfchain/pc-sdk";

const sdk = new BFChainPC_SDK();

// 连接的节点ip及端口
sdk.init({ ip: "127.0.0.1", port: 19003, timeout: 10000 });

// 获取最新区块
await sdk.getLastBlock();
```

## Changelog - 更新日志

-   1.0.0
    -   支持 BFChain pc 节点 v3.5.26 的接口调用

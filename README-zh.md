# Mars Maker（中文）

## 简介
BFMeta 交易生成与广播的服务端 monorepo，负责监听客户端请求、与链节点交互并广播交易。基于 TypeScript + Yarn 工作区，支持 CLI 打包与生产构建脚本。

## 架构概览
- `src/`：交易生成、验证、广播与节点通信逻辑，含日志与配置读取。
- `config/config.json`：示例配置，定义服务端口、节点列表、广播超时、创世信息、密钥语言。
- `scripts/`：清理与生产构建（`buildProd.js` 等）。
- `tsconfig*.json` / `lerna.json`：多目标与包管理配置。

## 快速开始
1) `yarn install`（Node 16+）
2) 配置服务：复制并修改 `config/config.json`（端口、`chainNodeIps`、`genesisInfoConfig`、`lang`）。
3) 开发模式：`yarn dev`（watch 编译）。
4) 全量构建：`yarn rebuild` 或 `yarn build`（输出到 `build/`）。
5) 生产打包：`yarn prod`（清理+构建+生产脚本）或 `yarn prod:dev` 快速验证。

## 贡献规范
- 保持类型安全，不新增 `any`/`@ts-ignore`；公共逻辑放共享模块，避免重复（DRY）。
- 配置字段变更需更新 README 与默认值校验。
- 更改链交互逻辑时，附上最小调用示例或回归用例；提交前执行 `yarn build`。
- 分支/提交：`feature/<scope>`、`fix/<issue>`，提交语句简洁。

# Mars Maker (English)
For Chinese version please see [README-zh](README-zh.md).

## Overview
Server-side monorepo for generating and broadcasting BFMeta transactions; listens to client requests, talks to chain nodes, and broadcasts transactions. TypeScript + Yarn workspaces with CLI packaging and production build scripts.

## Architecture
- `src/`: transaction generation/validation/broadcast plus node communication, logging, config loading.
- `config/config.json`: sample config for port, `chainNodeIps`, `broadcastTimeout`, `genesisInfoConfig`, `lang`.
- `scripts/`: cleanup and production builds (`buildProd.js`, etc.).
- `tsconfig*.json` / `lerna.json`: multi-target and package management configs.

## Getting Started
1) `yarn install` (Node 16+)
2) Configure service: copy & edit `config/config.json` (port, `chainNodeIps`, `genesisInfoConfig`, `lang`).
3) Dev mode: `yarn dev` (watch build).
4) Full build: `yarn rebuild` or `yarn build` (outputs `build/`).
5) Production bundle: `yarn prod` (clean + build + prod scripts) or quick `yarn prod:dev`.

## Contribution Guide
- Keep type-safety: no new `any`/`@ts-ignore`; share common logic in shared modules to stay DRY.
- Update README and default validation when config fields change.
- For chain interaction changes, provide a minimal usage example or regression case; run `yarn build` before commit.
- Branch/commit: `feature/<scope>`, `fix/<issue>` with concise messages.

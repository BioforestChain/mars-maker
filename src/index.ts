import type {} from "@bfchain/coretools";
import "@bfmeta/transaction-maker-typings";
import type {} from "@bfmeta/transaction-maker-core";
import "./@types";

import * as path from "node:path";
import cluster, { Worker } from "node:cluster";
import { Config } from "./config";
import { Logger } from "./logger";

export async function bootstrap() {
    process.env["name"] = "master";
    const config = new Config();
    const logger = new Logger(config);
    cluster.on("disconnect", (worker) => {
        logger.info(`worker ${workers[worker.id].workerName} disconnect`);
    });
    cluster.on("exit", (worker, code, signal) => {
        logger.info(`worker ${workers[worker.id].workerName} died with signal ${signal} code ${code}`);
    });
    const workers: {
        [id: number]: {
            worker: Worker;
            workerName: string;
        };
    } = {};
    const workerPath = path.resolve(__dirname, "./bootstrapWorker.js");
    for (let i = 0; i < config.config.numberOfWorkers; i++) {
        const workerName = `web_${i}`;
        cluster.setupPrimary({
            silent: false,
            exec: workerPath,
        });
        const worker = cluster.fork({
            name: workerName,
        });
        workers[worker.id] = {
            worker,
            workerName,
        };
    }
    logger.info(`TransactionMaker Server running...`);
}

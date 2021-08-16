/// <reference types="node" />
import type { IncomingMessage } from "http";
export declare function parseGetRequestParameter(imcomingMessage: IncomingMessage): Promise<{
    [key: string]: any;
}>;
export declare function parsePostRequestParameter(imcomingMessage: IncomingMessage): Promise<{
    [key: string]: any;
}>;

import { NodeServerAdapter } from "./NodeServerAdapter.js";
import { HttpRaulServer, RaulServer } from "./RaulServer.js";
import { HttpServerAdapter } from "./types/HttpServerAdapter.js";

interface RaulOptions {
    adapter?: HttpServerAdapter;
}

export class RaulServerFactory {

    private constructor() {}

    static create(options?: RaulOptions): HttpRaulServer {
        const adapter = options?.adapter || new NodeServerAdapter();
        return new RaulServer(adapter);
    }
}
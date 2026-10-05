import { createServer } from "http";
import { HttpServerAdapter } from "./types/HttpServerAdapter.js";

export class NodeServerAdapter implements HttpServerAdapter {

    private server: any;

    constructor() {

        this.server = this.createServer();
    }

    private createServer(): any {

        const server = createServer((req, res) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Hello, World!\n');
        });
        return server;
    }

    public listen(port: number = 3000, callback: () => void = (): void => {}): any {
        this.server.listen(port, callback);
    }

}


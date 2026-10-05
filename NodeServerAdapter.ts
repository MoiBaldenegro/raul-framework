import { createServer } from "http";
import { HttpServerAdapter } from "./types/HttpServerAdapter.js";

export class NodeServerAdapter implements HttpServerAdapter {
    

    public createServer() {
        return createServer((req, res) => {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Hello, World!\n');
        });

    }

    public listen(port: number, callback: () => void): void {
        const server = this.createServer();
        server.listen(port, callback);
    }
}


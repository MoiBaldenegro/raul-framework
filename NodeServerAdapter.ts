import { createServer, IncomingMessage, ServerResponse } from "http";
import { HttpServerAdapter } from "./types/HttpServerAdapter.js";

export class NodeServerAdapter implements HttpServerAdapter {
    private __server: any = null;

     public listen(port: number = 3000, handler: Function, callback: () => void = (): void => {}): any {
            this.__server = createServer((req: IncomingMessage, res: ServerResponse) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
             const method = req.method ||  'GET';
             const path = req.url || '/';
             handler(method, path);
             res.end('Hello World\n');
        });
        this.__server.listen(port, callback);
    }

}


import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import {  HttpServerAdapter } from "./types/HttpServerAdapter.js";
import { Dispatcher } from "./RaulServer.js";
import { HttpMethod } from "./HttpMethod.js";



export class NodeServerAdapter implements HttpServerAdapter {
    private __server: Server | null = null;

     public listen(port: number = 3000, dispatcher: Dispatcher, callback: () => void = (): void => {}): void {
            this.__server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
                const method = (req.method  ||  'GET') as HttpMethod;
                const path = req.url || '/';
                const fetchReq = this.__toWebRequest(req);
                const webRes = await dispatcher(method, path, fetchReq);
                await this.__writeResponse(res, webRes);
        });
             
        this.__server.listen(port, callback);
    }

    

    /**
     * Convierte el IncomingMessage nativo de Node a una instancia de Request (Fetch API)
     */
    private __toWebRequest(nodeReq: IncomingMessage): Request {
        const protocol = (nodeReq.socket as any)?.encrypted ? "https" : "http";
        const host = nodeReq.headers.host || "localhost";
        const fullUrl = new URL(nodeReq.url || "/", `${protocol}://${host}`);

        const headers = new Headers();
        for (const [key, value] of Object.entries(nodeReq.headers)) {
            if (Array.isArray(value)) {
                value.forEach(v => headers.append(key, v));
            } else if (value !== undefined) {
                headers.set(key, value);
            }
        }

        const method = nodeReq.method || "GET";
        const bodyPermitted = method !== "GET" && method !== "HEAD";

        return new Request(fullUrl.toString(), {
            method,
            headers,
            body: bodyPermitted ? (nodeReq as unknown as ReadableStream) : null,
            duplex: bodyPermitted ? "half" : undefined,
        });
    }

    /**
     * Escribe la Response estándar de vuelta en el ServerResponse de Node
     */
    private async __writeResponse(nodeRes: ServerResponse, res: Response): Promise<void> {
        nodeRes.statusCode = res.status;
        res.headers.forEach((val, key) => nodeRes.setHeader(key, val));

        if (res.body) {
            const reader = res.body.getReader();
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                nodeRes.write(value);
            }
        }
        nodeRes.end();
    }

}


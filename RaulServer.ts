import { NodeServerAdapter } from "./NodeServerAdapter.js";
import { Router} from "./Router.js";
import { HttpServerAdapter } from "./types/HttpServerAdapter.js";



export interface HttpRaulServer{
    get(path: string, handler: Function): void;
    post(path: string, handler: Function): void;
    put(path: string, handler: Function): void;
    delete(path: string, handler: Function): void;
    patch(path: string, handler: Function): void;
    options(path: string, handler: Function): void;
    listen(port: number, callback: () => void): void;
}

export class RaulServer implements HttpRaulServer {
    private __httpServerAdapter: HttpServerAdapter;
    private __router: Router = new Router();

    constructor(HttpServerAdapter: HttpServerAdapter) {
        this.__httpServerAdapter = HttpServerAdapter; 
    }

    private dispatcher (method: string, path: string): void {
        const handler = this.__router.getHandler(method, path);
        if(!handler) throw new Error(`No route found for ${method} ${path}`);
        handler();
    } 

    public get(path: string, handler: Function): void {
        this.__router.get(path, handler);
    }

    public post(path: string, handler: Function): void {
        this.__router.post(path, handler);
    }

    public put(path: string, handler: Function): void {
        this.__router.put(path, handler);
    }

    public delete(path: string, handler: Function): void {
        this.__router.delete(path, handler);
    }

    public patch(path: string, handler: Function): void {
        this.__router.patch(path, handler);
    }

    public options(path: string, handler: Function): void {
        this.__router.options(path, handler);
    }

    
    public listen(port: number, callback: () => void): void {
        const dispatcher = this.dispatcher.bind(this);
        this.__httpServerAdapter.listen(port, dispatcher, callback);
    }

} 

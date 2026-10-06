import { HttpMethod } from "./HttpMethod.js";
import { HttpHandler, Router} from "./Router.js";
import { HttpServerAdapter } from "./types/HttpServerAdapter.js";


export type SupportedHttpMethods = Lowercase<keyof typeof HttpMethod>;

export type HttpMethodMethods = {
  [K in SupportedHttpMethods]: (path: string, handler: HttpHandler) => void;
};

export interface HttpRaulServer extends HttpMethodMethods{
    listen(port: number, callback: () => void): void;
}

export interface Dispatcher {
    (method: HttpMethod, path: string, req: Request): Promise<Response>;
}

export interface RaulServer extends HttpMethodMethods {}

export class RaulServer implements HttpRaulServer {

       constructor(
        private readonly __adapter: HttpServerAdapter,
        private readonly __router: Router = new Router(),
    ) {

        for (const method of Object.values(HttpMethod)) {
            const lowerMethod = method.toLowerCase() as SupportedHttpMethods;
            this[lowerMethod] = (path: string, handler: HttpHandler) => {
                this.__router[lowerMethod](path, handler);
            }
        }
    }

    private async dispatcher  (method:HttpMethod, path: string, req: Request): Promise<Response> {
        const handler = this.__router.getHandler(method, path);
        if (!handler) return new Response("Not Found", { status: 404 });
        return handler(req);
    } 

    
    public async listen(port: number, callback: () => void): Promise<void> {
        const dispatcher : Dispatcher = this.dispatcher.bind(this);
        this.__adapter.listen(port, dispatcher, callback);
    }

} 

import { HttpMethod } from './HttpMethod.js';
import { HttpMethodMethods, SupportedHttpMethods } from './RaulServer.js';

export type HttpHandler = (req: Request) =>Response;
export type RouteMap = Map<string, Map<string, HttpHandler>>;
export type MapHandler = Map<string, HttpHandler>;

export interface IRouter extends HttpMethodMethods {
    getHandler(method: string, path: string): HttpHandler | undefined;
}

export interface Router extends HttpMethodMethods {}

export class Router implements IRouter {

    private __routes: RouteMap;

    constructor() {
        this.__routes = new Map<string, MapHandler>();

        Object.keys(HttpMethod).forEach((method) => {
            this.__routes.set(method.toLowerCase(), new Map<string, HttpHandler>());
        });

        for(const method of Object.keys(HttpMethod)){
            const lowerMethod = method.toLowerCase() as SupportedHttpMethods;

            this[lowerMethod] = (path: string, handler: HttpHandler) => {
                this.registerRoute(method as HttpMethod, path, handler);
            }

        }
    }

    private registerRoute(method: HttpMethod, path: string, handler: HttpHandler){
        this.__routes.get(method.toLowerCase())?.set(path, handler);
    }

    public getHandler(method: HttpMethod, path: string): HttpHandler | undefined {
        const routes = this.__routes.get(method.toLowerCase());
        if(!routes) throw new Error(`No route found for ${method} ${path}`);
        const handler = routes.get(path);
        return handler;
    }

}
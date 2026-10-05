import { HttpMethod } from './HttpMethod';

interface IRoute {
    get(path: string, handler: Function): void;
    post(path: string, handler: Function): void;
    put(path: string, handler: Function): void;
    delete(path: string, handler: Function): void;
    patch(path: string, handler: Function): void;
    options(path: string, handler: Function): void;
}

export class Router implements IRoute {

    private routes: Map<string, Map<string, Function>>;

    constructor() {
        this.routes = new Map<string, Map<string, Function>>();

        Object.keys(HttpMethod).forEach((method) => {
            this.routes.set(method.toLowerCase(), new Map<string, Function>());
        });
    }


    public get(path: string, handler: Function): void {
        this.routes.get(HttpMethod.GET.toLowerCase())?.set(path, handler);
    }

    public post(path: string, handler: Function): void {
        this.routes.get(HttpMethod.POST.toLowerCase())?.set(path, handler);
    }

    public put(path: string, handler: Function): void {
        this.routes.get(HttpMethod.PUT.toLowerCase())?.set(path, handler);
    }

    public delete(path: string, handler: Function): void {
        this.routes.get(HttpMethod.DELETE.toLowerCase())?.set(path, handler);
    }
    
    public patch(path: string, handler: Function): void {
        this.routes.get(HttpMethod.PATCH.toLowerCase())?.set(path, handler);
    }

    public options(path: string, handler: Function): void {
        this.routes.get(HttpMethod.OPTIONS.toLowerCase())?.set(path, handler);
    }
}
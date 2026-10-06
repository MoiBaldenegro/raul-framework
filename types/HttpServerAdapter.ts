
export interface HttpServerAdapter {
   listen(port: number, handler: Function, callback: () => void): void;
}
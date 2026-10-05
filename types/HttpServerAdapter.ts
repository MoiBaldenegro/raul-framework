export interface HttpServerAdapter {
   createServer(): any;
   listen(port: number, callback: () => void): void;
}
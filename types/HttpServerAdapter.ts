export interface HttpServerAdapter {
   listen(port: number, callback: () => void): void;
}
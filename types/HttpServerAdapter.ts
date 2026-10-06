import { Dispatcher } from "../RaulServer.js";


export interface HttpServerAdapter {
   listen(port: number, handler: Dispatcher, callback: () => void): void;
}
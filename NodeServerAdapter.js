"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeServerAdapter = void 0;
var http_1 = require("http");
var NodeServerAdapter = /** @class */ (function () {
    function NodeServerAdapter() {
        this.server = this.createServer();
    }
    NodeServerAdapter.prototype.createServer = function () {
        var server = (0, http_1.createServer)(function (req, res) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Hello, World!\n');
        });
        return server;
    };
    NodeServerAdapter.prototype.listen = function (port, callback) {
        if (port === void 0) { port = 3000; }
        if (callback === void 0) { callback = function () { }; }
        this.server.listen(port, callback);
    };
    return NodeServerAdapter;
}());
exports.NodeServerAdapter = NodeServerAdapter;

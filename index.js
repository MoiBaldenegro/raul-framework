"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NodeServerAdapter_js_1 = require("./NodeServerAdapter.js");
var Router_js_1 = require("./Router.js");
function main(httpServerAdapter) {
    if (httpServerAdapter === void 0) { httpServerAdapter = null; }
    if (!httpServerAdapter)
        throw new Error('HttpServerAdapter is required');
    httpServerAdapter.listen(3000, function () {
        console.log('Server is running on port 3000');
    });
    var router = new Router_js_1.Router();
    router.get('/users', function () {
        console.log('GET /users route handler');
    });
    router.post('/users', function () {
        console.log('POST /users route handler');
    });
    console.log(router);
}
var httpServerAdapter = new NodeServerAdapter_js_1.NodeServerAdapter();
main(httpServerAdapter);

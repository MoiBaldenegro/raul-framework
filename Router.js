"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
var HttpMethod_js_1 = require("./HttpMethod.js");
var Router = /** @class */ (function () {
    function Router() {
        var _this = this;
        this.routes = new Map();
        Object.keys(HttpMethod_js_1.HttpMethod).forEach(function (method) {
            _this.routes.set(method.toLowerCase(), new Map());
        });
    }
    Router.prototype.get = function (path, handler) {
        var _a;
        (_a = this.routes.get(HttpMethod_js_1.HttpMethod.GET.toLowerCase())) === null || _a === void 0 ? void 0 : _a.set(path, handler);
    };
    Router.prototype.post = function (path, handler) {
        var _a;
        (_a = this.routes.get(HttpMethod_js_1.HttpMethod.POST.toLowerCase())) === null || _a === void 0 ? void 0 : _a.set(path, handler);
    };
    Router.prototype.put = function (path, handler) {
        var _a;
        (_a = this.routes.get(HttpMethod_js_1.HttpMethod.PUT.toLowerCase())) === null || _a === void 0 ? void 0 : _a.set(path, handler);
    };
    Router.prototype.delete = function (path, handler) {
        var _a;
        (_a = this.routes.get(HttpMethod_js_1.HttpMethod.DELETE.toLowerCase())) === null || _a === void 0 ? void 0 : _a.set(path, handler);
    };
    Router.prototype.patch = function (path, handler) {
        var _a;
        (_a = this.routes.get(HttpMethod_js_1.HttpMethod.PATCH.toLowerCase())) === null || _a === void 0 ? void 0 : _a.set(path, handler);
    };
    Router.prototype.options = function (path, handler) {
        var _a;
        (_a = this.routes.get(HttpMethod_js_1.HttpMethod.OPTIONS.toLowerCase())) === null || _a === void 0 ? void 0 : _a.set(path, handler);
    };
    return Router;
}());
exports.Router = Router;

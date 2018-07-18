"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const enums_1 = require("./enums");
// 路由 http://expressjs.com/zh-tw/guide/routing.html
/**
 * 標示指定的 Class 為一個 Contract。
 * @param config 相關設定。
 */
function Contract(config = {}) {
    return Reflect.metadata(enums_1.ContractMetadataKey, config);
}
exports.Contract = Contract;
/**
 * 標示指定的 static function 為一個 Service。
 * @param config 相關設定。
 */
function Service(config = { method: enums_1.ServiceMethod.All }) {
    return Reflect.metadata(enums_1.ServiceMetadataKey, config);
}
exports.Service = Service;
//# sourceMappingURL=decorators.js.map
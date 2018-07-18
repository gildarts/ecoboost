"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 代表服務。
 */
exports.ServiceMetadataKey = Symbol('service');
/**
 * 代表 Contract。
 */
exports.ContractMetadataKey = Symbol('contract');
/**
 * Service 所支援的 http method。
 */
var ServiceMethod;
(function (ServiceMethod) {
    ServiceMethod["All"] = "all";
    ServiceMethod["Get"] = "get";
    ServiceMethod["Post"] = "post";
    ServiceMethod["Put"] = "put";
    ServiceMethod["Delete"] = "delete";
})(ServiceMethod = exports.ServiceMethod || (exports.ServiceMethod = {}));
//# sourceMappingURL=enums.js.map
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Route = __importStar(require("./dsa.consts"));
/** 代表說明。 */
function Description(text) {
    return Reflect.metadata(Route.DESCRIPTION, text);
}
exports.Description = Description;
/** 代表一個 DSA Contract。 */
function Contract(options) {
    return Reflect.metadata(Route.CONTRACT, options);
}
exports.Contract = Contract;
function Service(options) {
    let opt = options;
    if (!opt) {
        opt = new ServiceDescription();
    }
    if (!opt.method) {
        opt.method = 'all';
    }
    return Reflect.metadata(Route.SERVICE, opt);
}
exports.Service = Service;
class ContractDescription {
}
exports.ContractDescription = ContractDescription;
class ServiceDescription {
}
exports.ServiceDescription = ServiceDescription;
/** 代表 DSA Get Service */
function Get(path) {
    return Reflect.metadata(Route.GET, path);
}
exports.Get = Get;
/** 代表 DSA Post Service */
function Post(path) {
    return Reflect.metadata(Route.POST, path);
}
exports.Post = Post;
/** 代表 DSA Put Service */
function Put(path) {
    return Reflect.metadata(Route.PUT, path);
}
exports.Put = Put;
/** 代表 DSA Delete Service */
function Delete(path) {
    return Reflect.metadata(Route.DELETE, path);
}
exports.Delete = Delete;
/** 代表 DSA Service */
function All(path) {
    return Reflect.metadata(Route.ALL, path);
}
exports.All = All;
//# sourceMappingURL=dsa.decorator.js.map
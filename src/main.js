"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_resolve_1 = require("./path_resolve");
const rd = __importStar(require("rd"));
const require_1 = require("./require");
const CodeName = 'ecoboost';
console.log(`hello zoe server => ${CodeName}`);
console.log(`dirname: ${__dirname}`);
console.log(`filename: ${__filename}`);
console.log(path_resolve_1.Foo);
const services = rd.readFileFilterSync('./dynamic', /\.js/);
console.log(services);
console.log(require_1.rq);
// const ctx = require.context;
// console.log(ctx);
// services.forEach(function(item) {
//     require(item);
// });
//# sourceMappingURL=main.js.map
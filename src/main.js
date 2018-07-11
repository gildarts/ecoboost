"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const d = __importStar(require("./reflection/decorators"));
console.log(d);
// console.log(prettyreq('./ecoboost.config'));
// const services = rd.readFileFilterSync('./', /\.js$/);
// console.log(services);
// console.log('==========');
// services.forEach(function(item) {
//     console.log(`import ${item}`);
//     console.log(prettyreq(item));
// });
exports.name = 'zoe';
class ZoeServer {
    constructor(name) {
        this.name = name;
    }
    start() {
        console.log(`start... ${this.name} ${this.age}`);
    }
}
exports.ZoeServer = ZoeServer;
__export(require("./path_resolve"));
__export(require("./reflection/decorators"));
//# sourceMappingURL=main.js.map
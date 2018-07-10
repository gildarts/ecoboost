"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=main.js.map
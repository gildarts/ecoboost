"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const enums_1 = require("./enums");
function Service(options = { method: enums_1.ServiceMethod.All }) {
    return Reflect.metadata(enums_1.ReflectKey.Service, options);
}
exports.Service = Service;
//# sourceMappingURL=decorators.js.map
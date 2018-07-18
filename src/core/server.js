"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class Server {
    constructor() { }
    loadService(path) {
        const router = express_1.default.Router();
        router.get('/', (req, rsp) => {
            rsp.send('hello zoe');
        });
        return router;
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map
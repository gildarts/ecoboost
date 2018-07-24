import { ServiceMethod, InjectableMiddleware } from "./consts";
import { ServiceConfig } from "./service_config";

/**
 * ServiceConfig 預設　prototype，所有 ServiceConfig 實體會被動態繼承此類別。
 */
export class ServiceConfigImpl implements ServiceConfig {
    constructor() {}

    method = ServiceMethod.All;

    middleware: InjectableMiddleware | InjectableMiddleware[] = [];

    public registerRoute(callback: (httpMethod: ServiceMethod, middlewares: InjectableMiddleware[]) => void) {
        const method = this.method ? this.method : ServiceMethod.All;
        const middleware = this.middleware ? this.middleware: [];

        const methods = new Array<ServiceMethod>().concat(method) || [];
        const middlewares = new Array<InjectableMiddleware>().concat(middleware) || [];

        for(const m of methods) {
            callback(m, middlewares);
        }

    }
}
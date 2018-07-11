import 'reflect-metadata';
import { ReflectKey, ServiceMethod } from './enums';

export function Service(options: ServiceConfig = {method: ServiceMethod.All}) {
    return Reflect.metadata(ReflectKey.Service, options);
}

export interface ServiceConfig {
    /** http method，預設為 all => get, post, put, delete。 */
    method?: ServiceMethod;

    /** 呼叫路徑，如未指定會使用 function 名稱當路徑。 */
    path?: string;

    /** 中介程式清單。 */
    middlewares?: any[];
}

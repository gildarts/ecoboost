import 'reflect-metadata';
import { PackageMetadataKey, ServiceMetadataKey, ServiceMethod } from './enums';

// 路由 http://expressjs.com/zh-tw/guide/routing.html

/**
 * 標示指定的 Class 為一個 Contract。
 * @param config 相關設定。
 */
export function Package(config: PackageConfig = {}) {
    return Reflect.metadata(PackageMetadataKey, config);
}

/**
 * 標示指定的 static function 為一個 Service。
 * @param config 相關設定。
 */
export function Service(config: ServiceConfig = {}) {

    const confImpl = Object.setPrototypeOf(config, new ServiceConfigImpl());

    return Reflect.metadata(ServiceMetadataKey, confImpl);
}

export interface PackageConfig {
    /** 呼叫路徑，如未指定會使用 class 名稱當路徑(一律小寫)。
     * http://expressjs.com/en/guide/routing.html (Route parameters)
    */
    path?: string;

    /**
     * 略過 path 設定，不會產生新的路徑層次。。
     */
    withoutPath?: boolean;
}

export interface ServiceConfig {
    /** http method，預設為 all => get, post, put, delete。 */
    method?: ServiceMethod | ServiceMethod[];

    /** 
     * 呼叫路徑，如未指定會使用 function 名稱當路徑(一律小寫)。 
    */
    path?: string;

    /**
     * 略過 path 設定，不會產生新的路徑層次。(預設為 false)。
     */
    withoutPath?: boolean;
}

export class ServiceConfigImpl implements ServiceConfig {
    constructor() {}

    method = ServiceMethod.All;

    public registerRoute(callback: (httpMethod: ServiceMethod) => void) {
        const method = this.method ? this.method : ServiceMethod.All;

        const methods = new Array<ServiceMethod>().concat(method) || [];

        for(const m of methods) {
            callback(m);
        }

    }
}

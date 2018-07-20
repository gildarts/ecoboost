import 'reflect-metadata';
import { PackageMetadataKey, ServiceMetadataKey, ServiceMethod } from './enums';
import { RequestHandler } from 'express';

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
export function Service(config: ServiceConfig = { method: ServiceMethod.All }) {
    return Reflect.metadata(ServiceMetadataKey, config);
}

export interface PackageConfig {
    /** 呼叫路徑，如未指定會使用 function 名稱當路徑。
     * http://expressjs.com/en/guide/routing.html (Route parameters)
    */
    path?: string;

    /** 中介程式清單。 */
    middlewares?: RequestHandler[];
}

export interface ServiceConfig {
    /** http method，預設為 all => get, post, put, delete。 */
    method?: ServiceMethod;

    /** 呼叫路徑，如未指定會使用 function 名稱當路徑。 
     * http://expressjs.com/en/guide/routing.html (Route parameters)
    */
    path?: string;

    /** 中介程式清單。 */
    middlewares?: RequestHandler[];
}
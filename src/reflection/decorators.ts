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
export function Service(config: ServiceConfig = { method: ServiceMethod.All }) {
    return Reflect.metadata(ServiceMetadataKey, config);
}

export interface PackageConfig {
    /** 呼叫路徑，如未指定會使用 class 名稱當路徑(一律小寫)。
     * http://expressjs.com/en/guide/routing.html (Route parameters)
    */
    path?: string;

    /**
     * 略過 route 設定。
     */
    withoutRoute?: boolean;
}

export interface ServiceConfig {
    /** http method，預設為 all => get, post, put, delete。 */
    method?: ServiceMethod;

    /** 
     * 呼叫路徑，如未指定會使用 function 名稱當路徑(一律小寫)。 
    */
    path?: string;

    /**
     * 略過 route 設定(預設為 false)。
     */
    withoutRoute?: boolean;
}

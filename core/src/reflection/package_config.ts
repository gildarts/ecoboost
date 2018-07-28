import { InjectableMiddleware } from "./consts";
import { StaticProvider } from '../di/provider';

export interface PackageConfig {
    /** 
     * 呼叫路徑，如未指定會使用 class 名稱當路徑(一律小寫)。
     * https://github.com/alexmingoia/koa-router
    */
    path?: string;

    /**
     * 略過 path 設定，不會產生新的路徑層次。。
     */
    withoutPath?: boolean;

    /**
     * 中介軟體。
     */
    middleware?: InjectableMiddleware | InjectableMiddleware[];

    /**
     * package 層級的 provider。
     */
    providers?: StaticProvider[]
}
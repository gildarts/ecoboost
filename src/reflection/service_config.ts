import { ServiceMethod, IServiceMiddleware } from "./consts";
import { IMiddleware } from 'koa-router';

export interface ServiceConfig {
    /** http method，預設為 all => get, post, put, delete。 */
    method?: ServiceMethod | ServiceMethod[];

    /** 
     * 呼叫路徑，如未指定會使用 function 名稱當路徑(一律小寫)。 
     * https://github.com/alexmingoia/koa-router
    */
    path?: string;

    /**
     * 略過 path 設定，不會產生新的路徑層次。(預設為 false)。
     */
    withoutPath?: boolean;

    /**
     * 中介軟體。
     */
    middleware?: IServiceMiddleware | IServiceMiddleware[];
}

import 'reflect-metadata';
import * as Route from './dsa.consts';

/** 代表說明。 */
export function Description(text: string) {
    return Reflect.metadata(Route.DESCRIPTION, text);
}

/** 代表一個 DSA Contract。 */
export function Contract(options?: ContractDescription) {
    return Reflect.metadata(Route.CONTRACT, options);
}

export function Service(options?: ServiceDescription) {

    let opt = options;
    if(!opt) {
        opt = new ServiceDescription();
    }

    if (!opt.method) {
        opt.method = 'all';
    }

    return Reflect.metadata(Route.SERVICE, opt);
}

export class ContractDescription {
    /** Contract 名稱。 */
    public name?: string;

    /** 中介程式清單。 */
    public middlewares?: any[];

    /** 錯誤處理 handler。 */
    public errorHandler?: any;

    /** 隱藏，不會被列出。*/
    public hidden?: boolean;
}

export class ServiceDescription {
    /** http method，預設為 all => get, post, put, delete。 */
    public method?: "all" | "get" | "post" | "put" | "delete";

    /** 呼叫路徑，如未指定會使用 function 名稱當路徑。 */
    public path?: string;

    /** 中介程式清單。 */
    public middlewares?: any[];
}

/** 代表 DSA Get Service */
export function Get(path: string) {
    return Reflect.metadata(Route.GET, path);
}

/** 代表 DSA Post Service */
export function Post(path: string) {
    return Reflect.metadata(Route.POST, path);
}

/** 代表 DSA Put Service */
export function Put(path: string) {
    return Reflect.metadata(Route.PUT, path);
}

/** 代表 DSA Delete Service */
export function Delete(path: string) {
    return Reflect.metadata(Route.DELETE, path);
}

/** 代表 DSA Service */
export function All(path: string) {
    return Reflect.metadata(Route.ALL, path);
}

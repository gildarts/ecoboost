import { Injector } from '../di/injector';
import { Context } from 'koa';

declare module 'koa' {

    interface Context {
        /**
         * 提供全域服務取得。
         */
        injector: Injector
    }
}

/**
 * 實作 middleware 時，一定要 return next()，否則會產生「not found」錯誤。
 */
export interface Middleware {
    (ctx: Context, next: () => Promise<any>): any;
}

/**
 * 代表服務。
 */
export const ServiceMetadataKey = Symbol('service');

/**
 * 代表 Contract。
 */
export const PackageMetadataKey = Symbol('package');

/**
 * Service 所支援的 http method。
 */
export enum ServiceMethod {
    All = 'all',
    Get = 'get',
    Post = 'post',
    Put = 'put',
    Delete = 'delete',
    Head = 'head',
    Patch = 'patch',
    Options = 'options'
}

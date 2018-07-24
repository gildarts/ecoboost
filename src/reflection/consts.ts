import Router from 'koa-router';
import { Injector } from '../di/injector';

/**
 * 提供 Injector 的 Context。
 */
export interface InjectableContext extends Router.IRouterContext {
    /**
     * 提供全域服務取得。
     */
    injector: Injector;

    /** 任何東西。 */
    [x: string]: any;
}

/**
 * 實作 middleware 時，一定要 return next()，否則會產生「not found」錯誤。
 */
export interface InjectableMiddleware {
    (ctx: InjectableContext, next: () => Promise<any>): any;
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

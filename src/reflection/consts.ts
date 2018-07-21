import Router from 'koa-router';

export type IMiddleware = Router.IMiddleware;

export type IServiceMiddleware = ((ctx: Router.IRouterContext, next: () => Promise<any>, pkgClass: any) => any);

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

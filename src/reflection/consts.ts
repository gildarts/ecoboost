import Router, { IRouterContext } from 'koa-router';
import { Injector } from '../di/injector';

interface InjectorContext {
    /**
     * 提供全域服務取得。
     */
    injector: Injector;
}

/**
 * 代表 service middleware 參數。
 */
export interface IServiceContext extends Router.IRouterContext, InjectorContext {
    /**
     * Instance of package class。
     */
    pkgInstance: any;
}

/**
 * 代表 package middleware 參數。
 */
export interface IPackageContext extends Router.IRouterContext, InjectorContext {
}

export interface IPackageMiddleware {
    (ctx: IPackageContext, next: () => Promise<any>): any;
}

export interface IServiceMiddleware {
    (ctx: IServiceContext, next: () => Promise<any>): any;
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

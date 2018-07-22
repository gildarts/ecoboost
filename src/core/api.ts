import Koa from 'koa';
import Router from 'koa-router';

import { loadPackageFromFolder, normalizeRouteName } from './utils';
import { IServiceMiddleware, IServiceContext } from '../reflection';
import { ServiceConfigImpl } from '../reflection/service_config_impl';
import { StaticProvider, Injector } from '../di';

export class API {

    private router: Router;

    private constructor() {
        this.router = new Router();
    }

    /**
     * 以 Koa 格式輸出 Contract 所有路由路徑。
     */
    public get routes(): Koa.Middleware {
        return this.router.routes();
    }

    /**
     * 從指定路徑載入 Contract 所有 Package、Service。
     * @param dirPath 路徑。
     */
    public static async load(dirPath: string, options?: { providers: StaticProvider[] }): Promise<API> {

        const api = new API();
        const apiRouter = api.router;

        const rootInjector = Injector.create(options || { providers: [] });

        for(const pkg of await loadPackageFromFolder(dirPath)) {
            const { pkgConfig } = pkg;
            const pkgRouter = new Router();

            for(const srv of pkg.scanServiceFunction(rootInjector)) {
                const { srvConfig, srvFunction } = srv;

                let path = normalizeRouteName(srvConfig.path ? srvConfig.path : srv.name);

                if (srvConfig.withoutPath && srvConfig.withoutPath) {
                    path = '/';
                }

                (srvConfig as ServiceConfigImpl).registerRoute((srvMeth, middlewares) => {
                    
                    const mids = middlewares.map((mid) => this.wrapServiceMiddleware(mid, srv.pkgInstance))

                    pkgRouter[srvMeth](path, ...[...mids, srvFunction]);
                });
            }

            const middleware = pkgConfig.middleware ? pkgConfig.middleware: [];
            const middlewares = new Array<any>().concat(middleware) || [];

            if (pkgConfig.withoutPath && pkgConfig.withoutPath) {
                apiRouter.use(...[...middlewares, pkgRouter.routes()]);
            } else {
                const path = normalizeRouteName(pkgConfig.path ? pkgConfig.path : pkg.name);
                apiRouter.use(path, ...[...middlewares, pkgRouter.routes()]);
            }
        }

        return api;
    }

    private static wrapServiceMiddleware(mid: IServiceMiddleware, pkgInstance: any) {
        return (ctx: IServiceContext, next: () => Promise<any>) => {
            ctx.pkgInstance = pkgInstance;
            return mid(ctx, next);
        }
    }
}
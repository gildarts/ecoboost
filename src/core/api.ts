import Koa from 'koa';
import Router from 'koa-router';

import { loadPackageFromFolder, normalizeRouteName } from './utils';
import { ServiceMethod } from '../reflection/enums';

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
    public static async load(dirPath: string): Promise<API> {

        const api = new API();
        const apiRouter = api.router;

        for(const pkg of await loadPackageFromFolder(dirPath)) {
            const pkgRouter = new Router();

            for(const srv of pkg.scanServiceFunction()) {
                const { srvConfig, srvFunction } = srv;

                let path = normalizeRouteName(srvConfig.path ? srvConfig.path : srv.name);

                if (srvConfig.withoutRoute && srvConfig.withoutRoute) {
                    path = '/';
                }

                if(srvConfig.method === ServiceMethod.Get) pkgRouter.get(path, srvFunction);
                if(srvConfig.method === ServiceMethod.Post) pkgRouter.post(path, srvFunction);
                if(srvConfig.method === ServiceMethod.Put) pkgRouter.put(path, srvFunction);
                if(srvConfig.method === ServiceMethod.Delete) pkgRouter.delete(path, srvFunction);
                if(srvConfig.method === ServiceMethod.Head) pkgRouter.head(path, srvFunction);
                if(srvConfig.method === ServiceMethod.Options) pkgRouter.options(path, srvFunction);
                if(srvConfig.method === ServiceMethod.Patch) pkgRouter.patch(path, srvFunction);
                if(srvConfig.method === ServiceMethod.All) pkgRouter.all(path, srvFunction);
            }

            if (pkg.pkgConfig.withoutRoute && pkg.pkgConfig.withoutRoute) {
                apiRouter.use(pkgRouter.routes());
            } else {
                const path = normalizeRouteName(pkg.pkgConfig.path ? pkg.pkgConfig.path : pkg.name);
                apiRouter.use(path, pkgRouter.routes());
            }
        }

        return api;
    }
}
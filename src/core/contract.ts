import Koa from 'koa';
import Router from 'koa-router';

import { loadPackageClassesFrom, normalizeRouteName } from './utils';

export class Contract {

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
    public static async load(dirPath: string): Promise<Contract> {

        const contract = new Contract();
        const ctcRouter = contract.router;
        const pkgClasses = await loadPackageClassesFrom(dirPath);

        for(const pkg of pkgClasses) {
            const pkgRouter = new Router();

            for(const srv of pkg.scanServiceFunction()) {

                if(srv.srvConfig.withoutRoute && srv.srvConfig.withoutRoute) {
                    pkgRouter.get('/', srv.srvFunction);
                } else {
                    const path = normalizeRouteName(srv.srvConfig.path ? srv.srvConfig.path : srv.name);
                    pkgRouter.get(path, srv.srvFunction);
                }
            }

            if (pkg.pkgConfig.withoutRoute && pkg.pkgConfig.withoutRoute) {
                ctcRouter.use(pkgRouter.routes());
            } else {
                const path = normalizeRouteName(pkg.pkgConfig.path ? pkg.pkgConfig.path : pkg.name);
                ctcRouter.use(path, pkgRouter.routes());
            }
        }

        return contract;
    }
}
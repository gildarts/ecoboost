import Koa from 'koa';
import Router from 'koa-router';

import { loadPackageClassesFrom } from './utils';

export class Contract {

    private router: Router;

    constructor() {
        this.router = new Router();
    }

    /**
     * 以 Koa 格式輸出 Contract 所有路由路徑。
     */
    public get routes(): Koa.Middleware {
        return this.router.routes();
    }

    public static async load(dirPath: string): Promise<Contract> {

        const contract = new Contract();
        const pkgRouter = contract.router;

        const pkgChild = new Router();
        pkgChild.get(`/:id/:age`, async (ctx, next) => {
            const { request, response } = ctx;
            console.log('/:id/:age');

            const pkgClasses = await loadPackageClassesFrom(dirPath);

            response.body = ctx.params;
        });

        pkgRouter.use('/:name', async (ctx, next) => {
            console.log(ctx.params);
            await next();
            console.log(ctx.path);
        }, pkgChild.routes());

        return contract;
    }
}


import Koa from 'koa';
import Router from 'koa-router';

import { loadPackageClassesFrom } from './utils';

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

        ctcRouter.get('/', async (ctx) => {
            const { response } = ctx;

            const pkgs = [];
            for(const cls of pkgClasses) {
                pkgs.push(cls.pkgConfig);
                cls.createServiceRoutes();
            }

            response.body = pkgs;
        });
        
        // const pkgChild = new Router();

        // const tr = new TestRoute(dirPath);

        // pkgChild.get('/:id/:age', tr.getZoe.bind(tr));

        // pkgChild.get(`/:id/:age`, async (ctx, next) => {
        //     const { request, response } = ctx;
        //     console.log('/:id/:age');

        //     const pkgClasses = await loadPackageClassesFrom(dirPath);

        //     response.body = ctx.params;
        // });

        // pkgRouter.use('/:name', async (ctx, next) => {
        //     console.log(ctx.params);
        //     await next();
        //     console.log(ctx.path);
        // }, pkgChild.routes());

        return contract;
    }
}

class TestRoute {

    constructor(private dirPath: string) {
    }

    public async getZoe(ctx: Router.IRouterContext) {
        const { request, response } = ctx;
        console.log('/:id/:age');

        const pkgClasses = await loadPackageClassesFrom(this.dirPath);

        response.body = ctx.params;
    }
}
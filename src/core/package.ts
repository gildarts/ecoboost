import Router from 'koa-router';

import javascriptScanner from'./javascript_scanner';

import { loadjs } from '../noparse/require_redirect';
import { ContractMetadataKey } from '../reflection/enums';

export class Package {

    public static async load(dirPath: string): Promise<Router> {

        const pkgRouter = new Router();

        const pkgChild = new Router();
        pkgChild.get(`/:id/:age`, (ctx, next) => {
            const { request, response } = ctx;
            console.log('/:id/:age');

            Package.loadFiles(dirPath);

            response.body = ctx.params;
        });

        pkgRouter.use('/:name', async (ctx, next) => {
            console.log(ctx.params);
            await next();
            console.log(ctx.path);
        }, pkgChild.routes());

        return pkgRouter;
    }

    public static async loadFiles(dirPath: string) {
        const jsFiles: string[] = [];
        await javascriptScanner(dirPath, jsFiles);

        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        for(const js of jsFiles) {

            try {
                const jscode = loadjs(js);

                console.log(`======> ${js}`);

                for(const item of Object.getOwnPropertyNames(jscode)) {
                    const pkgClass = jscode[item];

                    if(Object.isExtensible(pkgClass)) {
                        const metadata = Reflect.getMetadata(ContractMetadataKey, pkgClass);
                        // const pkgObj = Object.create(pkgClass);

                        if(metadata) {
                            const pkgObj2 = new pkgClass();
                            console.log(pkgClass, ' => ' ,metadata, pkgObj2);
                        }

                    } else {
                        console.log(`not is class: ${item}`);
                    }
                }

            } catch(error) {
                console.log(`error: ${js} ${error.message}`);
            }
        }
    }
}


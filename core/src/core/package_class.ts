import { PackageConfig, Service } from "../reflection";
import { ServiceFunction } from './service_function';
import { ServiceMetadataKey } from "../reflection";
import { Injector } from '../di';

/**
 * 代表 package 類別，可用於輸出 service route。
 */
export class PackageClass {

    constructor(
        /**
         * package 名稱。
         */
        public name: string,
        /**
         * package class。
         */
        public pkgClass: any,
        /**
         * package config。
         */
        public pkgConfig: PackageConfig
    ) { }

    /**
     * 掃描所有可當 service 的 function 資訊。
     */
    public scanServiceFunction(injector: Injector): ServiceFunction[] {

        const pkgObj = new this.pkgClass(injector);
        const srvFuncs = [];

        // 使用通用方法掃描，支援 ES5 到 ES2020+ 的所有編譯目標
        const methodNames = this.getAllMethodNames(pkgObj);

        for(const key of methodNames) {

            const metadata = Reflect.getMetadata(ServiceMetadataKey, pkgObj, key);

            if(!metadata) continue;

            srvFuncs.push(new ServiceFunction(key, pkgObj, pkgObj[key].bind(pkgObj), metadata));
        }

        return srvFuncs;
    }

    /**
     * 通用方法掃描邏輯，支援所有 TypeScript 編譯目標。
     * 從物件本身開始，遞歸掃描整個原型鏈以找出所有方法。
     */
    private getAllMethodNames(obj: any): string[] {
        const methods = new Set<string>();
        
        // 從物件本身開始，遞歸掃描原型鏈
        let current = obj;
        while (current && current !== Object.prototype) {
            Object.getOwnPropertyNames(current).forEach(key => {
                if (typeof current[key] === 'function' && 
                    key !== 'constructor' && 
                    !key.startsWith('_')) { // 排除私有方法
                    methods.add(key);
                }
            });
            current = Object.getPrototypeOf(current);
        }
        
        return Array.from(methods);
    }
}

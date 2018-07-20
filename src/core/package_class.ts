import { PackageConfig, Service } from "../reflection/decorators";
import { ServiceFunction } from './service_function';
import { ServiceMetadataKey } from "../reflection/enums";

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
    public scanServiceFunction(): ServiceFunction[] {

        const pkgObj = new this.pkgClass();
        const srvFuncs = [];

        for(const key of Object.keys(Object.getPrototypeOf(pkgObj))) {

            const metadata = Reflect.getMetadata(ServiceMetadataKey, pkgObj, key);

            srvFuncs.push(new ServiceFunction(key, pkgObj[key].bind(pkgObj), metadata));
        }

        return srvFuncs;
    }
}

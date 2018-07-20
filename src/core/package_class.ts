import { PackageConfig, ServiceConfig } from "../reflection/decorators";
import { ServiceMetadataKey } from "../reflection/enums";

/**
 * 代表 package 類別，可用於輸出 service route。
 */
export class PackageClass {

    constructor(
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
    public createServiceRoutes(): ServiceFunction[] {

        const pkgObj = new this.pkgClass();
        // const descriptorMap: PropertyDescriptorMap = Object.getOwnPropertyDescriptors(Object.getPrototypeOf(pkgObj))

        // for(const key of Object.getOwnPropertyNames(descriptorMap)) {
        for(const key of Object.keys(Object.getPrototypeOf(pkgObj))) {
            // const descriptor = descriptorMap[key];

            // if(!descriptor.enumerable) continue; // 不能列舉的 function 就跳過。

            const metadata = Reflect.getMetadata(ServiceMetadataKey, pkgObj, key);

            console.log(metadata);

        }

        return [];
    }
}

export class ServiceFunction {
    constructor(
        /**
         * service function。
         */
        public srvFunction: any,
        /**
         * service config。
         */
        public srvConfig: ServiceConfig
    ) { }
}
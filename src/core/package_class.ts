import { PackageConfig } from "../reflection/decorators";

/**
 * 代表 package 類別，可用於輸出 service route。
 */
export class PackageClass {

    constructor(
        /**
         * package 類別檔。
         */
        public pkgClass: FunctionConstructor,
        /**
         * package 設定。
         */
        public pkgConfig: PackageConfig) {

    }

    public getServiceFunction() {

    }
}

export class ServiceFunction {
    
}
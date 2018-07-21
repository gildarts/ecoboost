import { ServiceConfig } from '../reflection';

export class ServiceFunction {
    constructor(
        /**
         * function 名稱。
         */
        public name: string,
        /**
         * instance of package class。
         */
        public pkgInstance: any,
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
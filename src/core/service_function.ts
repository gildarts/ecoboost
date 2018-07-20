import { ServiceConfig } from '../reflection/decorators';

export class ServiceFunction {
    constructor(
        /**
         * function 名稱。
         */
        public name: string,
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
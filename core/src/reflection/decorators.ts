import 'reflect-metadata';
import { PackageMetadataKey, ServiceMetadataKey } from './consts';
import { PackageConfig } from './package_config';
import { ServiceConfig } from "./service_config";
import { ServiceConfigImpl } from './service_config_impl';


/**
 * 標示指定的 Class 為一個 Package
 * @param config 相關設定。
 */
export function Package(config: PackageConfig = {}) {
    return Reflect.metadata(PackageMetadataKey, config);
}

/**
 * 標示指定的 static function 為一個 Service。
 * @param config 相關設定。
 */
export function Service(config: ServiceConfig = {}) {

    const confImpl = Object.setPrototypeOf(config, new ServiceConfigImpl());

    return Reflect.metadata(ServiceMetadataKey, confImpl);
}

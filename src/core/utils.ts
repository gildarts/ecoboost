import fse from 'fs-extra';
import path from 'path';
import { PackageMetadataKey } from '../reflection/enums';
import { loadjs } from '../noparse/require_redirect';
import { PackageClass } from './package_class';

/**
 * 掃描出所有 javascript 檔案。
 * @param dirPath 路徑。
 * @param outFiles 檔案清單。
 */
async function enumerateJavascriptFiles(dirPath: string, outFiles: string[]) {

    const exists = await fse.pathExists(dirPath);

    if (!exists) throw new Error(`file not found: ${dirPath}`);

    const entries = await fse.readdir(dirPath);

    for (const entry of entries) {

        const absPath = path.join(dirPath, entry);
        const stat = await fse.stat(absPath);

        if (stat.isDirectory()) {
            await enumerateJavascriptFiles(absPath, outFiles);
        } else if (stat.isFile()) {
            if (!entry.endsWith(".js")) continue;
            outFiles.push(absPath);
        }
    }
}

/**
 * 從 javascript 原始碼載入程式。
 * @param jsFiles javascript 檔案清單。
 */
function loadJavascriptCodes(jsFiles: string[]): any[] {

    const javascriptList: any[] = [];

    for (const js of jsFiles) {
        javascriptList.push(loadjs(js));
    }

    return javascriptList;
}


/**
 * 掃描所有程式，並找出有標示為 Package 的類別。
 * @param jsCodes javascript 程式。
 */
function scanPackageClasses(jsCodes: any[]): PackageClass[] {

    const pkgClasses: PackageClass[] = [];

    for (const code of jsCodes) {

        for (const item of Object.getOwnPropertyNames(code)) {
            const pkgClass = code[item];

            // 只有物件(類別)會被處理。
            if (Object.isExtensible(pkgClass)) {
                const metadata = Reflect.getMetadata(PackageMetadataKey, pkgClass);

                if (metadata) pkgClasses.push(new PackageClass(pkgClass, metadata));

            }
        }
    }

    return pkgClasses;
}

/**
 * 從指定的目錄載入 package class。
 * @dirPath 路徑。
 */
export async function loadPackageClassesFrom(dirPath: string): Promise<PackageClass[]> {

    const jsFiles: string[] = [];

    // 掃描所有 javascript 檔案。
    await enumerateJavascriptFiles(dirPath, jsFiles);

    // 載入 javascript 程式碼。
    const jsCodes = loadJavascriptCodes(jsFiles);
    
    // 掃描含有 package 的類別。
    return scanPackageClasses(jsCodes);
}
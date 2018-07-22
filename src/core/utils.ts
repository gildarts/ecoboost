import fse from 'fs-extra';
import path from 'path';
import { PackageMetadataKey } from '../reflection';
import { loadjs } from '../noparse/require_redirect';
import { PackageClass } from './package_class';
import { JavascriptModule } from './javascript_module'

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
function loadJavascriptCodes(jsFiles: string[]): JavascriptModule[] {

    const javascriptList: any[] = [];

    for (const js of jsFiles) {
        javascriptList.push(new JavascriptModule(js, loadjs(js)));
    }

    return javascriptList;
}

/**
 * 掃描所有程式，並找出有標示為 Package 的類別。
 * @param programs javascript 程式。
 */
function scanPackageClasses(programs: JavascriptModule[]): PackageClass[] {

    const pkgClasses: PackageClass[] = [];

    for (const program of programs) {

        const code = program.code;

        for (const item of Object.getOwnPropertyNames(code)) {
            const pkgClass = code[item];

            // 只有物件(類別)會被處理。
            if (Object.isExtensible(pkgClass)) {
                
                const metadata = Reflect.getMetadata(PackageMetadataKey, pkgClass);
                
                if (metadata) {
                    if (item === 'default') // 判斷式在這是因為要確定有標示為 Package 時才檢查。
                        console.warn(`Package Class 不允許使用「export default」，這將用於特殊用途(${program.fullPath})。`);

                    pkgClasses.push(new PackageClass(item, pkgClass, metadata));
                }

            }
        }
    }

    return pkgClasses;
}

/**
 * 從指定的目錄載入 package class。
 * @dirPath 路徑。
 */
export async function loadPackageFromFolder(dirPath: string): Promise<PackageClass[]> {

    const jsFiles: string[] = [];

    // 掃描所有 javascript 檔案。
    await enumerateJavascriptFiles(dirPath, jsFiles);

    // 載入 javascript 程式碼。
    const jsCodes = loadJavascriptCodes(jsFiles);
    
    // 掃描含有 package 的類別。
    return scanPackageClasses(jsCodes);
}

/**
 * 將路徑規範化。
 * @param path 路徑。
 */
export function normalizeRouteName(path?: string) {
    if(!path) return '/'; // 如果沒有指定就回傳「/」。

    const p = path.toLowerCase();

    if(p.startsWith('/')) return p; // 如果已經符合規定就回傳。
    return `/${p}`; // 加上「/」。
}

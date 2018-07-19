import fse from 'fs-extra';
import path from 'path';

/**
 * 掃描出所有 javascript 檔案。
 * @param dirPath 路徑。
 * @param outFiles 檔案清單。
 */
export default async function scanner(dirPath: string, outFiles: string[]) {

    const exists = await fse.pathExists(dirPath);
    
    if (!exists) throw new Error(`file not found: ${dirPath}`);

    const entries = await fse.readdir(dirPath);

    for(const entry of entries) {

        const absPath = path.join(dirPath, entry);
        const stat = await fse.stat(absPath);

        if(stat.isDirectory()) {
            await scanner(absPath, outFiles);
        } else if (stat.isFile()) {
            if(!entry.endsWith(".js")) continue;
            outFiles.push(absPath);
        } 
    }
}

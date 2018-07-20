
/**
 * 代表 Javascript 可執行程式。
 */
export class JavascriptProgram {

    constructor(
        /**
         * 程式碼位置。
         */
        public fullPath: string,
        /**
         * 可執行程式。
         */
        public code: any
    ) {}
}
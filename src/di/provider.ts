import { Type } from "../reflection";

export interface TypeProvider extends Type<any> {}

export interface StaticClassProvider {
    provide: Symbol | any;

    useClass: Type<any>;
}

export interface ValueProvider {
    provide: Symbol | any;

    useValue: any;
}

export type StaticProvider = TypeProvider | StaticClassProvider | ValueProvider;

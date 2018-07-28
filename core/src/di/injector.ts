import { StaticProvider } from "./provider";
import { Type } from '../reflection';
import { stringify } from '../core/utils';

export abstract class Injector {

    static THROW_IF_NOT_FOUND = Symbol('THROW_IF_NOT_FOUND');

    abstract get<T>(token: Type<T> | Symbol | string, notFoundValue?: T): T;

    static create(options: {providers: StaticProvider[], parent?: Injector}): Injector {
        const { providers, parent = new NullInjector() } = options;

        return new StaticInjector(providers, parent);
    }
}

export class StaticInjector extends Injector {

    readonly parent: Injector; 

    private _records: Map<any, Record>;

    constructor(providers: StaticProvider[], parent: Injector) {
        super();

        this.parent = parent;
        this._records = new Map();

        for (const provider of providers) {
            if ('useValue' in provider) {
                this._records.set(provider.provide, {
                    fn: IDENT,
                    useNew: false,
                    value: provider.useValue
                });
            } else if ('useClass' in provider) {
                this._records.set(provider.provide, {
                    fn: provider.useClass,
                    useNew: true,
                    value: undefined
                })
            } else if (provider instanceof Function) {
                this._records.set(provider, {
                    fn: provider,
                    useNew: true,
                    value: undefined
                });
            }
        }
    }

    get<T>(token: any, notFoundValue?: T): T {
        let value = notFoundValue;

        const record = this._records.get(token);

        if(record) {
            const { fn, useNew } = record;
            value = record.value as T;

            if(!value) {
                if(useNew) {
                    value = record.value = new (fn as any)();
                }
            }

            if (!value) throw new Error(`這對嗎？${stringify(token)}`);
        } else {
            value = this.parent.get(token, notFoundValue);
        }

        return value;
    }

}

export class NullInjector implements Injector {

    get(token: any, notFoundValue: any = Injector.THROW_IF_NOT_FOUND): any {
      if (notFoundValue === Injector.THROW_IF_NOT_FOUND) {
        throw new Error(`NullInjectorError: No provider for ${stringify(token)}!`);
      }
      return notFoundValue;
    }
  }

const IDENT = function <T>(value: T): T {
    return value;
};

interface Record {
    fn: Function;
    useNew: boolean;
    value: any;
  }
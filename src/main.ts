// import { Foo } from './path_resolve';
// import * as rd from 'rd';
import { prettyreq } from './noparse/require_redirect';
import * as d from './reflection/decorators';

console.log(d);

// console.log(prettyreq('./ecoboost.config'));

// const services = rd.readFileFilterSync('./', /\.js$/);

// console.log(services);
// console.log('==========');

// services.forEach(function(item) {
//     console.log(`import ${item}`);
//     console.log(prettyreq(item));
// });


export const name = 'zoe';

export class ZoeServer {

    constructor(name: string) {
        this.name = name;
    }

    name?: string;

    age?: number;

    public start(): void {
        console.log(`start... ${this.name} ${this.age}`)
    }
}

export * from './path_resolve';

export * from './reflection/decorators';
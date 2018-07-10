import { Foo } from './path_resolve';
import * as rd from 'rd';
import { prettyreq } from './noparse/require_redirect';

const CodeName = 'ecoboost';

console.log(`hello zoe server => ${CodeName}`);

console.log(`dirname: ${__dirname}`);
console.log(`filename: ${__filename}`);

console.log(Foo);

const services = rd.readFileFilterSync('./', /hello\.bundle\.js$/);

console.log(services);
// console.log(rq);

services.forEach(function(item) {
    console.log(prettyreq(item));
});

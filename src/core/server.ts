import { prettyreq } from '../noparse/require_redirect';
import * as d from '../reflection/decorators';
import express from 'express';

export class Server {

    constructor() { }

    public loadService(path: string): express.Router {
        const router = express.Router();

        router.get('/', (req, rsp) => {
            rsp.send('hello zoe');
        })

        return router;
    }
}
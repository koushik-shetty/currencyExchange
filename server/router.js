import Router from 'router';
import finalHandler from 'finalhandler';
import serveStatic from 'serve-static';

import URL from './constants';
import * as handlers from './handlers/';

export default class CERouter{
    constructor() {
        this.router = Router();
        this.static = serveStatic('dist', {
            index: ['index.html'],
        });
        this.setup(this.router);
    }

    setup(router){
        router.use(this.static);
        router.get(URL.history, handlers.exchangeHistory);
    }

    serve(req, res) {
        console.log('req:', req.url);
        this.router(req, res, finalHandler(req, res));
    }
}
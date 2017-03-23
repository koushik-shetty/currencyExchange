import Router from 'router';

import URL from './constants';

import * as handlers from './handlers/';

export default class CERouter{
    constructor() {
        this.router = Router();
        this.setupt(this.router);
    }

    setup(){
        this.router.get(URL.history, )
    }
}
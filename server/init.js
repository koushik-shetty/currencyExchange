import http from 'http';

// let server = http.createServer((req, resp) => {
//     console.log("server listening on port 10");
// });

export default class Server {
    constructor(config, router) {
        this.server = http.createServer((req, res) => {
            router.serve(req, res);
        });
        this.config = config;
    }

    start(startCb, errorCb){
        this.server.listen(this.config.port, this.config.hostname, () => {
            console.info(`currencyExchangeRealeyes Server listening at port:${this.config.port}`)
        });
    }
}

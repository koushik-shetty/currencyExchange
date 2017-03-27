import Server from './server/init';
import CERouter from './server/router';

let config = {
    port: 8091,
    hostname: 'localhost',
};

let server = new Server(config, new CERouter());

server.start();
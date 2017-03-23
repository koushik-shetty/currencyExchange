import Server from './server/init';

let config = {
    port: 8091,
    hostname: 'localhost',
};

let server = new Server(config,{
    entry: (req, res) => {
    }
});

server.start();


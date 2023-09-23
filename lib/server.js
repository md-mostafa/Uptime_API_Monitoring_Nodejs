/*
 * Title: Server library
 * Description: Server related files
 * Author: Md Mostafa
 */

// dependencies
const http = require('http');
const { handleReqRes } = require('../helpers/handleReqRes');
const environment = require('../helpers/environment');

// server object - module scaffolding
const server = {};

// configuration
server.config = {};

// create server
server.createServer = () => {
    const createServerVariable = http.createServer(server.handleReqRes);
    createServerVariable.listen(environment.port, () => {
        console.log(`Listening to port ${environment.port}`);
    });
};

// handle Request Response
server.handleReqRes = handleReqRes;

// Start the server
server.init = () => {
    server.createServer();
};

// export the server
module.exports = server;

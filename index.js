/*
 * Title: Uptime Monitoring Application
 * Description: A RESTFul API to monitor up or down time of user defined links
 * Author: Md Mostafa
 */

// dependencies
const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes');
const environment = require('./helpers/environment');
const { sendTwilioSMS } = require('./helpers/notifications');

// app object - module scaffolding
const app = {};

// // @TODO remove later
// sendTwilioSMS('01626139144', 'Hello world', (err) => {
//     console.log('This is the error', err);
// });

// configuration
app.config = {};

// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port, () => {
        console.log(`Listening to port ${environment.port}`);
    });
};

// handle Request Response
app.handleReqRes = handleReqRes;

// Start the server
app.createServer();

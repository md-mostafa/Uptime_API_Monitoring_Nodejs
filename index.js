/* eslint-disable prettier/prettier */
/*
 * Title: Uptime Monitoring Application
 * Description: A RESTFul API to monitor up or down time of user defined links
 * Author: Md Mostafa
 */

// dependencies
const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes');
const environment = require('./helpers/environment');
const data = require('./lib/data');

// app object - module scaffolding
const app = {};

// testing file system
// @TODO: will clear later

// data.create('test', 'newFile', { name: 'Bangladesh', language: 'Bangla' }, (err) => {
//     console.log('error was ', err);
// });

// data.read('test', 'newFile', (err, data) => {
//     console.log(err, data);
// });

// data.update('test', 'newFile', { name: 'England', language: 'English' }, (err) => {
//     console.log(err);
// });

// data.delete('test', 'newFile', (err) => {
//     console.log(err);
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

/*
 * Title: Handle Request, Response
 * Description: Handle Request and Response
 * Author: Md Mostafa
 */

// dependencies

const { StringDecoder } = require('string_decoder');
const url = require('url');

// Module scaffolding;
const handler = {};

handler.handleReqRes = (req, res) => {
    // Request handling
    // Parsing the url
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObj = parsedUrl.query;
    const headersObj = req.headers;

    const decoder = new StringDecoder('utf-8');
    let realData = '';

    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    req.on('end', () => {
        realData += decoder.end();

        console.log(realData);
        // response handle
        res.end('Hello Mostafa!');
    });
};

module.exports = handler;

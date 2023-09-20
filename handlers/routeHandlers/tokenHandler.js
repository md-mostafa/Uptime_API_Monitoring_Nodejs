/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
/*
 * Title: Token Handler
 * Description: Handler to handle token related routes
 * Author: Md Mostafa
 */

// dependencies
const data = require('../../lib/data');
const { hash, parseJSON } = require('../../helpers/utils');

// module scaffolding
const handler = {};

handler.tokenHandler = (requestProperties, callBack) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];
    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._token[requestProperties.method](requestProperties, callBack);
    } else {
        callBack(405);
    }
};

handler._token = {};

handler._token.post = (requestProperties, callBack) => {
    
};

// @TODO: Authentication
handler._token.get = (requestProperties, callBack) => {

};

// @TODO: Authentication
handler._token.put = (requestProperties, callBack) => {

};

// @TODO: Authentication
handler._token.delete = (requestProperties, callBack) => {
};

module.exports = handler;

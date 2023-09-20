/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
/*
 * Title: Token Handler
 * Description: Handler to handle token related routes
 * Author: Md Mostafa
 */

// dependencies
const data = require('../../lib/data');
const { hash, parseJSON, createRandomString } = require('../../helpers/utils');

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
    const phone = typeof requestProperties.body.phone === 'string' && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone : false;
    const password = typeof requestProperties.body.password === 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;
    if (phone && password) {
        data.read('users', phone, (err1, userData) => {
            const hashedPassword = hash(password);
            if (hashedPassword === parseJSON(userData).password) {
                const tokenId = createRandomString(20);
                const expires = Date.now() + 3600 * 1000;
                const tokenObject = {
                    phone,
                    id: tokenId,
                    expires,
                };

                // store the token in database
                data.create('tokens', tokenId, tokenObject, (err2) => {
                    if (!err2) {
                        callBack(200, tokenObject);
                    } else {
                        callBack(500, { error: 'There was a problem in the server side' });
                    }
                });
            } else {
                callBack(400, { error: 'Password is not valid' });
            }
        });
    } else {
        callBack(400, {
            error: 'You have a problem in your request',
        });
    }
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

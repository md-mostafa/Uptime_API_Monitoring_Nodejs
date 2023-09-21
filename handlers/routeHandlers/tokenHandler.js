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
                console.log(tokenId);
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

handler._token.get = (requestProperties, callBack) => {
        // check whether the id is valid
        const id = typeof requestProperties.queryStringObject.id === 'string' && requestProperties.queryStringObject.id.trim().length === 20 ? requestProperties.queryStringObject.id : false;
        if (id) {
            // lookup the token
            data.read('tokens', id, (err, tokenData) => {
                const parsedToken = { ...parseJSON(tokenData) };
                if (!err && parsedToken) {
                    callBack(200, parsedToken);
                } else {
                    callBack(404, { error: 'Requested token not found' });
                }
            });
        } else {
            callBack(404, { error: 'Requested token not found' });
        }
};

handler._token.put = (requestProperties, callBack) => {
    const id = typeof requestProperties.body.id === 'string' && requestProperties.body.id.trim().length === 20 ? requestProperties.body.id : false;
    const extend = !!(typeof requestProperties.body.extend === 'boolean' && requestProperties.body.extend === true);

    if (id && extend) {
        data.read('tokens', id, (err1, tokenData) => {
            const tokenObject = parseJSON(tokenData);

            if (tokenObject.expires > Date.now()) {
                tokenObject.expires = Date.now() + 60 * 60 * 1000;

                // store the updated token
                data.update('tokens', id, tokenObject, (err2) => {
                    if (!err2) {
                        callBack(200);
                    } else {
                        callBack(500, { error: 'There was a server side error!' });
                    }
                });
            } else {
                callBack(400, { error: 'Token already expired!' });
            }
        });
    } else {
        callBack(400, { error: 'There was a problem in your request' });
    }
};

handler._token.delete = (requestProperties, callBack) => {
    // check whether the token is valid
    const id = typeof requestProperties.queryStringObject.id === 'string' && requestProperties.queryStringObject.id.trim().length === 20 ? requestProperties.queryStringObject.id : false;

    if (id) {
        // lookup the id
        data.read('tokens', id, (err1, tokenData) => {
            if (!err1 && tokenData) {
                data.delete('tokens', id, (err2) => {
                    if (!err2) {
                        callBack(200, {
                            message: 'Token was successfully deleted',
                        });
                    } else {
                        callBack(500, {
                            error: 'There was a server side error',
                        });
                    }
                });
            } else {
                callBack(500, {
                    error: 'There was a server side error',
                });
            }
        });
    } else {
        callBack(400, {
            error: 'There was a problem in your request!',
        });
    }
};

handler._token.verify = (id, phone, callBack) => {
    data.read('tokens', id, (err, tokenData) => {
        if (!err && tokenData) {
            if (parseJSON(tokenData).phone === phone && parseJSON(tokenData).expires > Date.now()) {
                callBack(true);
            } else {
                callBack(false);
            }
        } else {
            callBack(false);
        }
    });
};

module.exports = handler;

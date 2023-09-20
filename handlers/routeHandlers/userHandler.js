/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
/*
 * Title: User Handler
 * Description: Handler to handle user related routes
 * Author: Md Mostafa
 */

// dependencies
const data = require('../../lib/data');
const { hash, parseJSON } = require('../../helpers/utils');

// module scaffolding
const handler = {};

handler.userHandler = (requestProperties, callBack) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];
    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._users[requestProperties.method](requestProperties, callBack);
    } else {
        callBack(405);
    }
};

handler._users = {};

handler._users.post = (requestProperties, callBack) => {
    const firstName = typeof requestProperties.body.firstName === 'string' && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false;
    const lastName = typeof requestProperties.body.lastName === 'string' && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false;
    const phone = typeof requestProperties.body.phone === 'string' && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone : false;
    const password = typeof requestProperties.body.password === 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;
    const tosAgreement = typeof requestProperties.body.tosAgreement === 'boolean' && requestProperties.body.tosAgreement ? requestProperties.body.tosAgreement : false;

    if (firstName && lastName && phone && password && tosAgreement) {
        // make sure that user doesn't already exists
        data.read('users', phone, (err1) => {
            if (err1) {
                const userObject = {
                    firstName,
                    lastName,
                    phone,
                    password: hash(password),
                    tosAgreement,
                };
                // store the user to db
                data.create('users', phone, userObject, (err2) => {
                    if (!err2) {
                        callBack(200, {
                            message: 'User created successfully',
                        });
                    } else {
                        callBack(500, { error: 'Could not create user!' });
                    }
                });
            } else {
                callBack(500, {
                    error: 'There was a problem in server side!',
                });
            }
        });
    } else {
        callBack(400, {
            error: 'You have a problem in your request',
        });
    }
};

handler._users.get = (requestProperties, callBack) => {
    // check the phone number is valid
    const phone = typeof requestProperties.queryStringObj.phone === 'string' && requestProperties.queryStringObj.phone.trim().length === 11 ? requestProperties.queryStringObj.phone : false;
    if (phone) {
        // lookup the user
        data.read('users', phone, (err, user) => {
            const parsedUser = { ...parseJSON(user) };
            /*
                { name : 'something', age : 23, gender: 'male'}
            */
            if (!err && parsedUser) {
                delete parsedUser.password;
                callBack(200, parsedUser);
            } else {
                callBack(404, {
                    error: 'Requested user not found',
                });
            }
        });
    } else {
        callBack(404, {
            error: 'Requested user not found',
        });
    }
};

handler._users.put = (requestProperties, callBack) => {
    const firstName = typeof requestProperties.body.firstName === 'string' && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false;
    const lastName = typeof requestProperties.body.lastName === 'string' && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false;
    const phone = typeof requestProperties.body.phone === 'string' && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone : false;
    const password = typeof requestProperties.body.password === 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;

    if (phone) {
        if (firstName || lastName || password) {
            // lookup the user
            data.read('users', phone, (err, uData) => {
                const userData = { ...parseJSON(uData) };
                if (!err && userData) {
                    if (firstName) {
                        userData.firstName = firstName;
                    }

                    if (lastName) {
                        userData.lastName = lastName;
                    }

                    if (password) {
                        userData.password = hash(password);
                    }

                    // store to database
                    data.update('users', phone, userData, (err2) => {
                        if (!err2) {
                            callBack(200, {
                                message: 'User was updated successfully',
                            });
                        } else {
                            callBack(500, {
                                error: 'There was a problem in the server side!',
                            });
                        }
                    });
                } else {
                    callBack(400, {
                        error: 'You have a problem in your request!',
                    });
                }
            });
        } else {
            callBack(400, {
                error: 'You have a problem in your request!',
            });
        }
    } else {
        callBack(404, {
            error: 'Invalid phone number. Please try again!',
        });
    }
};

handler._users.delete = (requestProperties, callBack) => {

};

module.exports = handler;

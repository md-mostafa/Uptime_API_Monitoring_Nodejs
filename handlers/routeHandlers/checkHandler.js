/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
/*
 * Title: Check Handler
 * Description: Handler to handle user defined checks
 * Author: Md Mostafa
 */

// dependencies
const data = require('../../lib/data');
const { hash, parseJSON } = require('../../helpers/utils');
const tokenHandler = require('./tokenHandler');

// module scaffolding
const handler = {};

handler.checHandler = (requestProperties, callBack) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];
    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._check[requestProperties.method](requestProperties, callBack);
    } else {
        callBack(405);
    }
};

handler._check = {};

handler._check.post = (requestProperties, callBack) => {
    const firstName = typeof requestProperties.body.firstName === 'string' && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false;
    const lastName = typeof requestProperties.body.lastName === 'string' && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false;
    const phone = typeof requestProperties.body.phone === 'string' && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone : false;
    const password = typeof requestProperties.body.password === 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;
    const tosAgreement = typeof requestProperties.body.tosAgreement === 'boolean' && requestProperties.body.tosAgreement ? requestProperties.body.tosAgreement : false;

};

handler._check.get = (requestProperties, callBack) => {
    // check the phone number is valid
    const phone = typeof requestProperties.queryStringObj.phone === 'string' && requestProperties.queryStringObj.phone.trim().length === 11 ? requestProperties.queryStringObj.phone : false;

};

handler._check.put = (requestProperties, callBack) => {
    const firstName = typeof requestProperties.body.firstName === 'string' && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false;
    const lastName = typeof requestProperties.body.lastName === 'string' && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false;
    const phone = typeof requestProperties.body.phone === 'string' && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone : false;
    const password = typeof requestProperties.body.password === 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;


};

handler._check.delete = (requestProperties, callBack) => {
    const phone = typeof requestProperties.queryStringObj.phone === 'string' && requestProperties.queryStringObj.phone.trim().length === 11 ? requestProperties.queryStringObj.phone : false;
    
};

module.exports = handler;

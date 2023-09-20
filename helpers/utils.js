/* eslint-disable prettier/prettier */
/*
 * Title: Utils
 * Description: Important utility functions
 * Author: Md Mostafa
 */

// dependencies
const crypto = require('crypto');
const environments = require('./environment');

// module scaffolding
const utils = {};

// parse JSON string to Object
utils.parseJSON = (jsonString) => {
    let output;

    try {
        output = JSON.parse(jsonString);
    } catch {
        output = {};
    }

    return output;
};

// hash string
utils.hash = (str) => {
    if (typeof str === 'string' && str.length > 0) {
        const hash = crypto.createHmac('sha256', environments.secretKey).update(str).digest('hex');
        return hash;
    }
    return false;
};

// export module
module.exports = utils;

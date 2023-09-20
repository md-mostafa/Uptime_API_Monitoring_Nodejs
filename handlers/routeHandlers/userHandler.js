/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
/*
 * Title: User Handler
 * Description: Handler to handle user related routes
 * Author: Md Mostafa
 */

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

};

handler._users.get = (requestProperties, callBack) => {
    callBack(200);
};

handler._users.put = (requestProperties, callBack) => {

};

handler._users.delete = (requestProperties, callBack) => {

};

module.exports = handler;

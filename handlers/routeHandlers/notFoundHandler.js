/*
 * Title: Not Found Handler
 * Description: 404 Not Found Handler
 * Author: Md Mostafa
 */

// module scaffolding
const handler = {};

handler.notFoundHandler = (requestProperties, callBack) => {
    callBack(404, {
        message: 'Youre requested URL was not found',
    });
};

module.exports = handler;

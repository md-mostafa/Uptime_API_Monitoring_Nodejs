/*
 * Title: Routes
 * Description: Application Routes
 * Author: Md Mostafa
 */

// dependencies
const { sampleHandler } = require('./handlers/routeHandlers/sampleHandler');

const routes = {
    sample: sampleHandler,
};

module.exports = routes;

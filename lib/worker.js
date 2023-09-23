/*
 * Title: Workers library
 * Description: Worker related files
 * Author: Md Mostafa
 */

// dependencies

// worker object - module scaffolding
const worker = {};

// start the workers
worker.init = () => {
    console.log('workers');
};

// export the worker
module.exports = worker;

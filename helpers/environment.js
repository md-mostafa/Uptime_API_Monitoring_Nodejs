/* eslint-disable prettier/prettier */
/*
 * Title: Environments
 * Description: Handle all enviroment related things
 * Author: Md Mostafa
 */

// dependencies

// module scaffolding
const environments = {};

environments.staging = {
    port: 3000,
    envName: 'staging',
    secretKey: 'heyYou',
    maxChecks: 5,
    twilio: {
        fromPhone: '+12512205293',
        accountSid: 'AC4aa92a2cabd46887a6d82fb36d85bf28',
        authToken: '8c0b2eb662a7a91746101bfd2486cbc8',
    },
};

environments.production = {
    port: 5000,
    envName: 'production',
    secretKey: 'heyYouThere',
    maxChecks: 5,
    twilio: {
        fromPhone: '+12512205293',
        accountSid: 'AC4aa92a2cabd46887a6d82fb36d85bf28',
        authToken: '8c0b2eb662a7a91746101bfd2486cbc8',
    },
};

// determine which environment was passed
const currentEnvironment = typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV : 'staging';

// export corresponding environment object
const environmentToExport = typeof environments[currentEnvironment] === 'object' ? environments[currentEnvironment] : environments.staging;

// export module
module.exports = environmentToExport;

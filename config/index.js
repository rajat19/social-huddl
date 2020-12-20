const devConfig = require('./development');
const prodConfig = require('./production');

const env = process.env.NODE_ENV;

let envConfig = devConfig;
if (env === 'production') {
	envConfig = prodConfig;
}

const config = {
	db: envConfig.db,
	port: 9000,
};

module.exports = config;

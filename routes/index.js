const comment = require('./comment');
const user = require('./user');

module.exports = (app) => {
	app.use('/api/v1/comment', comment(app));
	app.use('/api/v1/user', user(app));
};
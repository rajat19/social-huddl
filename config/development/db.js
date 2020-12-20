const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoDb = process.env.MONGO_DB;
const mongoServer = process.env.MONGO_SERVER;

module.exports = {
	mongoServer: `mongodb+srv://${mongoUser}:${mongoPassword}@${mongoServer}/${mongoDb}?retryWrites=true&w=majority`
};
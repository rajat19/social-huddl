const mongoose = require('mongoose');

const mongooseSchema = mongoose.Schema;

const UserModelSchema = new mongooseSchema({
	username : {
		type: String,
		unique: true,
		required: true,
	},
	password : {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	}
}, {timestamps: true});

module.exports = mongoose.model('User', UserModelSchema);
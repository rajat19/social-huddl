const mongoose = require('mongoose');

const mongooseSchema = mongoose.Schema;

const CommentModelSchema = new mongooseSchema({
	wallId: {
		type: mongoose.Schema.Types.ObjectId,
	},
	depth: {
		type: Number,
		default: 1
	},
	parentId: {
		type: mongoose.Schema.Types.ObjectId,
		default: null
	},
	postedDate: {
		type: Date, 
		default: Date.now
	},
	author: {
		id: mongoose.Schema.Types.ObjectId,
		name: String,
	},
	commentText: {
		type: String,
		required: true
	},
	reactions: {
		type: Array,
		default: [],
	}
}, {timestamps: true}
);

module.exports = mongoose.model('Comment', CommentModelSchema);
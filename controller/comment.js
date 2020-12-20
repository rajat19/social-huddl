const Comment = require('../model/comment');
const User = require('../model/user');

const addComment = async (req, res) => {
	const author = await User.findOne({_id: req.body.authorId}).exec();
	if (author.length == 0) {
		return res.json(500).json({
			error: 'No such author id exists',
		});
	}
	const data = {
		author: {
			id: req.body.authorId,
			name: author.name,
		},
		commentText: req.body.commentText,
		wallId: req.body.wallId,
	};
	if ('parentId' in req.body) {
		data.parentId = req.body.parentId;
	}
	if ('depth' in req.body) {
		data.depth = req.body.depth;
	}
	const comment = new Comment(data);
	try {
		const savedComment = await comment.save();
		res.json({comment: savedComment});
	} catch (err) {
		console.log(err);
		res.status(500).json({error: err});
	}
};

const updateComment = async (req, res) => {
	try {
		let comment = req.body;
		await Comment.updateOne({_id: comment.id}, {$set: {commentText: comment.commentText}}).exec();
		res.status(200).json({
			message: 'Comment Updated',
			comment: comment
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({error: err});
	}
};

const getComments = async (req, res) => {
	try {
		const comments = await Comment.find({wallId: req.params.userId}).sort({postedDate: 1}).lean().exec();
		// console.log(`for param: ${req.params.wallId} comments initially`, comments);
		let rec = (comment, threads) => {
			for (let thread in threads) {
				const value = threads[thread];

				if (thread.toString() === comment.parentId.toString()) {
					value.subcomments[comment._id] = comment;
					return;
				}

				if (value.subcomments) {
					rec(comment, value.children);
				}
			}
		};
		let threads = {}, comment;
		for (let i=0; i<comments.length; i++) {
			comment = comments[i];
			comment['subcomments'] = {};
			let parentId = comment.parentId;
			if (!parentId) {
				threads[comment._id] = comment;
				continue;
			}
			rec(comment, threads);
		}
		res.json({
			'count': comments.length,
			'comments': threads
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({error: err});
	}
};

const deleteComment = async (req, res) => {
	try {
		const comment = await Comment.findOne({_id: req.params.commentId}).exec();
		if (comment.author.id != req.userData.userId) {
			return res.status(401).json({
				error: 'Not authorized to delete this comment'
			});
		}
		await Comment.deleteOne({_id: req.params.commentId}).exec();
		res.json({message: 'Comment deleted'});
	} catch (err) {
		console.log(err);
		res.status(500).json({error: err});
	}
};


module.exports = {
	addComment,
	updateComment,
	getComments,
	deleteComment,
};
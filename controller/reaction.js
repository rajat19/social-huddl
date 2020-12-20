const Comment = require('../model/comment');
const User = require('../model/user');

const addReaction = async (req, res) => {
	try {
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
			reaction: req.body.reaction,
		};
		const commentId = req.body.commentId;
		await Comment.updateOne({_id: commentId}, {
			$push: {
				reactions: data
			}
		});
		res.status(200).json({
			message: 'Reaction Added',
		});
	} catch(err) {
		console.log(err);
		res.status(500).json({error: err});
	}
};


module.exports = {
	addReaction
};
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../model/user');
const jwtKey = process.env.JWT_KEY;

const getJwtToken = (username, userId) => {
	const key = jwtKey;
	const payload = {username, userId};
	const options = {expiresIn: '1h'};
	return jwt.sign(payload, key, options);
};

const userSignUp = async (req, res) => {
	try {
		const existingUser = await User.find({username: req.body.username}).exec();
		if (existingUser.length >= 1) {
			return res.status(409).json({
				status: 409,
				message: 'Username exists'
			});
		}
		const salt = bcrypt.genSaltSync(10);
		console.log(`salt is ${salt}, jwtKey: ${jwtKey}`);
		const passwordHash = bcrypt.hashSync(req.body.password, salt);
		console.log(`hash is ${passwordHash}`);
		const user = new User({
			username: req.body.username,
			password: passwordHash,
		});
		const saveResult = await user.save();
		console.log(saveResult);
		const token = getJwtToken(saveResult.username, saveResult._id);
		console.log(token);
		res.status(201).json({
			message: 'User created',
			id: saveResult._id,
			name: saveResult.name,
			token: token,
			status: 200
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			error: err
		});
	}
};

const userLogIn = async (req, res) => {
	try {
		const user = await User.findOne({username: req.body.username}).exec();
		const passwordMatch = bcrypt.compareSync(req.body.password, user.password);
		const token = getJwtToken(user.username, user._id);
		if (passwordMatch) {
			return res.status(200).json({
				status: 200,
				messsage: 'Auth succ',
				id: user._id,
				name: user.name,
				token: token
			});
		} else {
			return res.status(401).json({
				status: 401,
				message: 'Auth failed'
			});
		}
	} catch (err) {
		console.log(err);
		return res.status(401).json({
			status: 401,
			message: 'Auth failed'
		});
	}
};

const getUser = async (req, res) => {
	try {
		const user = await User.findOne({'_id': req.params.userId}).exec();
		res.status(200).json({
			id: user._id,
			name: user.name,
			username: user.username,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: 500,
			error: err
		});
	}
};


module.exports = {
	userSignUp,
	userLogIn,
	getUser,
};
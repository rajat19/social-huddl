require('dotenv').config();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('./config');
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');

const commentRouter = require('./routes/comment');
const reacitonRouter = require('./routes/reaction');
const userRouter = require('./routes/user');

const app = express();
const router = express.Router();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false,
}));
app.use(cookieParser());
app.use(router);
app.use('/api/v1/comment', commentRouter);
app.use('/api/v1/reaction', reacitonRouter);
app.use('/api/v1/user', userRouter);
app.use(function(req, res) {
	res.sendStatus(404);
});

mongoose.Promise = global.Promise;
mongoose.connect(config.db.mongoServer, {
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
});

const server = http.createServer(app);
server.on('error', (err) => {
	console.log(err);
});

server.listen(port, '127.0.0.1', () => {
	console.log(`Server listening on ${port}`);
});

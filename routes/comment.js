const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/checkAuth');
const commentsController = require('../controller/comment');

router.get('/:userId', checkAuth, commentsController.getComments);
router.post('/edit', checkAuth, commentsController.updateComment);
router.post('/', checkAuth, commentsController.addComment);
router.delete('/:commentId', checkAuth, commentsController.deleteComment);

module.exports = router;
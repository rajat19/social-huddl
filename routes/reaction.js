const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/checkAuth');
const reactionController = require('../controller/reaction');

router.post('/', checkAuth, reactionController.addReaction);

module.exports = router;
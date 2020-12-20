const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/checkAuth');
const userController = require('../controller/user');

router.post('/signup', userController.userSignUp);
router.post('/login', userController.userLogIn);
router.get('/:userId', checkAuth, userController.getUser);

module.exports = router;
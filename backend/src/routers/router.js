const express = require('express');
const formRouter = require('./form');
const userRouter = require('./user.router');
const signUpRouter = require('./signup.router.js');

const router = express.Router();

router.use('/form', formRouter);
router.use('/user', userRouter);
router.use('/signup', signUpRouter);

module.exports = router;
